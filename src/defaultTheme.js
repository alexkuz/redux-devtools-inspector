import jss from 'jss';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssNested from 'jss-nested';

jss.use(jssVendorPrefixer());
jss.use(jssNested());

const BACKGROUND_COLOR = '#FFF';
const SELECTED_BACKGROUND_COLOR = '#F0F0F0';
const HEADER_BACKGROUND_COLOR = '#FAFAFA';

const sheet = jss.createStyleSheet({
  diffMonitor: {
    'background-color': BACKGROUND_COLOR,
    'font-family': 'monaco, Consolas, "Lucida Console", monospace'
  },

  actionList: {
    'background-color': BACKGROUND_COLOR
  },

  actionListItem: {
    'border-bottom': '1px solid #DDD',
    display: 'flex',
    'align-items': 'flex-start',
    'justify-content': 'space-between',
    padding: '1rem',
    cursor: 'pointer'
  },

  actionListItemSelected: {
    'background-color': SELECTED_BACKGROUND_COLOR
  },

  actionListItemTime: {
    'background-color': '#EEE',
    padding: '0.2rem 0.5rem',
    'border-radius': '3px',
    color: '#777',
    'font-size': '0.7em',
    'line-height': '1em'
  },

  actionPreview: {
    'background-color': BACKGROUND_COLOR,

    '& pre': {
      border: 'inherit',
      'border-radius': '3px',
      'line-height': 'inherit',
      color: 'inherit'
    }
  },

  diffMonitorLayout: {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    height: '100%'
  },

  actionListLayout: {
    'flex-basis': '40%',
    'overflow-y': 'auto',
    'border-bottom': '3px double #DDD'
  },

  actionPreviewLayout: {
    'flex-grow': 1,
    'overflow-y': 'auto'
  },

  diffMonitorWideLayout: {
    'flex-direction': 'row'
  },

  actionListWideLayout: {
    'flex-basis': '40%',
    'border-bottom': 'none',
    'border-right': '3px double #DDD'
  },

  stateDiff: {

  },

  stateDiffLayout: {
    padding: '0.5rem 0'
  },

  inspectedPath: {
    'background-color': HEADER_BACKGROUND_COLOR,
    'border-bottom': '1px solid #DDD'
  },

  inspectedPathLayout: {
    padding: '0.5rem 1rem'
  },

  inspectedPathKey: {

  },

  inspectedPathKeyLayout: {
    '& > a': {
      cursor: 'pointer'
    },

    '&:not(:last-child):after': {
      content: '" > "'
    }
  },

  treeItemPin: {
    color: '#AAA',
    'font-size': '0.7em',
    'padding-left': '0.5rem',
    cursor: 'pointer'
  },

  treeItemKey: {
    cursor: 'pointer'
  },

  diffHeader: {
    'background-color': HEADER_BACKGROUND_COLOR,
    'border-top': '1px solid #DDD',
    'border-bottom': '1px solid #DDD'
  },

  diffHeaderLayout: {
    padding: '0.5rem 1rem'
  },

  actionListSearch: {
    outline: 'none',
    border: 'none',
    'border-bottom': '1px solid #DDD'
  },

  actionListSearchLayout: {
    width: '100%',
    padding: '0.5rem 1rem'
  },

  treeItemHint: {
    color: '#AAE'
  }
}).attach();

export default sheet.classes;
