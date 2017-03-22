import throttle from 'lodash/throttle';

let navbar = document.getElementById('navbar');
let navHolder = document.getElementById('nav-holder');
let logo = document.getElementById('logo');
let mochi = document.getElementById('mochi');
let mochiBox = document.getElementById('mochi-lightbox');
let learnMore = document.getElementById('learn-more');


// watch window scroll height and add/remove scrolled/unscrolled classes
document.addEventListener('scroll', throttle(() => {
  checkNavbar();
  checkLearnMore();
}, 100));

window.addEventListener('load', () => {
  checkNavbar();
  checkLearnMore();
});

function checkNavbar() {
  if (window.scrollY >= 20) {
    navbar.className = 'navbar-scrolled';
    navHolder.className = 'nav-holder-scrolled';
    logo.className = 'logo-scrolled';
    mochi.className = 'mochi-scrolled';
    mochiBox.className = 'mochi-lightbox-scrolled';
  }
  else if (window.scrollY < 20) {
    navbar.className = 'navbar';
    navHolder.className = 'nav-holder';
    logo.className = 'logo';
    mochi.className = 'mochi';
    mochiBox.className = 'mochi-lightbox';
  }
  return;
}

// if scrolled past main page, make the "learn more" box colored fusia
function checkLearnMore() {
  if (window.scrollY >= 700) {
    learnMore.className = 'learn-more-scrolled'
  }
  else if (window.scrollY < 700) {
    learnMore.className = 'learn-more'
  }
  return;
}
