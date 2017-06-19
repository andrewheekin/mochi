export class Footer {
  constructor() {

  }

  render() {
    let html = `
      <div id="footer">
        <div class="footer-holder">
          <div class="footer-logo"></div>
          <div class="mochi-scrolled">mochibox</div>
          <!-- <div class="mochi-popup-scrolled">box</div> -->
          <div class="copyright desktop">Made with &hearts; by Mochibox | &copy; 2017 Mochibox LLC, All Rights Reserved.</div>
          <div class="copyright mobile-portrait">&copy; 2017 Mochibox.io</div>
        </div>
      </div>
    `;
    return html;
  }
}