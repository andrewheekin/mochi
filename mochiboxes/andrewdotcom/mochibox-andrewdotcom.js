// press 1 to show popup, click outside the popup to hide it
// let js = document.createElement("script"); js.src = "https://mochibox.io/mochiboxes/spirits76/mochibox-spirits76.js"; document.body.appendChild(js);

// elements of this script:
// 1) the options object (what gets stored in dynamo)
// 2) the template itself (same across all scripts)
// 3) the tracking script call (only allow from the site's origin)

(function() {

  // #### UTIL ####
  function $(id) {
    return document.getElementById(id);
  }

  function display() {
    mp.style.display = 'block';
    setTimeout(() => {
      mp.style.opacity = '1';
      mp.style.paddingTop = '120px';
      // put the cursor in the email input    
      mei.focus();
    }, 50);
  }

  function hide() {
    mp.style.display = 'none';
    mp.style.opacity = '0';
    mp.style.paddingTop = '100px';
  }


  // #### DOM ####

  let popup = `
    <div id="mochi-popup">
      <div id="mochi-content">
        <span id="mochi-close-btn">&times</span>
        <div id="mochi-popup-txt">
          Enter your email<br><hr style="color:white;">For half-off breakfast
          <img id="mochi-restaurant-logo" src="https://mochibox.io/mochiboxes/spirits76/logo.png">        
          <input id="mochi-email-ipt" type="text" placeholder="name@email.com">
          <button id="mochi-go-btn">GO</button>
          <div id="mochi-thanks-lbl">Thanks</div>
        </div>
        <img id="mochi-popup-img" src="https://mochibox.io/mochiboxes/spirits76/food.jpg">
      </div>  
    </div>
  `;
  document.body.innerHTML += popup;

  let mp = $('mochi-popup');
  let mc = $('mochi-content');
  let mcb = $('mochi-close-btn');
  let mpt = $('mochi-popup-txt');
  let mrl = $('mochi-restaurant-logo');
  let mpi = $('mochi-popup-img');
  let mei = $('mochi-email-ipt');
  let mgb = $('mochi-go-btn');
  let mtl = $('mochi-thanks-lbl');


  // #### STYLE ####

  mp.style = `
    display: none;
    position: fixed;
    border-radius: 3px;
    top: 0;
    z-index: 99999999;
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

  mc.style = `
    display: flex;
    position: absolute;
    width: 700px;
  `;

  mcb.style = `
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
    line-height: .6;
    text-align: center;
    font-weight: bold;
    transition: opacity .1s ease;
  `;

  mpt.style = `
    color: white;
    text-transform: uppercase;
    background: black;
    text-align: center;
    border: 5px solid white;
    padding: 35px 18px;
    line-height: 1.1em;
    font-size: 23px;
    letter-spacing: 1.2px;
  `;

  mrl.style = `
    width: 58%;
    margin: 15px 0px;
  `;

  mpi.style = `
    z-index: 10;
    pointer-events: none;
    box-shadow: 11px 12px 16px 0px rgba(0, 0, 0, 0.28);
    height: 368px;
  `;

  mei.style = `
    border-radius: 3px 0px 0px 3px;
    width: 70%;
    padding: 10px 5px 10px 20px;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
  `;

  mgb.style = `
    padding: 10px;
    border: none;
    border-radius: 0px 3px 3px 0px;
    font-size: 13px;
    background: grey;
    font-weight: bold;
    transition: opacity .1s ease;
  `;

  mtl.style = `
    display: none;
    line-height: 1em;
    font-weight: normal;
    font-size: 17px;
    letter-spacing: 1.5px;
  `;


  // #### EVENTLISTENERS ####

  mp.onclick = (e) => { // hide popup if the user clicks outside it
    if (e.target == mp) hide();
  }

  mcb.onclick = () => hide();  //close popup on x click
  mcb.onmouseover = () => mcb.style.opacity = .5;
  mcb.onmouseout = () => mcb.style.opacity = 1;

  mgb.onclick = () => { // submit email and say 'thanks' when GO button is clicked
    mgb.style.display = 'none';
    mei.style.display = 'none';
    mtl.style.display = 'block';
  }
  mgb.onmouseover = () => mgb.style.opacity = .8;
  mgb.onmouseout = () => mgb.style.opacity = 1;


  // display();


  document.onkeydown = (e) => {
    switch(e.keyCode) {
      case 49: // press 1 to re-display popup
        display();
        break;
      case 27: // press esc to close popup
        hide();
        break;
      case 13: // press enter to submit email
        mgb.click();
        break;
    }
  };

})();
