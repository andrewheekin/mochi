'use strict';

import axios from 'axios';
import './scrollWatch';
import './smoothScroll';
import { $el, $on } from './util.js';


// click submit
$on('click', () => saveFormInfo(), $el('submit-button'));

// change the label and bottom border color back to white when text is entered
$on('input', () => {
  $el('name-wrapper').style.borderBottomColor = 'white';
  $el('name-wrapper').style.color = 'white';
}, $el('name-wrapper'));

// change the label and bottom border color back to white when text is entered
$on('input', () => {
  $el('email-wrapper').style.borderBottomColor = 'white';
  $el('email-wrapper').style.color = 'white';
}, $el('email-wrapper'));

// change the label and bottom border color back to white when text is entered
$on('input', () => {
  $el('restaurant-wrapper').style.borderBottomColor = 'white';
  $el('restaurant-wrapper').style.color = 'white';
}, $el('restaurant-wrapper'));

function saveFormInfo() {
  let name = $el('name').value.trim();
  let email = $el('email').value.trim();
  let restaurant = $el('restaurant').value.trim();
  let phone = $el('phone').value.trim();
  let howHelp = $el('howHelp').value.trim();

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = emailRegex.test(email) ? true : false;

  if (!name || !validEmail || !restaurant) {
    if (!name) {
      $el('name-wrapper').style.borderBottomColor = '#d64646';
      $el('name-wrapper').style.color = '#d64646';
    }
    if (!validEmail) {
      $el('email-wrapper').style.borderBottomColor = '#d64646';
      $el('email-wrapper').style.color = '#d64646';
    }
    if (!restaurant) {
      $el('restaurant-wrapper').style.borderBottomColor = '#d64646';
      $el('restaurant-wrapper').style.color = '#d64646';
    }
    return;
  }

  axios.post('https://v392r778gl.execute-api.us-east-1.amazonaws.com/prod/email', {
    name: name,
    email: email,
    restaurant: restaurant,
    phone: phone,
    howHelp: howHelp
  })
  .then(resp => console.log(resp));

  // clear the form 
  $el('name').value = '';
  $el('email').value = '';
  $el('restaurant').value = '';
  $el('phone').value = '';
  $el('howHelp').value = '';

  // display the modal
  signupModal.style.display = 'block';
}


// show signup modal
let signupModal = $el('signupModal');
let span = document.getElementsByClassName('close')[0];
span.onclick = () => {signupModal.style.display = 'none'};
window.onclick = (e) => {
  if (e.target == signupModal) {
    signupModal.style.display = 'none';
  }
}

