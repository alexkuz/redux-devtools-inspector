import React from 'react';
import JSONDiff from './JSONDiff';

const DiffTab = ({ delta, styling, base16Theme, isLightTheme, labelRenderer }) =>
  <JSONDiff
    {...{ delta, styling, base16Theme, isLightTheme, labelRenderer }}
  />;

export default DiffTab;
