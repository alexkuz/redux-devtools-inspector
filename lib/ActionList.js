'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTime(actions, actionIds, actionId) {
  var idx = actionIds.indexOf(actionId);
  var prevActionId = actionIds[idx - 1];

  return idx ? (0, _dateformat2.default)(actions[actionId].timestamp - actions[prevActionId].timestamp, '+MM:ss.L') : (0, _dateformat2.default)(actions[actionId].timestamp, 'h:MM:ss.L');
}

var ActionList = function ActionList(_ref) {
  var theme = _ref.theme;
  var defaultTheme = _ref.defaultTheme;
  var actions = _ref.actions;
  var actionIds = _ref.actionIds;
  var isWideLayout = _ref.isWideLayout;
  var selectedActionId = _ref.selectedActionId;
  var onSelect = _ref.onSelect;
  var onSearch = _ref.onSearch;
  var searchValue = _ref.searchValue;

  var createTheme = (0, _themeable2.default)((0, _extends3.default)({}, theme, defaultTheme));
  var lowerSearchValue = searchValue && searchValue.toLowerCase();
  var filteredActionIds = searchValue ? actionIds.filter(function (id) {
    return actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1;
  }) : actionIds;

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ key: 'actionList'
    }, createTheme('actionList', isWideLayout && 'actionListWide')),
    _react2.default.createElement('input', (0, _extends3.default)({}, createTheme('actionListSearch'), {
      onChange: function onChange(e) {
        return onSearch(e.target.value);
      },
      placeholder: 'filter...' })),
    filteredActionIds.map(function (actionId) {
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ key: actionId
        }, createTheme('actionListItem', actionId === selectedActionId && 'actionListItemSelected'), {
          onClick: function onClick() {
            return onSelect(actionId);
          } }),
        actions[actionId].action.type,
        _react2.default.createElement(
          'div',
          createTheme('actionListItemTime'),
          getTime(actions, actionIds, actionId)
        )
      );
    })
  );
};

exports.default = ActionList;