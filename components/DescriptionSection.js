export class DescriptionSection {
  constructor() {

  }  

  render() {
    let html = `
      <div id="description-section">
        <div class="description-section-text"><b>Make announcements</b> and <b>update specials</b> on your restaurant's website <b>as often as you want</b> with a mochibox.</div>
        <div class="why-mochi desktop">
          <div class="reason-mochi">
            <div class="reason-mochi-header">Say what you want</div>
            <div class="reason-mochi-text">Easily change the message site visitors see,<br>it will show up <b>right away</b> on your website's<br> mochibox, no wait time<br><div style="font-size:32px; margin-top:12px;">&#128075;</div></div>
          </div>
          <div class="reason-mochi">
            <div class="reason-mochi-header">A make or break</div>
            <div class="reason-mochi-text"><b>61% of patrons</b> will visit the restaurant's<br>website before their visit. Get them in<br>the door with a <b>custom, relevant</b> message<br><div style="font-size:32px; margin-top:12px;">&#127869;</div></div>
          </div>
          <div class="reason-mochi">
            <div class="reason-mochi-header">Get smart with it</div>
            <div class="reason-mochi-text">Customize what mochibox shows your site<br>visitors based on the weather, time of day,<br>nearby events, or their location<br><div style="font-size:32px; margin-top:12px;">&#127780;</div></div>
          </div>
        </div>
        <div class="why-mochi mobile-portrait">
          <div class="reason-mochi">
            <div class="reason-mochi-header">Say what you want</div>
            <div class="reason-mochi-text">Easily change the message site visitors see, it will show up <b>right away</b> on your website's mochibox, no wait time<div style="font-size:32px; margin-top:12px;">&#128075;</div></div>
          </div>
          <div class="reason-mochi">
            <div class="reason-mochi-header">A make or break</div>
            <div class="reason-mochi-text"><b>61% of patrons</b> will visit the restaurant's website before their visit. Get them in the door with a <b>custom, relevant</b> message<div style="font-size:32px; margin-top:12px;">&#127869;</div></div>
          </div>
          <div class="reason-mochi">
            <div class="reason-mochi-header">Get smart with it</div>
            <div class="reason-mochi-text">Customize what mochibox shows your site visitors based on the weather, time of day, nearby events, or their location<div style="font-size:32px; margin-top:12px;">&#127780;</div></div>
          </div>
        </div>
        <div class="popup-example-chevron">
          <a href="#popup-example">
            <i class="fa fa-chevron-down chevron-description"></i>
          </a>
        </div>
      </div>
    `;
    return html;
  }
}