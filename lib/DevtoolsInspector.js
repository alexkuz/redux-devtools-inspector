'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _defaultTheme = require('./defaultTheme');

var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _ActionList = require('./ActionList');

var _ActionList2 = _interopRequireDefault(_ActionList);

var _ActionPreview = require('./ActionPreview');

var _ActionPreview2 = _interopRequireDefault(_ActionPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevtoolsInspector = function (_Component) {
  (0, _inherits3.default)(DevtoolsInspector, _Component);

  function DevtoolsInspector(props) {
    (0, _classCallCheck3.default)(this, DevtoolsInspector);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DevtoolsInspector).call(this, props));

    _this.shouldComponentUpdate = _function2.default;

    _this.state = {
      isWideLayout: false,
      selectedActionId: null,
      inspectedPath: [],
      tab: 'State'
    };
    return _this;
  }

  (0, _createClass3.default)(DevtoolsInspector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.updateSizeTimeout = window.setInterval(function () {
        return _this2.updateSizeMode();
      }, 150);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearTimeout(this.updateSizeTimeout);
    }
  }, {
    key: 'updateSizeMode',
    value: function updateSizeMode() {
      this.setState({
        isWideLayout: this.refs.inspector.offsetWidth > 500
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var theme = _props.theme;
      var actionIds = _props.stagedActionIds;
      var actions = _props.actionsById;
      var computedStates = _props.computedStates;
      var _state = this.state;
      var isWideLayout = _state.isWideLayout;
      var selectedActionId = _state.selectedActionId;
      var inspectedPath = _state.inspectedPath;
      var searchValue = _state.searchValue;
      var tab = _state.tab;

      var createTheme = (0, _themeable2.default)((0, _extends3.default)({}, theme, _defaultTheme2.default));
      var lastActionId = actionIds[actionIds.length - 1];
      var currentActionId = selectedActionId === null ? lastActionId : selectedActionId;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ key: 'inspector'
        }, createTheme('inspector', isWideLayout && 'inspectorWide'), {
          ref: 'inspector' }),
        _react2.default.createElement(_ActionList2.default, (0, _extends3.default)({ theme: theme, defaultTheme: _defaultTheme2.default, actions: actions, actionIds: actionIds, isWideLayout: isWideLayout, searchValue: searchValue }, {
          selectedActionId: selectedActionId,
          onSearch: function onSearch(val) {
            return _this3.setState({ searchValue: val });
          },
          onSelect: function onSelect(actionId) {
            return _this3.setState({
              selectedActionId: actionId === selectedActionId ? null : actionId
            });
          } })),
        _react2.default.createElement(_ActionPreview2.default, (0, _extends3.default)({ theme: theme, defaultTheme: _defaultTheme2.default, tab: tab }, {
          fromState: currentActionId > 0 ? computedStates[currentActionId - 1] : null,
          toState: computedStates[currentActionId],
          onInspectPath: function onInspectPath(path) {
            return _this3.setState({ inspectedPath: path });
          },
          inspectedPath: inspectedPath,
          onSelectTab: function onSelectTab(tab) {
            return _this3.setState({ tab: tab });
          } }))
      );
    }
  }]);
  return DevtoolsInspector;
}(_react.Component);

DevtoolsInspector.propTypes = {
  dispatch: _react.PropTypes.func,
  computedStates: _react.PropTypes.array,
  stagedActionIds: _react.PropTypes.array,
  actionsById: _react.PropTypes.object,
  currentStateIndex: _react.PropTypes.number,
  monitorState: _react.PropTypes.shape({
    initialScrollTop: _react.PropTypes.number
  }),
  preserveScrollTop: _react.PropTypes.bool,
  stagedActions: _react.PropTypes.array,
  select: _react.PropTypes.func.isRequired,
  theme: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
};

DevtoolsInspector.update = function (s) {
  return s;
};

DevtoolsInspector.defaultProps = {
  theme: {},
  select: function select(state) {
    return state;
  }
};
exports.default = DevtoolsInspector;