import React from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';

const ActionTab = ({ action, styling, base16Theme, isLightTheme, labelRenderer }) =>
  <JSONTree
    labelRenderer={labelRenderer}
    theme={{
      extend: base16Theme,
      nestedNodeItemString: ({ style }, expanded) => ({
        style: {
          ...style,
          display: expanded ? 'none' : 'inline'
        }
      })
    }}
    data={action}
    getItemString={(type, data) => getItemString(styling, type, data)}
    isLightTheme={isLightTheme}
    hideRoot
  />;

export default ActionTab;
