'use strict';

import Navigo from 'navigo';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { SplashSite } from '../components/SplashSite';
import { RestaurantPage } from '../components/RestaurantPage';
import { Login } from '../components/Login';
import config from './config';
import state from './state';


let splashSite = new SplashSite();  // generate the homepage
let login = new Login();


// let router = new Navigo(null, true, '#!'); // using hash
let router = new Navigo(null, false); // using HTML5 History API

// route with before hook
router.on('restaurant/:name', (params) => { let restaurantPage = new RestaurantPage(params.name); restaurantPage.init(); },
              { before: (done, params) => { authenticate(done, params) }});

// routes without hooks
router.on({
  'restaurant': () => { router.navigate('/home'); /* 404, need this route to make restaurant/:name work... navigo bug */ },
  'login': () => { login.init() },
  'home': () => { splashSite.init() }
});

// default route
router.on(() => { splashSite.init() });

// 404 route
router.notFound((query) => { /*router.navigate('/home');*/ console.log('page not found'); })

router.resolve();

function authenticate(done, params) {

  let cognitoUser = state.auth.userPool.getCurrentUser();
  console.log('cognitoUser: ', cognitoUser);

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) throw new Error(err);
      else if (session.isValid()) {
        if (cognitoUser.username == params.name) done(); // restaurant user accesses their page
        else { // a user is logged in but tries to access a page that isn't theirs, redirects to theirs
          done(false);
          router.navigate(`/restaurant/${cognitoUser.username}`);  // username is the same as the page route
        }
      }
      else {  // user exists but session not valid...?
        done(false);
        router.navigate('/login');
      }
    });
  }
  else {  // when cognitoUser is null, prevent the handler from resolving and redirect to login
    done(false);
    router.navigate('/login');
  }
}

export { router };
