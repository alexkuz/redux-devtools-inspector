import React from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

const StateTab = ({ nextState, styling, base16Theme, invertTheme, labelRenderer }) =>
  <JSONTree
    labelRenderer={labelRenderer}
    theme={getJsonTreeTheme(base16Theme)}
    data={nextState}
    getItemString={(type, data) => getItemString(styling, type, data)}
    invertTheme={invertTheme}
    hideRoot
  />;

export default StateTab;
