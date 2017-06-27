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

    // press 1 to see the state
    document.onkeydown = (e) => {
      if (e.keyCode == 49) {
        state.auth.user = state.auth.userPool.getCurrentUser(); // not async
        console.log('state: ', state);
      }   
    }

  }

  static getCurrentUser() {
    state.auth.user = state.auth.userPool.getCurrentUser()
    return state.auth.user;
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
  //     state.auth.token = await this.authenticate(user, username, password);
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
      state.auth.user = state.auth.userPool.getCurrentUser(); // not async
      console.log('Login success!', state);
      router.navigate(`/restaurant/${state.auth.user.username}`);  // username is the same as the page route
    }
    catch(e) {
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
    state.auth.user = state.auth.userPool.getCurrentUser();  // not async
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
            <div id="logo" class="logo"></div>
            <div id="mochi" class="mochi-login">mochibox</div>
          </div>        
          <input id="login-restaurant" class="login-input" type="text" placeholder="Restaurant...">
          <input id="login-password" class="login-input" type="password" placeholder="Password...">
          <div class="pass-reqs"><sup>*</sup>8 characters min, a number, an upper and lowercase letter...</div>
          <button id="login-button">login</button>
          <br>
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