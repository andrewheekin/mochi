import $ from 'jquery';

$(document).ready(() => {
  $('a').on('click', function(e) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, () => {
           window.location.hash = hash;
      });
    }
  });
});