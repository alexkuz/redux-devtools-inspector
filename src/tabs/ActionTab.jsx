import React from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

const ActionTab = ({ action, styling, base16Theme, invertTheme, labelRenderer, isWideLayout }) =>
  <JSONTree
    labelRenderer={labelRenderer}
    theme={getJsonTreeTheme(base16Theme)}
    data={action}
    getItemString={(type, data) => getItemString(styling, type, data, isWideLayout)}
    invertTheme={invertTheme}
    hideRoot
  />;

export default ActionTab;
