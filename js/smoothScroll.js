import $ from 'jquery';

$(document).ready(() => {
  $('a').on('click', function(e) { // for some reason a fat arrow function breaks things here

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top - 55.5 // top minus navbar height
      }, 600, "swing",  () => {
           window.location.hash = hash;
      });
    }
  });
});