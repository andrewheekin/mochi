import { $id, $cl } from '../js/util';

export class SideNav {
  constructor() {

  }

  init() {
    // close the mobile nav menu when a link is clicked
    $id('close-nav').onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[0].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[1].onclick = () => this.closeMobileNav();
    $cl('mobile-nav')[2].onclick = () => this.closeMobileNav();
  }

  closeMobileNav() {
    $id('side-nav').style.width = '0px';
  }

  render() {
    let html = `
      <div id="side-nav">
        <span id="close-nav">&times;</span>
        <a class="mobile-nav" href="#description-section">About</a>
        <a class="mobile-nav" href="#pricing">Pricing</a>
        <a class="mobile-nav" href="#signup">Demo</a>
      </div>
    `;
    return html;
  }
}