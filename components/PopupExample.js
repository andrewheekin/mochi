import * as Hammer from 'hammerjs';
import { $id, $cl } from '../js/util';

export class PopupExample {
  constructor() {

  }

  init() {

    $id('prev').onclick = () => plusSlides(-1);
    $id('next').onclick = () => plusSlides(1);
    $id('dot1').onclick = () => currentSlide(1);
    $id('dot2').onclick = () => currentSlide(2);
    $id('dot3').onclick = () => currentSlide(3);

    let paused = false;
    $id('slideshow-container').onmouseover = () => paused = true;
    $id('slideshow-container').onmouseout = () => paused = false;

    let slideIndex = 1;
    showSlides(slideIndex);
    // don't automatically flip the slides on mobile devices
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let si = setInterval(() => {
      if (!paused && !isMobile) plusSlides(1);
    }, 3000);

    // mobile swipe through popup examples
    let mc = new Hammer($id('popup-example'));
    mc.on('swipe', (e) => {
      if (e.deltaX < 0) plusSlides(1);
      if (e.deltaX > 0) plusSlides(-1);
    });

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      // [].slice.call(HTMLcollection) will convert an HTML collection to a JS array
      let slides = [].slice.call($cl('my-slides'));
      let dots = [].slice.call($cl('dot'));

      if (n > slides.length) slideIndex = 1;    
      if (n < 1) slideIndex = slides.length;

      slides.forEach(s => s.style.display = 'none');
      dots.forEach(d => d.className = d.className.replace(' active', ''));

      slides[slideIndex - 1].style.display = 'block';  
      dots[slideIndex - 1].className += ' active';
    }

  }

  render() {
    let html = `
      <div id="popup-example">
        <div class="dot-group">
          <span id="dot1" class="dot"></span> 
          <span id="dot2" class="dot"></span> 
          <span id="dot3" class="dot"></span>
        </div>    
        <div id="slideshow-container">
          <img class="macbook" src="../img/macbook.png">
          <div class="my-slides">
            <img class="popup-background-img" src="../img/skybar.jpg">
            <div class="popup-content">
              <span class="close-popup-bucket">&times;</span>
              <div class="beer-bucket-text">Half off buckets
                <br><hr style="color:white;">
                Today to Friday
                <img class="restaurant-logo" src="../img/restaurant-logo.gif">
              </div>
              <img class="beer-bucket-img" src="../img/beer.jpg">
            </div>
          </div>        
          <div class="my-slides">
            <img class="popup-background-img" src="../img/brick.jpg">
            <div class="popup-content" style="flex-direction:column">
              <span class="close-popup-burger">&times;</span>
              <div class="burger-text">The porch is open!
                <div class="burger-sub-text">$5 Drafts, $5 Burgers</div>
                <img class="burger-restaurant-logo" src="../img/burger-restaurant-logo.gif">              
              </div>
              <img class="burger-img" src="../img/burger.jpg">
            </div>
          </div>
          <div class="my-slides">
            <img class="popup-background-img" src="../img/garlic.jpg">
            <div class="popup-content">
              <span class="close-popup-soup">&times;</span>
              <img class="soup-img" src="../img/soup.jpg">
              <div class="soup-text">Our seasonal menu is here
                <img class="soup-restaurant-logo" src="../img/soup-restaurant-logo.gif">
              </div>
            </div>
          </div>
          <span id="prev" class="desktop">&#10094;</span>
          <span id="next" class="desktop">&#10095;</span>
        </div>
      </div>
    `;
    return html;
  }
}