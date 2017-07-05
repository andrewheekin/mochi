import { $id, $cl } from '../js/util';
import { MochiboxDemo } from './MochiboxDemo';
import { Navbar } from './Navbar';
import { invokeApig } from '../js/awsLib';


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

    $id('save-and-publish').onclick = () => {
      this.saveMochibox({
        content: 'hey whatsup hello',
        attachment: null,
      });
    }

    // Show/hide popup based on toggle click
    $id('toggle-demo').onclick = () => {
      if ($id('toggle-demo-text').innerText == 'SHOW') this.mochiboxDemo.showPopup();
      else if ($id('toggle-demo-text').innerText == 'HIDE') this.mochiboxDemo.hidePopup();
    }       

    // monitor the desktop vs mobile toggle and show the right screenshot
    $id('responsive-toggle').onchange = (e) => {
      if ($id('responsive-toggle').checked) { // if mobile toggled
        $id('restaurant-page-site').src = `./img/restaurants/${ this.page }/${ this.page }-site-mobile.png`;
        $id('restaurant-page-site').style.width = 'auto';
        $id('restaurant-page-site').style.height = '800px';
      }
      else { // if desktop toggled
        $id('restaurant-page-site').src = `./img/restaurants/${ this.page }/${ this.page }-site-desktop.png`;
        $id('restaurant-page-site').style.width = '100%';
        $id('restaurant-page-site').style.height = 'auto';
      }
    }
  }

  // async handleSubmit(event) {
  //   event.preventDefault();

  //   if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
  //     alert('Please pick a file smaller than 5MB');
  //     return;
  //   }

  //   this.setState({ isLoading: true });

  //   try {
  //     const uploadedFilename = (this.file)
  //       ? (await s3Upload(this.file, this.props.userToken)).Location
  //       : null;

  //     await this.createNote({
  //       content: this.state.content,
  //       attachment: uploadedFilename,
  //     });
  //     this.props.history.push('/');
  //   }
  //   catch(e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }

  // }

  saveMochibox(note) {
    return invokeApig({
      path: '/mochibox',
      method: 'POST',
      body: note,
    });
  }  

  render() {
    let html = `
      ${ this.navbar.render() }
      <div id="mochi-background"></div>
      <div id="restaurant-page-content">
        <div class="restaurant-page-logo-container">
          <img class="restaurant-page-logo" src="./img/restaurants/${ this.page }/${ this.page }-logo.png">
        </div>
        <div class="restaurant-page-popup-settings">
          <div class="row-1-settings">
            <div class="copy-container">
              <h3 id="copy-script-btn">Copy</h3>
              <input class="copy-script" type="text" value="${ `https://mochibox.io/spiritsOf76.min.js` }">
            </div>
          </div>
          <div class="row-2-settings">
            <h3 id="save-and-publish">Save & Publish</h3>
            <div class="toggle-container">
              <label class="switch">
                <input id="responsive-toggle" type="checkbox">
                <div class="slider"></div>
              </label>
              <i class="fa fa-desktop desktop-toggle-icon" aria-hidden="true"></i>
              <i class="fa fa-mobile mobile-toggle-icon" aria-hidden="true"></i>
            </div>
            <h3 id="toggle-demo">
              <div id="toggle-demo-text">HIDE</div>
              <div class="logo-small"></div>
            </h3>
          </div>
        </div>
        <div id="restaurant-page-site-container">
          <div id="restaurant-page-site-content">
            <img id="restaurant-page-site" src="./img/restaurants/${ this.page }/${ this.page }-site-desktop.png">
            <div id="mochibox-demo-popup"></div>
          </div>
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