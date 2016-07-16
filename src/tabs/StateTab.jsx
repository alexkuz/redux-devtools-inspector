import React from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';

const StateTab = ({ nextState, styling, base16Theme, isLightTheme, labelRenderer }) =>
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
    data={nextState}
    getItemString={(type, data) => getItemString(styling, type, data)}
    isLightTheme={isLightTheme}
    hideRoot
  />;

export default StateTab;
