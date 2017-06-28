import { $id, $cl } from '../js/util';
import { MochiboxDemo } from './MochiboxDemo';
import { Navbar } from './Navbar';

export class RestaurantPage {
  constructor(name) {
    this.page = name;
    this.mochiboxDemo = new MochiboxDemo(name);
    this.navbar = new Navbar();
  }

  init() {
    // render the DOM before the init. Leave this first
    this.render();
    this.mochiboxDemo.init();
    this.navbar.init();

    // copy the script src when clicked
    $id('copy-script-btn').onclick = () => {}

    // Show/hide popup based on toggle click
    $id('toggle-demo').onclick = () => {
      if ($id('toggle-demo-text').innerText == 'SHOW') this.mochiboxDemo.showPopup();
      else if ($id('toggle-demo-text').innerText == 'HIDE') this.mochiboxDemo.hidePopup();
    }       

    // monitor the desktop vs mobile toggle and show the right screenshot
    $id('responsive-toggle').onchange = (e) => {
      if ($id('responsive-toggle').checked) { // if mobile toggled
        $id('restaurant-page-site').src = `./components/restaurants/${ this.page }/${ this.page }-site-mobile.png`;
        $id('restaurant-page-site').style = 'width: auto; height: 800px; display: block; margin: auto';
        $id('restaurant-page-site-container').style.margin = 'margin: 0px 30px;';
      }
      else { // if desktop toggled
        $id('restaurant-page-site').src = `./components/restaurants/${ this.page }/${ this.page }-site-desktop.png`;
        $id('restaurant-page-site').style = 'width: 100%';
        $id('restaurant-page-site-container').style.margin = 'margin: 0px 30px;';        
      }
    }
  }

  render() {
    let html = `
      ${ this.navbar.render() }
      <div id="mochi-background"></div>
      <div id="restaurant-page-content">
        <div class="restaurant-page-logo-container">
          <img class="restaurant-page-logo" src="./components/restaurants/${ this.page }/${ this.page }-logo.png">
        </div>
        <div class="restaurant-page-popup-settings">
          <div class="row-1-settings">
            <div class="copy-container">
              <h3 id="copy-script-btn">Copy</h3>
              <input class="copy-script" type="text" value="${ `https://mochibox.io/spiritsOf76.min.js` }">
            </div>
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
            <h3 id="toggle-demo">
              <div id="toggle-demo-text">HIDE</div>
              <div class="logo-small"></div>
            </h3>
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