import { $id } from '../js/util';

export class MochiboxDemo {

  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  init() {
    this.render();
    this.showPopup();

    $id('restaurant-page-site').onclick = (e) => { // hide popup if the user clicks outside it
      if (e.target == $id('restaurant-page-site')) this.hidePopup(); // e.target means the top level div id, so not the popup itself
    }

    //close popup on x click
    $id('close-btn').onclick = () => this.hidePopup();

    $id('go-btn').onclick = () => {
      $id('go-btn').style.display = 'none';
      $id('email-ipt').style.display = 'none';
      $id('thanks-label').style.display = 'block';
    }

    document.onkeydown = (e) => {
      switch(e.keyCode) {
        case 27: // press esc to close popup
          this.hidePopup(); break;
        case 13: // press enter to submit email
          goBtn.click(); break;
      }
    };
  }

  showPopup() {
    $id('restaurant-page-site').style.opacity = '.5';
    setTimeout(() => { // wait for DOM elements to load
      $id('content').style.opacity = '1';
      $id('content').style.transform = 'translateY(0px)';      
      // emailIpt.focus(); // put the cursor in the email input
    }, 50);
    $id('toggle-demo-text').innerText = 'HIDE';
  }

  hidePopup() {
    $id('content').style.opacity = '0';
    $id('content').style.transform = 'translateY(-30px)';    
    $id('restaurant-page-site').style.opacity = '1';     
    // adjust toggle demo button
    $id('toggle-demo-text').innerText = 'SHOW';
  }

  render() {
    let html = `
      <div id="content">
        <span id="close-btn">&times</span>
        <div id="popup-text-container">
          <textarea id="popup-text-line-1" class="popup-text" rows="1">Enter your email</textarea>
          <br><hr style="color:white;">
          <textarea id="popup-text-line-2" class="popup-text">For half-off breakfast</textarea>
          <img id="restaurant-logo" src="http://localhost:8080/components/restaurants/${ this.restaurant }/${ this.restaurant }-logo.png">
          <input id="email-ipt" type="text" placeholder="name@email.com">
          <button id="go-btn">GO</button>
          <div id="thanks-label">Thanks</div>
        </div>
        <div id="popup-img-container">
          <img id="popup-img" src="http://localhost:8080/components/restaurants/${ this.restaurant }/${ this.restaurant }-food.jpg">
        </div>
      </div>
    `;

    $id('mochibox-demo-popup').innerHTML = html;
  }
}
