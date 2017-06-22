import { $id, $cl } from '../js/util';
import { MochiboxDemo } from './MochiboxDemo';

export class RestaurantPage {
  constructor(name) {
    this.page = name;
    this.mochiboxDemo = new MochiboxDemo(name);
  }

  init() {
    // render the DOM before the init. Leave this first
    this.render();
    this.mochiboxDemo.init();

    // close the mobile nav menu when a link is clicked
    $id('close-nav').onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[0].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[1].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[2].onclick = () => this.closeMobileNav();
    // open the mobile nav menu
    $id('hamburger').onclick = () => this.openMobileNav();

    // monitor the desktop vs mobile toggle and show the right screenshot
    $id('responsive-toggle').onchange = (e) => {
      // if mobile toggled
      if ($id('responsive-toggle').checked) {
        $id('restaurant-page-site').src = `./components/restaurants/${ this.page }/${ this.page }-site-mobile.png`;
        $id('restaurant-page-site').style = 'width: auto; height: 800px; display: block; margin: auto';
      }
      // if desktop toggled
      else {
        $id('restaurant-page-site').src = `./components/restaurants/${ this.page }/${ this.page }-site-desktop.png`;
        $id('restaurant-page-site').style = 'width: 100%';
      }
    }
  }

  openMobileNav() {
    $id('side-nav').style.width = '160px';
  }

  closeMobileNav() {
    $id('side-nav').style.width = '0px';
  }

  render() {
    let html = `
      <nav id="restaurant-page-navbar" class="navbar-scrolled">
        <div id="nav-holder" class="nav-holder-scrolled">
          <div id="logo" class="logo-scrolled"></div>
          <div id="mochi" class="mochi-scrolled">mochibox</div>
          <a class="nav-item" style="right:32%" href="">
            <h3 class="nav-item">About</h3>
          </a>
          <a class="nav-item" style="right:23%" href="/login" data-navigo>
            <h3 class="nav-item">Login</h3>
          </a>
          <a class="learn-more" href="">
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

      <div id="mochi-background"></div>
      <div id="restaurant-page-content">
        <div class="restaurant-page-logo-container">
          <img class="restaurant-page-logo" src="./components/restaurants/${ this.page }/${ this.page }-logo.png">
        </div>
        <div class="restaurant-page-popup-settings">
          <div class="row-1-settings">
            <div></div>
          </div>
          <div class="row-2-settings">
            <!--
            <div class="popup-text-container">
              <h3 class="popup-text-label">TEXT:</h3><input id="popup-text" placeholder="Mochibox text goes here...">
            </div>
            -->
            <h3 class="save-and-publish">Save & Publish</h3>
            <div class="toggle-container">
              <label class="switch">
                <input id="responsive-toggle" type="checkbox">
                <div class="slider"></div>
              </label>
              <i class="fa fa-desktop" aria-hidden="true" style="z-index: 1; transform: translate(-101px, -8px); font-size: 2em; pointer-events: none;"></i>
              <i class="fa fa-mobile" aria-hidden="true" style="z-index: 1; transform: translate(-80px, -5px); font-size: 3em; pointer-events: none;"></i>
            </div>
            <h3 class="toggle-demo">Show<div class="logo-small"></div></h3>
          </div>
        </div>
        <div id="restaurant-page-site-container">
          <img id="restaurant-page-site" src="./components/restaurants/${ this.page }/${ this.page }-site-desktop.png">
        </div>
        <!-- footer here, with css:
          width: 100%;
          background: #333333;
          position: absolute;
          left: -7%;
          margin-top: 50px;
        -->
      </div>
    `;    

    document.getElementById('view').innerHTML = html;

  }

}