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