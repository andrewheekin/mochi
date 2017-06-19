export class Compatibility {
  constructor() {

  }

  render() {
    let html = `
      <div id="compatibility">
        <div class="compatibility-text mobile-portrait">Add to one line of code to...<br><span style="text-transform:none">(and more, no developer needed):</span></div>
        <div class="compatibility-text desktop">Add to one line of code to... <span style="text-transform:none">(and more, no developer needed):</span></div>      
        <div class="compatibility-container">
          <img class="squarespace-logo" src="../img/logos/squarespace.png">
          <img class="html5-logo" src="../img/logos/html5.png">
          <img class="shopify-logo" src="../img/logos/shopify.png">
          <img class="tumblr-logo" src="../img/logos/tumblr.png">
          <img class="weebly-logo" src="../img/logos/weebly.png">
          <img class="wordpress-logo" src="../img/logos/wordpress.png">
        </div>
      </div>
    `;
    return html;
  }
}