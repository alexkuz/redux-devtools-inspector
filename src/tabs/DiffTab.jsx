// @flow
import React from 'react';
import JSONDiff from './JSONDiff';

import type { LabelRenderer } from 'react-json-tree';
import type { Delta } from 'jsondiffpatch';
import type { StylingFunction, Base16Theme } from 'react-base16-styling';

type Props = {
  delta: Delta,
  styling: StylingFunction,
  base16Theme: Base16Theme,
  invertTheme: boolean,
  labelRenderer: LabelRenderer,
  isWideLayout: boolean
};

const DiffTab = (
  { delta, styling, base16Theme, invertTheme, labelRenderer, isWideLayout }: Props
): React$Element<*> =>
  <JSONDiff
    {...{ delta, styling, base16Theme, invertTheme, labelRenderer, isWideLayout }}
  />;

export default DiffTab;
