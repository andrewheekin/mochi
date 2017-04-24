// let js = document.createElement("script"); js.type = "text/javascript"; js.src = "http://localhost:8080/js/mochibox.js"; document.body.appendChild(js);

let popup = document.createElement('div');
// hide popup if the user clicks outside it
popup.onclick = (e) => {
  if (e.target == popup) popup.style.display = 'none';
}
popup.style = `
  position: fixed;
  border-radius: 3px;
  top: 0;
  z-index: 99999999;
  filter: sepia(40%);
  -webkit-filter: sepia(33%);
  padding: 120px calc(50% - 350px);
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.6);
  box-sizing: border-box;
`;


let content = document.createElement('div');
content.style = `
  display: flex;
  position: absolute;
  width: 700px;
`;


let closeButton = document.createElement('span');
closeButton.innerHTML = '&times';
//close popup on x click
closeButton.onclick = () => popup.style.display = 'none';
closeButton.onmouseover = () => closeButton.style.opacity = .5;
closeButton.onmouseout = () => closeButton.style.opacity = 1;
closeButton.style = `
  color: black;
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 30px;
  z-index: 14;
  border: 3px solid black;
  background: white;
  border-radius: 53px;
  height: 23px;
  width: 23px;
  line-height: .7;
  text-align: center;
  font-weight: bold;
  transition: opacity .2s ease;
`;
  // &:hover, &:active {
  //   opacity: 0.3;
  //   text-decoration: none;
  //   cursor: pointer;


let popupText = document.createElement('div');
popupText.innerHTML = 'Half off buckets<br><hr style="color:white;">Today to Friday';
popupText.style = `
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  background: black;
  text-align: center;
  border: 5px solid white;
  padding: 35px 18px;
  line-height: 1.7em;
  font-size: 30px;
  letter-spacing: 3px;
`;
  // @media #{$mobile-portrait} {
  //   padding: 10px;
  //   font-size: 15px;    
  // }


let restaurantLogo = document.createElement('img');
restaurantLogo.src = 'http://localhost:8080/img/restaurant-logo.gif';
restaurantLogo.style = `
  width: 90%;
  margin-top: 10px;
`;


let popupImg = document.createElement('img');
popupImg.src = 'http://localhost:8080/img/beer.jpg';
popupImg.style = `
  z-index: 10;
  pointer-events: none;
  box-shadow: 11px 12px 16px 0px rgba(0, 0, 0, 0.28);
  height: 368px;
`;
  // @media #{$mobile-portrait} {
  //   height: 180px;    



popupText.appendChild(restaurantLogo);
content.appendChild(closeButton);
content.appendChild(popupText);
content.appendChild(popupImg);
popup.appendChild(content);
setTimeout(() => document.body.appendChild(popup), 1000);


document.onkeypress = (e) => {
  switch(e.key) {
    // press 1 to re-display the popup
    case '1':
      popup.style.display = 'block';
      break;
    default:
      break;
  }
};

// make adding the email have the input disappear and there reveal a coupon code
// do it for bayou bakery and spirits of '76
// make an https version...
// add in a mobile version...


