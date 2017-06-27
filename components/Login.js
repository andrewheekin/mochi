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

    $id('login').onclick = () => {
      state.auth.username = $id('login-restaurant').value;
      this.handleLogin(state.auth.username, $id('login-password').value);
    }

    $id('register').onclick = () => {
      state.auth.username = $id('register-restaurant').value;
      this.createUser(state.auth.username, $id('register-password').value);  // password isn't stored in state
    }

    // $id('confirm').onclick = () => {
    //   state.confcode = $id('confcode').value;
    //   console.log('in confirm onclick, args: ', state);
    //   this.confirmSignup(state.auth.user, state.auth.confcode, state.auth.username, $id('register-password').value);
    // }

    $id('logout').onclick = () => this.logout();   

    // press 1 to see the state
    document.onkeydown = (e) => {
      if (e.keyCode == 49) {
        console.log('state: ', state);
        let cognitoUser = state.auth.userPool.getCurrentUser(); // not async
        console.log('cognitoUser: ', cognitoUser);
        if (cognitoUser != null) {
          cognitoUser.getSession(function(err, session) {
            if (err) {
              alert(err);
              return;
            }
            console.log('session: ' + session);                
            console.log('session validity: ' + session.isValid());
          });
        }
      }   
    }

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

  logout() {
    state.auth.user = state.auth.userPool.getCurrentUser();  // not async
    if (state.auth.user !== null) {
      state.auth.user.signOut();
      state.auth.user = null;
      router.navigate('/login');
    }    
  }


  render() {
    let html = `
      ${ this.navbar.render() }
      <div id="mochi-background"></div>
      <div id="login-page-content">
        <input id="login-restaurant" type="text" placeholder="restaurant">
        <input id="login-password" type="password" placeholder="password">
        <button id="login">login</button>
        <br><br>
        <input id="register-restaurant" type="text" placeholder="restaurant">
        <input id="register-password" type="password" placeholder="password">
        <button id="register">register</button>
        <br><br>
        <input id="confcode" type="text" placeholder="confirmation code">
        <button id="confirm">confirm</button>
        <br><br>
        <button id="logout">logout</button>        
      </div>
    `;    

    document.getElementById('view').innerHTML = html;
  }
}