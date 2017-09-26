var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
exports.root = root;

var _js_root = path.resolve(__dirname, '..', '..', '..');
function js_root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_js_root].concat(args));
}
exports.js_root = js_root;