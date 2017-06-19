export class Navbar {
  constructor() {

  }
  
  render() {
    let html = `
      <nav id="navbar" class="navbar">
        <div id="nav-holder" class="nav-holder">
          <div id="logo" class="logo"></div>
          <div id="mochi" class="mochi">mochibox</div>
          <!-- <div id="mochi-popup" class="mochi-popup">box</div> -->
          <a class="nav-item" style="right:32%" href="#description-section">
            <h3 class="nav-item">About</h3>
          </a>
          <a class="nav-item" style="right:23%" href="#login">
            <h3 class="nav-item">Login</h3>
          </a>
          <a class="learn-more" href="#signup">
            <h3 id="learn-more" class="learn-more">Get a demo</h3>
          </a>
          <span id="hamburger">&#9776;</span>
        </div>
      </nav>
    `;
    return html;
  }
}