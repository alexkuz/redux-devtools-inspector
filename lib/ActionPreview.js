'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _diffpatcher = require('jsondiffpatch/src/diffpatcher');

var _leonavesReactJsonTree = require('leonaves-react-json-tree');

var _leonavesReactJsonTree2 = _interopRequireDefault(_leonavesReactJsonTree);

var _ActionPreviewHeader = require('./ActionPreviewHeader');

var _ActionPreviewHeader2 = _interopRequireDefault(_ActionPreviewHeader);

var _JSONDiff = require('./JSONDiff');

var _JSONDiff2 = _interopRequireDefault(_JSONDiff);

var _deepMap = require('./deepMap');

var _deepMap2 = _interopRequireDefault(_deepMap);

var _objType = require('./obj-type');

var _objType2 = _interopRequireDefault(_objType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonDiff = new _diffpatcher.DiffPatcher({});

function getInspectedState(state, path, purgeFunctions) {
  state = path.length ? (0, _defineProperty3.default)({}, path[path.length - 1], path.reduce(function (s, key) {
    if ((0, _objType2.default)(s) === 'Iterable') {
      var i = 0;var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(s), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          if (Array.isArray(entry)) {
            if (entry[0] === key) return entry[1];
          } else {
            if (i > key) return;if (i === key) return entry;
          }i++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else if ((0, _objType2.default)(s) === 'Immutable_Iterable') {
      return s && s.get(key);
    } else {
      return s && s[key];
    }
  }, state)) : state;

  return purgeFunctions ? (0, _deepMap2.default)(state, function (val) {
    return typeof val === 'function' ? 'fn()' : val;
  }) : state;
}

function _getItemString(createTheme, type, data) {
  var text = undefined;

  function getShortTypeString(val) {
    if (Array.isArray(val)) {
      return val.length > 0 ? '[…]' : '[]';
    } else if (val === null) {
      return 'null';
    } else if (val === undefined) {
      return 'undef';
    } else if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
      return (0, _keys2.default)(val).length > 0 ? '{…}' : '{}';
    } else if (typeof val === 'function') {
      return 'fn';
    } else if (typeof val === 'string') {
      return '"' + (val.substr(0, 10) + (val.length > 10 ? '…' : '')) + '"';
    } else {
      return val;
    }
  }

  if (type === 'Object') {
    var keys = (0, _keys2.default)(data);
    var str = keys.slice(0, 2).map(function (key) {
      return key + ': ' + getShortTypeString(data[key]);
    }).concat(keys.length > 2 ? ['…'] : []).join(', ');

    text = '{ ' + str + ' }';
  } else if (type === 'Array') {
    var str = data.slice(0, 2).map(getShortTypeString).concat(data.length > 2 ? ['…'] : []).join(', ');

    text = '[' + str + ']';
  } else {
    text = type;
  }

  return _react2.default.createElement(
    'span',
    createTheme('treeItemHint'),
    ' ',
    text
  );
}

var ActionPreview = function ActionPreview(_ref2) {
  var theme = _ref2.theme;
  var defaultTheme = _ref2.defaultTheme;
  var fromState = _ref2.fromState;
  var toState = _ref2.toState;
  var onInspectPath = _ref2.onInspectPath;
  var inspectedPath = _ref2.inspectedPath;
  var tab = _ref2.tab;
  var onSelectTab = _ref2.onSelectTab;


  var createTheme = (0, _themeable2.default)((0, _extends3.default)({}, theme, defaultTheme));
  var delta = fromState && toState && jsonDiff.diff(getInspectedState(fromState.state, inspectedPath, true), getInspectedState(toState.state, inspectedPath, true));

  var labelRenderer = function labelRenderer(key) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement(
        'span',
        createTheme('treeItemKey'),
        key
      ),
      _react2.default.createElement(
        'span',
        (0, _extends3.default)({}, createTheme('treeItemPin'), {
          onClick: function onClick() {
            return onInspectPath([].concat((0, _toConsumableArray3.default)(inspectedPath.slice(0, inspectedPath.length - 1)), (0, _toConsumableArray3.default)([key].concat(rest).reverse())));
          } }),
        '(pin)'
      )
    );
  };

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ key: 'actionPreview' }, createTheme('actionPreview')),
    _react2.default.createElement(_ActionPreviewHeader2.default, {
      theme: theme, defaultTheme: defaultTheme, inspectedPath: inspectedPath, onInspectPath: onInspectPath, tab: tab, onSelectTab: onSelectTab
    }),
    tab === 'Diff' && delta && _react2.default.createElement(_JSONDiff2.default, { delta: delta, labelRenderer: labelRenderer, theme: theme, defaultTheme: defaultTheme }),
    tab === 'Diff' && !delta && _react2.default.createElement(
      'div',
      createTheme('stateDiffEmpty'),
      '(states are equal)'
    ),
    tab === 'State' && toState && _react2.default.createElement(_leonavesReactJsonTree2.default, { labelRenderer: labelRenderer,
      data: getInspectedState(toState.state, inspectedPath),
      getItemString: function getItemString(type, data) {
        return _getItemString(createTheme, type, data);
      },
      getItemStringStyle: function getItemStringStyle(type, expanded) {
        return { display: expanded ? 'none' : 'inline' };
      },
      hideRoot: true })
  );
};

exports.default = ActionPreview;