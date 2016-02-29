'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionPreviewHeader = function ActionPreviewHeader(_ref) {
  var theme = _ref.theme;
  var defaultTheme = _ref.defaultTheme;
  var inspectedPath = _ref.inspectedPath;
  var onInspectPath = _ref.onInspectPath;
  var tab = _ref.tab;
  var onSelectTab = _ref.onSelectTab;

  var createTheme = (0, _themeable2.default)((0, _extends3.default)({}, theme, defaultTheme));

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ key: 'previewHeader' }, createTheme('previewHeader')),
    _react2.default.createElement(
      'div',
      null,
      inspectedPath.length ? _react2.default.createElement(
        'span',
        createTheme('inspectedPathKey'),
        _react2.default.createElement(
          'a',
          (0, _extends3.default)({ onClick: function onClick() {
              return onInspectPath([]);
            }
          }, createTheme('inspectedPathKeyLink')),
          tab
        )
      ) : tab,
      inspectedPath.map(function (key, idx) {
        return idx === inspectedPath.length - 1 ? key : _react2.default.createElement(
          'span',
          (0, _extends3.default)({ key: key
          }, createTheme('inspectedPathKey')),
          _react2.default.createElement(
            'a',
            (0, _extends3.default)({ onClick: function onClick() {
                return onInspectPath(inspectedPath.slice(0, idx + 1));
              }
            }, createTheme('inspectedPathKeyLink')),
            key
          )
        );
      })
    ),
    _react2.default.createElement(
      'div',
      createTheme('tabSelector'),
      ['Diff', 'State'].map(function (t) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ onClick: function onClick() {
              return onSelectTab(t);
            },
            key: t
          }, createTheme('tabSelectorButton', t === tab && 'tabSelectorButtonSelected')),
          t
        );
      })
    )
  );
};

exports.default = ActionPreviewHeader;