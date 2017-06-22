import { $id } from '../js/util';

export class MochiboxDemo {

  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  render() {
    let html = `

    `;
    let popup = document.createElement('div');
    // hide popup if the user clicks outside it
    popup.onclick = (e) => {
      if (e.target == popup) {
        popup.style.display = 'none';
        popup.style.opacity = '0';
        popup.style.paddingTop = '100px'; // this resets the padding if the popup will be displayed again     
      }
    }
    popup.style = `
      display: none;
      position: absolute;
      border-radius: 3px;
      top: 0;
      z-index: 2;
      filter: sepia(40%);
      -webkit-filter: sepia(33%);
      padding: 100px calc(50% - 350px);
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.6);
      box-sizing: border-box;
      opacity: 0;
      transition: opacity .5s ease, padding .2s linear;  
    `;
    // change for the real thing
    // position: fixed
    // z-index: 99999999


    let content = document.createElement('div');
    content.style = `
      display: flex;
      position: absolute;
      width: 700px;
      transform: scale(.9);
    `;
    // remove this scale property for the real thing


    let closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times';
    //close popup on x click
    closeBtn.onclick = () => {
      popup.style.display = 'none';
      popup.style.opacity = '0';
      popup.style.paddingTop = '100px';
    }
    closeBtn.onmouseover = () => closeBtn.style.opacity = .5;
    closeBtn.onmouseout = () => closeBtn.style.opacity = 1;
    closeBtn.style = `
      color: black;
      position: absolute;
      top: 7px;
      right: 7px;
      font-size: 30px;
      z-index: 14;
      border: 3px solid black;
      background: white;
      border-radius: 53px;
      height: 23px;
      width: 23px;
      line-height: .6;
      text-align: center;
      font-weight: bold;
      transition: opacity .1s ease;
    `;


    let popupText = document.createElement('div');
    popupText.innerHTML = 'Enter your email<br><hr style="color:white;">For half-off breakfast';
    popupText.style = `
      color: white;
      text-transform: uppercase;
      background: #7bb2b2;
      text-align: center;
      border: 5px solid white;
      padding: 35px 18px;
      line-height: 1.1em;
      font-size: 23px;
      letter-spacing: 1.2px;
    `;
      // @media #{$mobile-portrait} {
      //   padding: 10px;
      //   font-size: 15px;    
      // }


    let restaurantLogo = document.createElement('img');
    restaurantLogo.src = `http://localhost:8080/components/restaurants/${ this.restaurant }/${ this.restaurant }-logo.png`;
    restaurantLogo.style = `
      width: 58%;
      margin: 15px 0px;
    `;


    let popupImg = document.createElement('img');
    popupImg.src = `http://localhost:8080/components/restaurants/${ this.restaurant }/${ this.restaurant }-food.jpg`;
    popupImg.style = `
      z-index: 10;
      pointer-events: none;
      box-shadow: 11px 12px 16px 0px rgba(0, 0, 0, 0.28);
      height: 370px;
      border: 5px solid white;
      border-left: 0;
    `;
      // @media #{$mobile-portrait} {
      //   height: 180px;    


    let emailIpt = document.createElement('input');
    emailIpt.type = 'text';
    emailIpt.placeholder = 'name@email.com';
    emailIpt.style = `
      border-radius: 3px 0px 0px 3px;
      width: 70%;
      padding: 10px 5px 10px 20px;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      border: none;
      background: rgba(255, 255, 255, 0.9);
      color: white;
      outline: none;
    `;


    let goBtn = document.createElement('button');
    goBtn.innerHTML = 'GO';
    // submit the email and say 'thanks!' when the GO! button is clicked
    goBtn.onclick = () => {
      goBtn.style.display = 'none';
      emailIpt.style.display = 'none';
      thanksLabel.style.display = 'block';
    }
    goBtn.onmouseover = () => goBtn.style.opacity = .8;
    goBtn.onmouseout = () => goBtn.style.opacity = 1;
    goBtn.style = `
      padding: 10px;
      border: none;
      border-radius: 0px 3px 3px 0px;
      font-size: 13px;
      background: grey;
      font-weight: bold;
      transition: opacity .1s ease;
    `;


    let thanksLabel = document.createElement('div');
    thanksLabel.innerHTML = 'Thanks!';
    thanksLabel.style = `
      display: none;
      line-height: 1em;
      font-weight: normal;
      font-size: 17px;
      letter-spacing: 1.5px;
    `;


    // build the modal
    popupText.appendChild(restaurantLogo);
    popupText.appendChild(emailIpt);
    popupText.appendChild(goBtn);
    popupText.appendChild(thanksLabel);
    content.appendChild(closeBtn);
    content.appendChild(popupText);
    content.appendChild(popupImg);
    popup.appendChild(content);
    $id('restaurant-page-site-container').appendChild(popup);


    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.opacity = '1';
      popup.style.paddingTop = '120px';
      // put the cursor in the email input    
      // emailIpt.focus();
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
          popup.style.display = 'none';
          popup.style.opacity = '0';
          popup.style.paddingTop = '100px';
          break;
        case 13: // press enter to submit email
          goBtn.click();
          break;
      }
    };
  }

}
