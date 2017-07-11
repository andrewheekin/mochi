import { router } from '../js/scripts';
import { smoothScroll } from '../js/smoothScroll';
import { FrontPage } from './FrontPage';
import { Navbar } from './Navbar';
import { DescriptionSection } from './DescriptionSection';
import { PopupExample } from './PopupExample';
import { Compatibility } from './Compatibility';
// import { Pricing } from './Pricing';
import { Signup } from './Signup';
import { Footer } from './Footer';
import { SignupModal } from './SignupModal';


export class SplashSite {
  constructor() {
    this.frontPage = new FrontPage();
    this.navbar = new Navbar();
    this.descriptionSection = new DescriptionSection();
    this.popupExample = new PopupExample();
    this.compatibility = new Compatibility();
    // this.pricing = new Pricing();
    this.signup = new Signup();
    this.footer = new Footer();
    this.signupModal = new SignupModal();
  }
  
  init() {
    this.render();  // render the DOM before the init. Leave this first

    router.resolve();
    smoothScroll();

    // init page elements
    this.navbar.init();    
    this.frontPage.init();
    this.popupExample.init();
    this.signup.init();
    this.signupModal.init();
  }

  render() {
    let html = `
      <div>
        ${ this.navbar.render() }
        ${ this.frontPage.render() }
        ${ this.descriptionSection.render() }
        ${ this.popupExample.render() }
        ${ this.compatibility.render() }     
        ${ this.signup.render() }
        ${ this.footer.render() }
        ${ this.signupModal.render() }        
      </div>
    `;
    document.getElementById('view').innerHTML = html;
  }
}