'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = deepMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepMap(obj, f, ctx) {
  if (Array.isArray(obj)) {
    return obj.map(function (val, key) {
      val = f.call(ctx, val, key);
      return (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' ? deepMap(val, f, ctx) : val;
    });
  } else if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
    var res = {};
    for (var key in obj) {
      var val = obj[key];
      if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
        val = f.call(ctx, val, key);
        res[key] = deepMap(val, f, ctx);
      } else {
        res[key] = f.call(ctx, val, key);
      }
    }
    return res;
  } else {
    return obj;
  }
}