import $ from 'jquery';

export function smoothScroll() {
  $(document).ready(() => {
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let navbarHeight = isMobile ? 74 : 55.5;  // the desktop navbar is 55.5px, the mobile (<992px) navbar is 74px

    $('a').on('click', function(e) { // for some reason a fat arrow function breaks things here

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        e.preventDefault();

        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top - navbarHeight // top minus navbar height
        }, 600, "swing",  () => {
             window.location.hash = hash;
        });
      }
    });
  });
}