import { $id } from './util.js';

// show signup modal
$id('close-modal').onclick = () => {$id('signup-modal').style.display = 'none'};

// specifying e.target catches the click event on the top level DOM element
$id('signup-modal').onclick = (e) => {
  if (e.target == $id('signup-modal')) {
    $id('signup-modal').style.display = 'none';
  }
}