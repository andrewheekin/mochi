'use strict';

import Navigo from 'navigo';
import { SplashSite } from '../components/SplashSite';


let splashSite = new SplashSite();

// let router = new Navigo(null, true, '#!'); // using hash
let router = new Navigo(null, false); // using HTML5 History API
router.on({
  // main pages
  'signup': () => { signupView() },
  // 'home': () => { authCheck(); home() },
});

// default route
router.on(() => { splashSite.init(); });

// 404 route
router.notFound((query) => { document.getElementById('view').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>' })

router.resolve();

export { router };