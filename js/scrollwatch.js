let navbar = document.getElementById('navbar');
let navHolder = document.getElementById('nav-holder');
let logo = document.getElementById('logo');
let mochi = document.getElementById('mochi');
let mochiBox = document.getElementById('mochi-lightbox');


// watch window scroll height and add/remove scrolled/unscrolled classes
document.addEventListener('scroll', () => {
  if (window.scrollY >= 20 && window.scrollY < 120) {
    navbar.className = 'navbar-scrolled';
    navHolder.className = 'nav-holder-scrolled';
    logo.className = 'logo-scrolled';
    mochi.className = 'mochi-scrolled';
    mochiBox.className = 'mochi-lightbox-scrolled';
  }
  else if (window.scrollY < 30) {
    navbar.className = 'navbar';
    navHolder.className = 'nav-holder';
    logo.className = 'logo';
    mochi.className = 'mochi';
    mochiBox.className = 'mochi-lightbox';
  }

});