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

// restaurant page route with before hook to authenticate the user
router.on('restaurant/:name', (params) => { let restaurantPage = new RestaurantPage(params.name); restaurantPage.init(); },
              { before: (done, params) => { Login.checkAuth(done, params) }});

// login page route with before hook
router.on('login', () => { login.init() },
     { before: (done) => { // if user is already logged in, go to their page
        if (Login.getCurrentUser()) { done(false); router.navigate(`/restaurant/${state.auth.user.username}`) }
        else done(); }});

// routes without hooks
router.on({
  'restaurant': () => { router.navigate('/home'); /* 404, need this route to make restaurant/:name work... navigo bug */ },
  'login': () => { login.init() },
  'home': () => { splashSite.init() }
});

// default route
router.on(() => { splashSite.init() });

// 404 route
router.notFound((query) => { router.navigate('/home'); console.log('page not found'); })

router.resolve();

export { router };
