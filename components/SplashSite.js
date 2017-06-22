import throttle from 'lodash/throttle';
import { $on, $id } from '../js/util';
import { router } from '../js/scripts';
import { smoothScroll } from '../js/smoothScroll';
import { FrontPage } from './FrontPage';
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
    this.popupExample.init();
    this.signupModal.init();
    this.frontPage.init();
    this.signup.init();

    // check scroll height
    $on('scroll', throttle(() => this.checkScroll(), 100));
    $on('load', () => this.checkScroll());
  }

  checkScroll() {
    // if scrolled past main page, make the "learn more" box colored fusia
    if (window.scrollY >= 700) {
      $id('learn-more').className = 'learn-more-scrolled'
    }
    else if (window.scrollY < 700) {
      $id('learn-more').className = 'learn-more'
    }

    // if scrolled past 20px, change navbar
    if (window.scrollY >= 20) {
      $id('navbar').className = 'navbar-scrolled';
      $id('nav-holder').className = 'nav-holder-scrolled';
      $id('logo').className = 'logo-scrolled';
      $id('mochi').className = 'mochi-scrolled';
    }
    else if (window.scrollY < 20) {
      $id('navbar').className = 'navbar';
      $id('nav-holder').className = 'nav-holder';
      $id('logo').className = 'logo';
      $id('mochi').className = 'mochi';
    }
  }  

  render() {
    let html = `
      <div>
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