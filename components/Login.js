import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import state from '../js/state';
import { $id } from '../js/util';
import config from '../js/config';
import { router } from '../js/scripts';
import { Navbar } from './Navbar';


export class Login {
  constructor() {
    this.navbar = new Navbar();
  }

  init() {
    this.render();  // leave this line first

    this.navbar.init();

    $id('login-button').onclick = () => {
      $id('login-text').innerText = 'logging in...';
      $id('login-button').style.background = '#db9aa6';
      $id('login-spinner').style.display = 'inline-block';
      $id('login-button').style.pointerEvents = 'none';   // disable clicking the login button again  
      state.auth.username = $id('login-restaurant').value.trim();
      this.handleLogin(state.auth.username, $id('login-password').value.trim());
    }

    // $id('register').onclick = () => {
    //   state.auth.username = $id('register-restaurant').value;
    //   this.createUser(state.auth.username, $id('register-password').value);  // password isn't stored in state
    // }

    // $id('confirm').onclick = () => {
    //   state.confcode = $id('confcode').value;
    //   console.log('in confirm onclick, args: ', state);
    //   this.confirmSignup(state.auth.user, state.auth.confcode, state.auth.username, $id('register-password').value);
    // }

    // $id('logout').onclick = () => this.logout();
  }


  static checkAuth(done, params) {
    let user = Login.getCurrentUser();

    if (user != null) {
      user.getSession((err, session) => {
        if (err) throw new Error(err);
        else if (session.isValid()) {
          if (user.username == params.name) done(); // restaurant user accesses their page
          else { // a user is logged in but tries to access a page that isn't theirs, redirects to theirs
            done(false);
            router.navigate(`/restaurant/${user.username}`);  // username is the same as the page route
          }
        }
        else {  // user exists but session not valid...?
          done(false);
          router.navigate('/login');
        }
      });
    }
    else {  // when user is null, prevent the handler from resolving and redirect to login
      done(false);
      router.navigate('/login');
    }
  }  

  static getCurrentUser() {
    state.auth.user = state.auth.userPool.getCurrentUser();
    return state.auth.user;
  }

  static getUserToken() { // must call from an async/await function
    return new Promise((resolve, reject) => {
      state.auth.userPool.getCurrentUser().getSession(function(err, session) {
        if (err) { reject(err); return; }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  static async updateUserToken() {
    state.auth.userToken = await Login.getUserToken();
    return state.auth.userToken;
  }

  async createUser(username, password) {
    try {
      state.auth.user = await this.signup(username, password);
    }
    catch(e) {
      throw new Error('Error in createUser: ' + e);
    }  
  }

  signup(username, password) {
    const attributeName = new CognitoUserAttribute({ Name : 'name', Value : username });

    return new Promise((resolve, reject) => (
      state.auth.userPool.signUp(username, password, [attributeName], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      })
    ));
  }

  // async confirmSignup(user, confirmationCode, username, password) {
  //   try {
  //     let confirmation = await this.confirm(user, confirmationCode);
  //     console.log('confirmation: ', confirmation);
  //     state.auth.userToken = await this.authenticate(user, username, password);
  //     console.log('userToken: ', state);
  //   }
  //   catch(e) {
  //     alert(e);
  //   }
  // }

  // confirm(user, confirmationCode) {
  //   return new Promise((resolve, reject) => (
  //     user.confirmRegistration(confirmationCode, true, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(result);
  //     })
  //   ));
  // }

  authenticate(user, username, password) {
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  async handleLogin(username, password) {
    try {
      state.auth.userToken = await this.login(username, password);
      Login.getCurrentUser(); // not async
      console.log('Login success!', state);
      router.navigate(`/restaurant/${state.auth.user.username}`);  // username is the same as the page route     
    }
    catch(e) {
      // set button back to original text/color
      $id('login-text').innerText = 'login';
      $id('login-button').style.background = '#e3516c';
      $id('login-spinner').style.display = 'none'; 
      $id('login-button').style.pointerEvents = 'auto';   // re-enable clicking the login button
      throw new Error('Login fail! ' + e);       
    }
  }

  login(username, password) {
    const user = new CognitoUser({ Username: username, Pool: state.auth.userPool });
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  static logout() {
    Login.getCurrentUser();  // not async
    if (state.auth.user !== null) {
      state.auth.user.signOut();
      state.auth.user = null;
      router.navigate('/home');
    }
  }

  renderLoggedOut() {
    let html = `
    
    `;
    return html;
  } 

  render() {
    let html = `
      ${ this.navbar.render() }      
      <div id="mochi-background"></div>
      <div id="login-page-content">
        <div class="login-container">
          <div class="login-logo-container" href="/" data-navigo>          
            <div id="logo" class="logo-login"></div>
            <div id="mochi" class="mochi-login">mochibox</div>
          </div>        
          <input id="login-restaurant" class="login-input" type="text" placeholder="Restaurant...">
          <input id="login-password" class="login-input" type="password" placeholder="Password...">
          <div class="pass-reqs"><sup>*</sup>8 characters min, a number, an upper and lowercase letter...</div>
          <button id="login-button">
            <img id="login-spinner" src="./img/spinner.svg">
            <div id="login-text">login</div>
          </button>
          <div class="register-request">To register, contact <a href="mailto:andrew@mochibox.io">andrew@mochibox.io</a></div>          
          <!--
          <input id="register-restaurant" type="text" placeholder="restaurant">
          <input id="register-password" type="password" placeholder="password">
          <button id="register">register</button>
          <br>
          <input id="confcode" type="text" placeholder="confirmation code">
          <button id="confirm">confirm</button>
          <br>
          <button id="logout">logout</button>
          -->
        </div>
      </div>
    `;    

    document.getElementById('view').innerHTML = html;
  }
}