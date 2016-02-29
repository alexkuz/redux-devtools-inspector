'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var truthy = function truthy(x) {
  return x;
};

exports.default = function (theme) {
  return function () {
    var _Object;

    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    var styles = names.reduce(function (arr, name) {
      return [].concat((0, _toConsumableArray3.default)(arr), [name, name + 'Color']);
    }, []).map(function (name) {
      return theme[name];
    }).filter(truthy);

    var classStyles = styles.filter(function (s) {
      return typeof s === 'string';
    });
    var objStyles = styles.filter(function (s) {
      return typeof s !== 'string';
    });

    return (0, _extends3.default)({}, classStyles.length ? { className: classStyles.join(' ') } : {}, objStyles.length ? { style: (_Object = Object).assign.apply(_Object, [{}].concat((0, _toConsumableArray3.default)(objStyles))) } : {});
  };
};