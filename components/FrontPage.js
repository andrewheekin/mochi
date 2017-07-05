export class FrontPage {
  constructor() { }

  init() { }
  
  render() {
    let html = `
      <div id="front-page">
        <img class="front-img" src="./img/restaurant3.jpg">
        <div class="main-txt">
          <h1 class="tagline">Keep customers up-to-date.</h1>
          <!-- <h3 class="slogan-description">Make announcements, update specials on your website as often as you want with a mochi box</h3> -->
          <a class="demo-button" href="#popup-example">
            <button class="demo-button">Try it out</button>
          </a>
        </div>
        <a href="#description-section">
          <i class="fa fa-chevron-down chevron-down"></i>
        </a>
      </div>
    `;
    return html;
  }
}