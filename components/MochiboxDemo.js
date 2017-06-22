import { $id } from '../js/util';

export class MochiboxDemo {

  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  init() {
    this.render();

    $id('popup').onclick = (e) => { // hide popup if the user clicks outside it
      if (e.target == $id('popup')) this.hidePopup();
    }

    //close popup on x click
    $id('close-btn').onclick = () => this.hidePopup();

    $id('go-btn').onclick = () => {
      $id('go-btn').style.display = 'none';
      $id('email-ipt').style.display = 'none';
      $id('thanks-label').style.display = 'block';
    }

    setTimeout(() => {  // display the popup onload
      $id('popup').style.opacity = '1';
      $id('popup').style.paddingTop = '120px';
      // emailIpt.focus();   // put the cursor in the email input
    }, 50);

    document.onkeydown = (e) => {
      switch(e.keyCode) {
        case 49: // press 1 to re-display popup
          popup.style.display = 'block';
          setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.paddingTop = '120px';
            // put the cursor in the email input    
            // emailIpt.focus();
          }, 50);
          break;
        case 27: // press esc to close popup
          this.hidePopup();
          break;
        case 13: // press enter to submit email
          goBtn.click();
          break;
      }
    };    
  }

  hidePopup() {
    $id('popup').style.display = 'none';
    $id('popup').style.opacity = '0';
    $id('popup').style.paddingTop = '100px'; // this resets the padding if the popup will be displayed again      
  }

  render() {
    let html = `
      <div id="popup">
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
          <img id="popup-img" src="http://localhost:8080/components/restaurants/${ this.restaurant }/${ this.restaurant }-food.jpg">
        </div>
      </div>
    `;

    $id('restaurant-page-site-container').innerHTML += html;
  }
}
