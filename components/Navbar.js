import { $id, $cl } from '../js/util';
import { router } from '../js/scripts';

export class Navbar {
  constructor() {

  }

  init() {
    router.resolve();

    // close the mobile nav menu when a link is clicked
    $id('close-nav').onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[0].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[1].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[2].onclick = () => this.closeMobileNav();
    // open the mobile nav menu
    $id('hamburger').onclick = () => this.openMobileNav();
  }

  openMobileNav() {
    $id('side-nav').style.width = '160px';
  }

  closeMobileNav() {
    $id('side-nav').style.width = '0px';
  }
  
  render() {
    let html = `
      <nav id="navbar" class="navbar">
        <div id="nav-holder" class="nav-holder">
          <div id="logo" class="logo"></div>
          <div id="mochi" class="mochi">mochibox</div>
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