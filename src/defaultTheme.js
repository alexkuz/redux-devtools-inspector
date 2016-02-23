import jss from 'jss';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssNested from 'jss-nested';

jss.use(jssVendorPrefixer());
jss.use(jssNested());

const TEXT_COLOR = '#666';
const BACKGROUND_COLOR = '#FFF';
const SELECTED_BACKGROUND_COLOR = '#F0F0F0';
const HEADER_BACKGROUND_COLOR = '#FAFAFA';
const BORDER_COLOR = '#DDD';
const ACTION_TIME_BACK_COLOR = '#EEE';
const ACTION_TIME_COLOR = '#777';
const PIN_COLOR = '#AAA';
const ITEM_HINT_COLOR = '#AAE';
const TAB_BACK_COLOR = '#F6F6F6';
const TAB_HOVER_BACK_COLOR = '#FFF';
const DIFF_ADD_BACK_COLOR = '#AFA';
const DIFF_UPDATE_BACK_COLOR = '#FFA';
const DIFF_REMOVE_BACK_COLOR = '#FAA';
const DIFF_ADD_COLOR = '#393';
const DIFF_REMOVE_COLOR = '#933';
const DIFF_ARROW_COLOR = '#999';
const LINK_COLOR = '#0a6ebd';

const colors = {
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
    'background-color': BACKGROUND_COLOR,
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

const styles = {
  inspector: {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    height: '100%',
    'font-family': 'monaco, Consolas, "Lucida Console", monospace',
    'font-size': '12px',
    'font-smoothing': 'antialiased',
    'line-height': '1.5em',
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

  diffUpdateFrom: {
    'text-decoration': 'line-through'
  },
};

const sheet = jss.createStyleSheet({
  ...colors,
  ...styles
}).attach();

export default sheet.classes;
