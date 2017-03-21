let navbar = document.getElementById('navbar');
let navHolder = document.getElementById('nav-holder');

// watch window scroll height and add/remove scrolled/unscrolled classes
document.addEventListener('scroll', () => {
  if (window.scrollY >= 30 && window.scrollY < 130) {
    navbar.className = 'navbar-scrolled';
    navHolder.className = 'nav-holder-scrolled';
  }
  else if (window.scrollY < 30) {
    navbar.className = 'navbar';
    navHolder.className = 'nav-holder';
  }

});