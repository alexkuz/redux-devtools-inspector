'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jss2.default.use((0, _jssVendorPrefixer2.default)());
_jss2.default.use((0, _jssNested2.default)());

var TEXT_COLOR = '#666';
var BACKGROUND_COLOR = '#FFF';
var SELECTED_BACKGROUND_COLOR = '#F0F0F0';
var HEADER_BACKGROUND_COLOR = '#FAFAFA';
var BORDER_COLOR = '#DDD';
var ACTION_TIME_BACK_COLOR = '#EEE';
var ACTION_TIME_COLOR = '#777';
var PIN_COLOR = '#AAA';
var ITEM_HINT_COLOR = '#AAE';
var TAB_BACK_COLOR = '#F6F6F6';
var TAB_HOVER_BACK_COLOR = '#FFF';
var DIFF_ADD_BACK_COLOR = '#AFA';
var DIFF_UPDATE_BACK_COLOR = '#FFA';
var DIFF_REMOVE_BACK_COLOR = '#FAA';
var DIFF_ADD_COLOR = '#393';
var DIFF_REMOVE_COLOR = '#933';
var DIFF_ARROW_COLOR = '#999';
var LINK_COLOR = '#0a6ebd';

var colors = {
  inspectorColor: {
    'background-color': BACKGROUND_COLOR,
    color: TEXT_COLOR
  },

  actionListColor: {
    'background-color': BACKGROUND_COLOR,
    'border-color': BORDER_COLOR
  },

  actionListItemColor: {
    'border-bottom-color': BORDER_COLOR
  },

  actionListItemSelectedColor: {
    'background-color': SELECTED_BACKGROUND_COLOR
  },

  actionListItemTimeColor: {
    'background-color': ACTION_TIME_BACK_COLOR,
    color: ACTION_TIME_COLOR
  },

  actionPreviewColor: {
    'background-color': BACKGROUND_COLOR
  },

  stateDiffEmptyColor: {
    color: '#AAA'
  },

  inspectedPathColor: {
    'background-color': HEADER_BACKGROUND_COLOR,
    'border-color': BORDER_COLOR
  },

  treeItemPinColor: {
    color: PIN_COLOR
  },

  previewHeaderColor: {
    'background-color': HEADER_BACKGROUND_COLOR,
    'border-bottom': BORDER_COLOR
  },

  treeItemHintColor: {
    color: ITEM_HINT_COLOR
  },

  tabSelectorButtonColor: {
    'border-color': BORDER_COLOR,
    'background-color': TAB_BACK_COLOR,
    '&:hover': {
      'background-color': TAB_HOVER_BACK_COLOR
    }
  },

  tabSelectorButtonSelectedColor: {
    'background-color': TAB_HOVER_BACK_COLOR
  },

  diffColor: {
    color: TEXT_COLOR
  },

  diffAddColor: {
    'background-color': DIFF_ADD_BACK_COLOR
  },

  diffRemoveColor: {
    'background-color': DIFF_REMOVE_BACK_COLOR
  },

  diffUpdateFromColor: {
    color: DIFF_REMOVE_COLOR,
    'text-decoration': 'line-through',
    'background-color': DIFF_UPDATE_BACK_COLOR
  },

  diffUpdateToColor: {
    color: DIFF_ADD_COLOR,
    'background-color': DIFF_UPDATE_BACK_COLOR
  },

  diffUpdateArrowColor: {
    color: DIFF_ARROW_COLOR
  },

  inspectedPathKeyLinkColor: {
    color: LINK_COLOR
  },

  actionListSearchColor: {
    'border-color': BORDER_COLOR
  }
};

var styles = {
  inspector: {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    height: '100%',
    'font-family': 'monaco, Consolas, "Lucida Console", monospace',
    'font-size': '12px',
    'font-smoothing': 'antialiased',
    'line-height': '1.5em'
  },

  actionListItem: {
    'border-bottom-width': '1px',
    'border-bottom-style': 'solid',
    display: 'flex',
    'align-items': 'flex-start',
    'justify-content': 'space-between',
    padding: '0.5rem 1rem',
    cursor: 'pointer',

    '&:last-child': {
      'border-bottom-width': 0
    }
  },

  actionListItemTime: {
    padding: '0.4rem 0.6rem',
    'border-radius': '3px',
    'font-size': '0.8em',
    'line-height': '1em'
  },

  actionPreview: {
    '& pre': {
      border: 'inherit',
      'border-radius': '3px',
      'line-height': 'inherit',
      color: 'inherit'
    }
  },

  actionList: {
    'flex-basis': '40%',
    'flex-shrink': 0,
    'overflow-y': 'auto',
    'border-bottom-width': '3px',
    'border-bottom-style': 'double'
  },

  actionPreview: {
    'flex-grow': 1,
    'overflow-y': 'auto'
  },

  inspectorWide: {
    'flex-direction': 'row'
  },

  actionListWide: {
    'flex-basis': '40%',
    'border-bottom': 'none',
    'border-right-width': '3px',
    'border-right-style': 'double'
  },

  stateDiff: {
    padding: '0.5rem 0'
  },

  stateDiffEmpty: {
    padding: '0.5rem 1rem'
  },

  inspectedPath: {
    padding: '0.5rem 1rem',
    'border-bottom-width': '1px',
    'border-bottom-style': 'solid'
  },

  inspectedPathKey: {
    '&:not(:last-child):after': {
      content: '" > "'
    }
  },

  inspectedPathKeyLink: {
    cursor: 'pointer',
    '&:hover': {
      'text-decoration': 'underline'
    }
  },

  treeItemPin: {
    'font-size': '0.7em',
    'padding-left': '0.5rem',
    cursor: 'pointer',
    '&:hover': {
      'text-decoration': 'underline'
    }
  },

  treeItemKey: {
    cursor: 'pointer'
  },

  previewHeader: {
    padding: '0.5rem 1rem',
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'border-bottom-width': '1px',
    'border-bottom-style': 'solid'
  },

  actionListSearch: {
    outline: 'none',
    'border-top': 'none',
    'border-left': 'none',
    'border-right': 'none',
    'border-bottom-width': '1px',
    'border-bottom-style': 'solid',
    width: '100%',
    padding: '0.5rem 1rem'
  },

  tabSelector: {
    display: 'flex'
  },

  tabSelectorButton: {
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    'border-style': 'solid',
    'border-width': '1px',
    'border-left-width': 0,

    '&:first-child': {
      'border-left-width': '1px',
      'border-top-left-radius': '3px',
      'border-bottom-left-radius': '3px'
    },

    '&:last-child': {
      'border-top-right-radius': '3px',
      'border-bottom-right-radius': '3px'
    }
  },

  diff: {
    padding: '0.2rem 0.3rem',
    'border-radius': '3px'
  },

  diffRemove: {
    'text-decoration': 'line-through'
  },

  diffUpdateFrom: {
    'text-decoration': 'line-through'
  }
};

var sheet = _jss2.default.createStyleSheet((0, _extends3.default)({}, colors, styles)).attach();

exports.default = sheet.classes;