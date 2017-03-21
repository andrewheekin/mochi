'use strict';

let input = (() => {

  // // DOM Objects
  // let emailBtn = document.getElementById('email-button');
  // let emailIpt = document.getElementById('email-input');
  // let emailErr = document.getElementById('email-error');

  // // "get started" button clicked
  // emailBtn.addEventListener('click', () => {
  //   submitEmail();
  // });

  // // if the input box has text, hide the "no email" error
  // emailIpt.addEventListener('input', () => {
  //   if (emailIpt.value) emailErr.innerHTML = "";
  // });

  // // regex to check valid email
  // function validateEmail() {
  //   const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regex.test(emailIpt.value);
  // }

  // function saveEmail() {
  //   // XMLHttpRequest POST
  //   var http = new XMLHttpRequest();
  //   var url = "https://v392r778gl.execute-api.us-east-1.amazonaws.com/prod/email";
  //   var params = JSON.stringify({email: emailIpt.value});
  //   http.open("POST", url, true);
  //   http.setRequestHeader("Content-type", "application/json");
  //   http.onreadystatechange = () => {//Call a function when the state changes.
  //     if(http.readyState == 4 && http.status == 200) {
  //       emailErr.innerHTML = "thanks!"
  //       // TODO: Fix this animation, move it to the CSS
  //       emailErr.style = "color: green; animation: fadein .5s; -moz-animation: fadein .5s; -webkit-animation: fadein .5s;";            
  //     }
  //   }
  //   http.send(params);        
  // }

  // let submitEmail = () => {
  //   if (emailIpt.value) {
  //     if (validateEmail()) {
  //       // valid email was entered. Send email to backend
  //       saveEmail();
  //     }
  //     else {
  //       emailErr.innerHTML = "please enter a valid email";
  //       // TODO: Fix this animation, move it to the CSS
  //       emailErr.style = "color: red; animation: fadein .5s; -moz-animation: fadein .5s; -webkit-animation: fadein .5s;";
  //     }
  //   }
  //   else {
  //     emailErr.innerHTML = "please enter an email";
  //     // TODO: Fix this animation, move it to the CSS
  //     emailErr.style = "color: red; animation: fadein .5s; -moz-animation: fadein .5s; -webkit-animation: fadein .5s;";
  //   }
  // };

return {}
})();



// WEBPACK FOOTER //
// ./js/input.js


// WEBPACK FOOTER //
// ./js/input.js