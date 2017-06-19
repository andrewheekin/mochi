import { $id } from '../js/util';

export class Signup {
  constructor() {

  }

  init() {
    // click submit
    $id('submit-button').onclick = () => this.saveFormInfo();
    
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

  }


  saveFormInfo() {
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

    fetch('https://v392r778gl.execute-api.us-east-1.amazonaws.com/prod/email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        restaurant: restaurant,
        phone: phone,
        howHelp: howHelp
      })
    });

    // clear the form 
    $id('name').value = '';
    $id('email').value = '';
    $id('restaurant').value = '';
    $id('phone').value = '';
    $id('howHelp').value = '';

    // display the modal
    $id('signup-modal').style.display = 'block';  
  }  


  render() {
    let html = `
      <div id="signup">
        <img id="signup-img" src="../img/signup.jpg">
        <div class="signup-container">
          <div class="signup-title">Let's chat.</div>
          <form>
            <div class="signup-input">
              <div class="signup-info">
                <div class="signup-field" id="name-wrapper">
                  <label for="name">Name:<sup>*</sup></label>
                  <input type="text" id="name">
                </div>
                <div class="signup-field" id="email-wrapper">
                  <label for="email">Email:<sup>*</sup></label>
                  <input type="email" id="email">
                </div>
                <div class="signup-field" id="restaurant-wrapper">
                  <label for="restaurant">Restaurant:<sup>*</sup></label>
                  <input type="text" id="restaurant">
                </div>
                <div class="signup-field">
                  <label for="phone">Phone:</label>
                  <input type="tel" id="phone">
                </div>                        
              </div>
              <div class="signup-textarea">
                <textarea id="howHelp" placeholder="How can we help?"></textarea>
              </div>
            </div>
            <h3 id="submit-button">Submit</h3>
          </form>
          <div class="call-us">Or Call Us at <a href="tel:4043043723">404.304.3723</a></div>        
        </div>
      </div>
    `;
    return html;
  }
}