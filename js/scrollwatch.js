'use strict';

import throttle from 'lodash/throttle';
import { $el, $on } from './util.js';

let navbar = document.getElementById('navbar');
let navHolder = document.getElementById('nav-holder');
let logo = document.getElementById('logo');
let mochi = document.getElementById('mochi');
let mochiBox = document.getElementById('mochi-popup');
let learnMore = document.getElementById('learn-more');


// watch window scroll height and add/remove scrolled/unscrolled classes, throttle the scroll event
$on('scroll', throttle(() => checkScroll(), 100));
$on('load', () => checkScroll());

function checkScroll() {
  // if scrolled past main page, make the "learn more" box colored fusia
  if (window.scrollY >= 700) {
    learnMore.className = 'learn-more-scrolled'
  }
  else if (window.scrollY < 700) {
    learnMore.className = 'learn-more'
  }

  // if scrolled past 20px, change navbar
  if (window.scrollY >= 20) {
    navbar.className = 'navbar-scrolled';
    navHolder.className = 'nav-holder-scrolled';
    logo.className = 'logo-scrolled';
    mochi.className = 'mochi-scrolled';
    mochiBox.className = 'mochi-popup-scrolled';
  }
  else if (window.scrollY < 20) {
    navbar.className = 'navbar';
    navHolder.className = 'nav-holder';
    logo.className = 'logo';
    mochi.className = 'mochi';
    mochiBox.className = 'mochi-popup';
  }
  return;
}
