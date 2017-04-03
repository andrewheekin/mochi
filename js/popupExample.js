import { $id, $cl } from './util';

$id('prev').onclick = () => plusSlides(-1);
$id('next').onclick = () => plusSlides(1);
$id('dot1').onclick = () => currentSlide(1);
$id('dot2').onclick = () => currentSlide(2);
$id('dot3').onclick = () => currentSlide(3);

// pause the auto-slider when user hovers over popup, un-pause it back when user hovers off popup
let paused = false;
$id('slideshow-container').onmouseover = () => paused = true;
$id('slideshow-container').onmouseout = () => paused = false;

let slideIndex = 1;
showSlides(slideIndex);
// let si = setInterval(() => {
//   if (!paused) showSlides(slideIndex += 1)
// }, 3000);

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