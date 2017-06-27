import throttle from 'lodash/throttle';
import { $id, $cl, $on } from '../js/util';
import { router } from '../js/scripts';

export class Navbar {
  constructor() { }

  init() {
    router.resolve();

    // close the mobile nav menu when a link is clicked
    $id('close-nav').onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[0].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[1].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[2].onclick = () => this.closeMobileNav();

    // open the mobile nav menu
    $id('hamburger').onclick = () => this.openMobileNav();

    // check scroll height
    $on('scroll', throttle(() => this.checkScroll(), 100));
    $on('load', () => this.checkScroll());

    
  }

  openMobileNav() {
    $id('side-nav').style.width = '160px';
  }

  closeMobileNav() {
    $id('side-nav').style.width = '0px';
  }

  checkScroll() {
    // if on the splash page
    if (window.location.pathname == '/' || window.location.pathname == '/home') {
      // if scrolled past main page, make the "learn more" box colored fusia
      if (window.scrollY >= 700) {
        $id('learn-more').className = 'learn-more-scrolled'
      }
      else if (window.scrollY < 700) {
        $id('learn-more').className = 'learn-more'
      }

      // if scrolled past 20px, change navbar
      if (window.scrollY >= 20) {
        $id('navbar').className = 'navbar-scrolled';
        $id('nav-holder').className = 'nav-holder-scrolled';
        $id('logo').className = 'logo-scrolled';
        $id('mochi').className = 'mochi-scrolled';
      }
      else if (window.scrollY < 20) {
        $id('navbar').className = 'navbar';
        $id('nav-holder').className = 'nav-holder';
        $id('logo').className = 'logo';
        $id('mochi').className = 'mochi';
      }
    }

    else if (window.location.pathname == '/login') {
      $id('navbar').className = 'navbar-scrolled';
      $id('nav-holder').className = 'nav-holder-scrolled';
      $id('logo').className = 'logo-scrolled';
      $id('mochi').className = 'mochi-scrolled';   
    }

    else if (window.location.pathname.includes('/restaurant')) {
      $id('navbar').className = 'navbar-scrolled';
      $id('nav-holder').className = 'nav-holder-scrolled';
      $id('logo').className = 'logo-scrolled';
      $id('mochi').className = 'mochi-scrolled';   
    }
  }
  
  render() {
    let html = `
      <nav id="navbar" class="navbar">
        <div id="nav-holder" class="nav-holder">
          <a class="logo-container" href="/" data-navigo>          
            <div id="logo" class="logo"></div>
            <div id="mochi" class="mochi">mochibox</div>
          </a>
          <a class="nav-item" style="right:32%" href="#description-section">
            <h3 class="nav-item">About</h3>
          </a>
          <a class="nav-item" style="right:23%" href="/login" data-navigo>
            <h3 class="nav-item">Login</h3>
          </a>
          <a class="learn-more" href="#signup">
            <h3 id="learn-more" class="learn-more">Get a demo</h3>
          </a>
          <span id="hamburger">&#9776;</span>
        </div>
      </nav>

      <!-- the mobile side nav -->
      <div id="side-nav">
        <span id="close-nav">&times;</span>
        <a class="mobile-nav" href="#description-section">About</a>
        <a class="mobile-nav" href="/login" data-navigo>Login</a>
        <a class="mobile-nav" href="#signup">Demo</a>
      </div>      
    `;
    return html;
  }
}