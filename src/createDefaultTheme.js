import jss from 'jss';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssNested from 'jss-nested';

jss.use(jssVendorPrefixer());
jss.use(jssNested());

const defaultBase16Theme = {
  base00: '#FFF',
  base01: '#FAFAFA',
  base02: '#DDD',
  base03: '#777',
  base04: '#999',
  base05: '#EEE',
  base06: '#666',
  base07: '#AAE',
  base08: '#F99',
  base09: '#933',
  base0A: '#FFA',
  base0B: '#9F9',
  base0C: '#0a6ebd',
  base0D: '#933',
  base0E: '#939',
  base0F: '#993'
};

const colorMap = theme => ({
  TEXT_COLOR: theme.base06,
  BACKGROUND_COLOR: theme.base00,
  SELECTED_BACKGROUND_COLOR: theme.base01,
  HEADER_BACKGROUND_COLOR: theme.base01,
  HEADER_BORDER_COLOR: theme.base02,
  BORDER_COLOR: theme.base02,
  LIST_BORDER_COLOR: theme.base02,
  ACTION_TIME_BACK_COLOR: theme.base02,
  ACTION_TIME_COLOR: theme.base03,
  PIN_COLOR: theme.base04,
  ITEM_HINT_COLOR: theme.base0F,
  TAB_BACK_COLOR: theme.base02,
  TAB_BORDER_COLOR: theme.base02,
  DIFF_ADD_COLOR: theme.base0B,
  DIFF_REMOVE_COLOR: theme.base08,
  DIFF_ARROW_COLOR: theme.base0E,
  LINK_COLOR: theme.base0C
});

const colors = map => ({
  inspectorColor: {
    'background-color': map.BACKGROUND_COLOR,
    color: map.TEXT_COLOR
  },

  actionListColor: {
    'background-color': map.BACKGROUND_COLOR,
    'border-color': map.LIST_BORDER_COLOR
  },

  actionListItemColor: {
    'border-bottom-color': map.BORDER_COLOR
  },

  actionListItemSelectedColor: {
    'background-color': map.SELECTED_BACKGROUND_COLOR
  },

  actionListItemTimeColor: {
    'background-color': map.ACTION_TIME_BACK_COLOR,
    color: map.ACTION_TIME_COLOR
  },

  actionPreviewColor: {
    'background-color': map.BACKGROUND_COLOR,
  },

  stateDiffEmptyColor: {
    color: '#AAA'
  },

  inspectedPathColor: {
    'background-color': map.HEADER_BACKGROUND_COLOR,
    'border-color': map.BORDER_COLOR
  },

  treeItemPinColor: {
    color: map.PIN_COLOR
  },

  previewHeaderColor: {
    'background-color': map.HEADER_BACKGROUND_COLOR,
    'border-bottom': map.HEADER_BORDER_COLOR
  },

  treeItemHintColor: {
    color: map.ITEM_HINT_COLOR
  },

  tabSelectorButtonColor: {
    'border-color': map.TAB_BORDER_COLOR,
    '&:before': {
      opacity: 0.5,
      'background-color': map.TAB_BACK_COLOR
    },
    '&:hover:before': {
      opacity: 0
    }
  },

  tabSelectorButtonSelectedColor: {
    '&:before': {
      opacity: 0
    }
  },

  diffColor: {
    color: map.TEXT_COLOR
  },

  diffAddColor: {
    '&:before': {
      'background-color': map.DIFF_ADD_COLOR
    }
  },

  diffRemoveColor: {
    '&:before': {
      'background-color': map.DIFF_REMOVE_COLOR
    }
  },

  diffUpdateFromColor: {
    '&:before': {
      'background-color': map.DIFF_REMOVE_COLOR
    }
  },

  diffUpdateToColor: {
    '&:before': {
      'background-color': map.DIFF_ADD_COLOR
    }
  },

  diffUpdateArrowColor: {
    color: map.DIFF_ARROW_COLOR
  },

  inspectedPathKeyLinkColor: {
    color: map.LINK_COLOR,
    opacity: 0.8,
    '&:hover': {
      color: map.LINK_COLOR,
      opacity: 1
    }
  },

  actionListSearchColor: {
    'border-color': map.BORDER_COLOR,
    'background-color': map.BACKGROUND_COLOR,
    color: map.TEXT_COLOR
  }
});

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
    'line-height': '1em',
    'flex-shrink': 0
  },

  actionListItemName: {
    overflow: 'auto',
    'text-overflow': 'ellipsis'
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
    padding: '0.6rem 0rem'
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

  treeItemHint: {
    opacity: 0.9
  },

  previewHeader: {
    padding: '0.5rem 1rem',
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
    position: 'relative',
    'z-index': 1,
    display: 'inline-flex',
    float: 'right',
    'margin-bottom': '0.5rem'
  },

  tabSelectorButton: {
    cursor: 'pointer',
    position: 'relative',
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
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }
  },

  diffWrap: {
    position: 'relative',
    'z-index': 1
  },

  diff: {
    padding: '0.2rem 0.3rem',
    'border-radius': '3px',
    position: 'relative',
    '&:before': {
      'border-radius': '3px',
      content: '""',
      position: 'absolute',
      'z-index': -1,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.5
    }
  },

  diffRemove: {
    'text-decoration': 'line-through'
  },

  diffUpdateFrom: {
    'text-decoration': 'line-through'
  },
};

export default function createDefaultTheme(base16Theme) {
  const sheet = jss.createStyleSheet({
    ...colors(colorMap(base16Theme || defaultBase16Theme)),
    ...styles
  }).attach();

  return sheet.classes;
}
