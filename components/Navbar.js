import throttle from 'lodash/throttle';
import { $id, $cl, $on } from '../js/util';
import { router } from '../js/scripts';
import state from '../js/state';
import { Login } from './Login';

// Navbar states: Logged in vs logged out & page location
export class Navbar {
  constructor() { }

  init() {
    router.resolve();
    Login.getCurrentUser();  // update the user in the state object

    // press 1 to see the state
    document.onkeydown = (e) => { if (e.keyCode == 49) console.log('state: ', state); }

    // close link when mobile nav is clicked
    for (var i=0; i<$cl('mobile-nav').length; i++) {
      $cl('mobile-nav')[i].onclick = () => this.closeMobileNav();
    }

    // close the mobile nav menu when a link is clicked
    $id('close-nav').onclick = () => this.closeMobileNav();

    // open the mobile nav menu
    $id('hamburger').onclick = () => this.openMobileNav();

    // check scroll height
    this.checkScroll();  // when script is executed
    $on('load', () => this.checkScroll());  // and when document loads
    $on('scroll', throttle(() => this.checkScroll(), 100));  // and on scroll, duh

    if (state.auth.user) {  // init for logged in user
      $id('nav-logout').onclick = () => Login.logout();
      $id('nav-logout-mobile').onclick = () => Login.logout();
    }
    else {  } // init for logged out user

  }

  openMobileNav() {
    $id('side-nav').style.width = '160px';
  }

  closeMobileNav() {
    $id('side-nav').style.width = '0px';
  }

  checkScroll() { // scroll/unscroll navbar and color/grey-out the learn more button
    if (window.location.pathname == '/' || window.location.pathname == '/home') {  // splash page
  
      if (state.auth.user == null) {  // logged out user
        // if scrolled past main page, make the "learn more" box colored fusia
        if (window.scrollY >= 700) $id('learn-more').className = 'learn-more-scrolled'
        else if (window.scrollY < 700) $id('learn-more').className = 'learn-more'
      }    

      // if scrolled past 20px, change navbar
      if (window.scrollY >= 20) this.scrolled();
      else if (window.scrollY < 20) this.unscrolled();
    }

    else if (window.location.pathname == '/login' || window.location.pathname.includes('/restaurant')) {
      this.scrolled();
    }
  }

  scrolled() {
    $id('navbar').className = 'navbar-scrolled';
    $id('nav-holder').className = 'nav-holder-scrolled';
    $id('logo').className = 'logo-scrolled';
    $id('mochi').className = 'mochi-scrolled';    
  }

  unscrolled() {
    $id('navbar').className = 'navbar';
    $id('nav-holder').className = 'nav-holder';
    $id('logo').className = 'logo';
    $id('mochi').className = 'mochi';    
  }

  renderLoggedInDesktop() {
    let html = `
      <a class="nav-item" href="/home" data-navigo>
        <h3 id="nav-logout" class="nav-item" style="padding-right:28px">Logout</h3>
      </a>
      <a class="nav-item" href="/restaurant/${state.auth.user.username}">
        <h3 class="nav-item" style="padding-right:10px">Hello, ${state.auth.user.username}</h3>
        <img class="nav-logo" src="./img/restaurants/${state.auth.user.username}/${state.auth.user.username}-logo.png">
      </a>
    `;

    if (window.location.pathname == '/' || window.location.pathname == '/home') {
      html = `
        <a class="nav-item" href="/home#description-section">
          <h3 class="nav-item">About</h3>
        </a>
      ` + html;
    }

    return html;
  }

  renderLoggedOutDesktop() {
    let html = `
      <a class="nav-item" href="/login" data-navigo>
        <h3 class="nav-item" style="padding-right:55px">Login</h3>
      </a>
    `;

    if (window.location.pathname == '/' || window.location.pathname == '/home') {
      html = `
        <a class="nav-item" href="/home#description-section">
          <h3 class="nav-item">About</h3>
        </a>
      ` + html + `
        <a class="learn-more" href="#signup">
          <h3 id="learn-more" class="learn-more">Get a demo</h3>
        </a>
      `;
    }
    else if (window.location.pathname == '/login' || window.location.pathname.includes('/restaurant')) {
      // need the double hash (##) since navigo router automatically removes the first one...
      html += `
        <a class="learn-more" href="##signup">
          <h3 id="learn-more" class="learn-more">Get a demo</h3>
        </a>
      `;
    }

    return html;
  }  
  
  renderLoggedInMobile() {
    let html = `
      <a class="mobile-nav" href="/restaurant/${state.auth.user.username}">Hello, ${state.auth.user.username}</a>
      <a id="nav-logout-mobile" class="mobile-nav" href="/home">Logout</a>
    `;

    if (window.location.pathname == '/' || window.location.pathname == '/home') { // add "about" when on home
      html = `
        <a class="mobile-nav" href="#description-section">About</a>
      ` + html;
    }
    return html;
  }
  
  renderLoggedOutMobile() {
    let html = `
      <a class="mobile-nav" href="/login" data-navigo>Login</a>
    `;

    if (window.location.pathname == '/' || window.location.pathname == '/home') { // add "about" when on home
      html = `
        <a class="mobile-nav" href="#description-section">About</a>
        <a class="mobile-nav" href="#signup">Demo</a>        
      ` + html;
    }
    else if (window.location.pathname == '/login' || window.location.pathname.includes('/restaurant')) {
      html += `
        <a class="mobile-nav" href="/home" data-navigo>Home</a>
      `;
    }
    return html;
  }  

  render() {
    let html = `
      <nav id="navbar" class="navbar">
        <div id="nav-holder" class="nav-holder">
          <a class="logo-container" href="/" data-navigo>          
            <div id="logo" class="logo"></div>
            <div id="mochi" class="mochi">mochibox</div>
          </a>
          <div class="right-links">
            ${ Login.getCurrentUser() ? this.renderLoggedInDesktop() : this.renderLoggedOutDesktop() }
          </div>
          <span id="hamburger">&#9776;</span>
        </div>
      </nav>

      <!-- the mobile side nav -->
      <div id="side-nav">
        <span id="close-nav">&times;</span>
        ${ Login.getCurrentUser() ? this.renderLoggedInMobile() : this.renderLoggedOutMobile() }
      </div>      
    `;
    return html;
  }
}