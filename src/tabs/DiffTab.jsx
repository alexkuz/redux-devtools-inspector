// @flow
import React from 'react';
import JSONDiff from './JSONDiff';

import type { LabelRenderer } from 'react-json-tree';
import type { Delta } from 'jsondiffpatch';
import type { StylingFunction, Base16Theme } from 'react-base16-styling';
import type { FormatItemFunction } from '../types';

type Props = {
  delta: Delta,
  styling: StylingFunction,
  base16Theme: Base16Theme,
  invertTheme: boolean,
  labelRenderer: LabelRenderer,
  isWideLayout: boolean,
  formatItem: FormatItemFunction
};

const DiffTab = (
  { delta, styling, base16Theme, invertTheme, labelRenderer, isWideLayout, formatItem }: Props
): React$Element<*> =>
  <JSONDiff
    {...{ delta, styling, base16Theme, invertTheme, labelRenderer, isWideLayout, formatItem }}
  />;

export default DiffTab;
