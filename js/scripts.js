'use strict';

import axios from 'axios';
import './scrollWatch';
import './smoothScroll';
import './signupModal';
import './popupExample';
import { $id } from './util';


// click submit
$id('submit-button').onclick = () => saveFormInfo();

// change the name label and bottom border color back to white when text is entered
$id('name-wrapper').oninput = () => {
  $id('name-wrapper').style.borderBottomColor = 'white';
  $id('name-wrapper').style.color = 'white';
};

// change the email label and bottom border color back to white when text is entered
$id('email-wrapper').oninput = () => {
  $id('email-wrapper').style.borderBottomColor = 'white';
  $id('email-wrapper').style.color = 'white'; 
}

// change the restaurant label and bottom border color back to white when text is entered
$id('restaurant-wrapper').oninput = () => {
  $id('restaurant-wrapper').style.borderBottomColor = 'white';
  $id('restaurant-wrapper').style.color = 'white';  
}


function saveFormInfo() {
  // trim whitespace off input value
  let name = $id('name').value.trim();
  let email = $id('email').value.trim();
  let restaurant = $id('restaurant').value.trim();
  let phone = $id('phone').value.trim();
  let howHelp = $id('howHelp').value.trim();

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = emailRegex.test(email) ? true : false;

  if (!name || !validEmail || !restaurant) {
    if (!name) {
      $id('name-wrapper').style.borderBottomColor = '#d64646';
      $id('name-wrapper').style.color = '#d64646';
    }
    if (!validEmail) {
      $id('email-wrapper').style.borderBottomColor = '#d64646';
      $id('email-wrapper').style.color = '#d64646';
    }
    if (!restaurant) {
      $id('restaurant-wrapper').style.borderBottomColor = '#d64646';
      $id('restaurant-wrapper').style.color = '#d64646';
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
  // .then(resp => console.log(resp));

  // clear the form 
  $id('name').value = '';
  $id('email').value = '';
  $id('restaurant').value = '';
  $id('phone').value = '';
  $id('howHelp').value = '';

  // display the modal
  $id('signup-modal').style.display = 'block';  
}




