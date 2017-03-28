// getElement wrapper
export function $el(id) {
  return document.getElementById(id);
}

// addEventListener wrapper
export function $on(type, callback, target = window) {
  target.addEventListener(type, callback);
}