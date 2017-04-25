// let js = document.createElement("script"); js.src = "http://localhost:8080/mochiboxes/mochibox-astor.js"; document.body.appendChild(js);

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
  transition: opacity .1s ease;
`;


let popupText = document.createElement('div');
popupText.innerHTML = 'Enter your email<br><hr style="color:white;">For half-off a bucket';
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
  width: 70%;
  margin-bottom: 15px;
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


let emailIpt = document.createElement('input');
emailIpt.type = 'text';
emailIpt.placeholder = 'name@email.com';
emailIpt.placeholder.style = 'color: white';
emailIpt.style = `
  border-radius: 3px 0px 0px 3px;
  width: 70%;
  padding: 10px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
`;


let goBtn = document.createElement('button');
goBtn.innerHTML = 'GO!';
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
thanksLabel.innerHTML = 'Thanks!<br>Check your email for the deal';
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
content.appendChild(closeButton);
content.appendChild(popupText);
content.appendChild(popupImg);
popup.appendChild(content);
setTimeout(() => {
  document.body.appendChild(popup);
  // put the cursor in the email input NOT WORKING
  emailIpt.focus();
}, 1000);


document.onkeydown = (e) => {
  switch(e.keyCode) {
    case 49: // press 1 to re-display popup
      popup.style.display = 'block';
      break;
    case 27: // press esc to close popup
      popup.style.display = 'none';
      break;
  }
};


// do it for bayou bakery and spirits of '76
// make an https version...
// add in a mobile version...

