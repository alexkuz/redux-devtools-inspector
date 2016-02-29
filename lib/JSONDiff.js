'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leonavesReactJsonTree = require('leonaves-react-json-tree');

var _leonavesReactJsonTree2 = _interopRequireDefault(_leonavesReactJsonTree);

var _deepMap = require('./deepMap');

var _deepMap2 = _interopRequireDefault(_deepMap);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringify(val) {
  var str = (0, _stringify2.default)(val);

  return str.length > 22 ? str.substr(0, 15) + '…' + str.substr(-5) : str;
}

function prepareDelta(delta) {
  var diffs = [];
  var diffId = -1;
  var data = (0, _deepMap2.default)(delta, function (val) {
    if (Array.isArray(val)) {
      diffs.push(val);
      diffId++;
      return '<JSON_DIFF_ID>' + diffId;
    }

    if (val && val._t === 'a') {
      return (0, _keys2.default)(val).reduce(function (obj, key) {
        if (key === '_t') {
          return obj;
        }if (key[0] === '_' && !val[key.substr(1)]) {
          return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, key.substr(1), val[key]));
        } else if (val['_' + key]) {
          return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, key, [val['_' + key][0], val[key][0]]));
        } else if (!val['_' + key] && key[0] !== '_') {
          return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, key, val[key]));
        }

        return obj;
      }, {});
    }

    return val;
  });

  return { diffs: diffs, data: data };
}

function _valueRenderer(raw, diffs, createTheme) {
  function renderSpan(name, body) {
    return _react2.default.createElement(
      'span',
      (0, _extends6.default)({ key: name }, createTheme('diff', name)),
      body
    );
  }

  if (raw.indexOf('"<JSON_DIFF_ID>') === 0) {
    var diff = diffs[parseInt(raw.replace(/[^\d]/g, ''), 10)];

    if (Array.isArray(diff)) {
      switch (diff.length) {
        case 1:
          return renderSpan('diffAdd', stringify(diff[0]));
        case 2:
          return _react2.default.createElement(
            'span',
            null,
            renderSpan('diffUpdateFrom', stringify(diff[0])),
            renderSpan('diffUpdateArrow', ' => '),
            renderSpan('diffUpdateTo', stringify(diff[1]))
          );
        case 3:
          return renderSpan('diffRemove', stringify(diff[0]));
      }
    }
  }

  return raw;
}

var JSONDiff = function JSONDiff(_ref) {
  var delta = _ref.delta;
  var theme = _ref.theme;
  var defaultTheme = _ref.defaultTheme;
  var props = (0, _objectWithoutProperties3.default)(_ref, ['delta', 'theme', 'defaultTheme']);

  var _prepareDelta = prepareDelta(delta);

  var data = _prepareDelta.data;
  var diffs = _prepareDelta.diffs;

  var createTheme = (0, _themeable2.default)((0, _extends6.default)({}, theme, defaultTheme));

  return _react2.default.createElement(_leonavesReactJsonTree2.default, (0, _extends6.default)({}, props, {
    data: data,
    getItemString: function getItemString() {
      return '';
    },
    valueRenderer: function valueRenderer(raw) {
      return _valueRenderer(raw, diffs, createTheme);
    },
    expandAll: true,
    hideRoot: true }));
};

exports.default = JSONDiff;