import React from 'react';
import JSONDiff from './JSONDiff';

const DiffTab = ({ delta, styling, base16Theme, invertTheme, labelRenderer }) =>
  <JSONDiff
    {...{ delta, styling, base16Theme, invertTheme, labelRenderer }}
  />;

export default DiffTab;
