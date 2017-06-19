import { $id } from '../js/util';

export class SignupModal {
  constructor() {

  }

  init() {
    // show signup modal
    $id('close-modal').onclick = () => {$id('signup-modal').style.display = 'none'};

    // specifying e.target catches the click event on the top level DOM element
    $id('signup-modal').onclick = (e) => {
      if (e.target == $id('signup-modal')) {
        $id('signup-modal').style.display = 'none';
      }
    }
  }

  render() {
    let html = `
      <div id="signup-modal" class="modal">
        <div class="modal-content">
          <span id="close-modal">&times;</span>
          <p>Thanks!</p>
        </div>
      </div>
    `;
    return html;
  }
}