// getElementById wrapper
export function $id(id) {
  return document.getElementById(id);
}

// getElementsByClassName wrapper
export function $cl(cl) {
  return document.getElementsByClassName(cl);
}

// addEventListener wrapper
export function $on(type, callback, target = window) {
  target.addEventListener(type, callback);
}

// copy value to clipboard wrapper, (Id of copy button, Id of input field)
export function $copy(clickId, inputId) {
  $id(clickId).onclick = (e) => {
    $id(inputId).select();
    try {
      document.execCommand('copy');
      $id(inputId).blur();
    }
    catch (err) {
      console.log('Copy failed: ' + err);
    }
  }
}
