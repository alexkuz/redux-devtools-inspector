// @flow
import React from 'react';

import type { StylingFunction } from 'react-base16-styling';

type Props = {
  styling: StylingFunction,
  shown: boolean,
  children?: any,
  rotate?: boolean
};

const RightSlider = ({ styling, shown, children, rotate }: Props) =>
  <div {...styling([
    'rightSlider',
    shown ? 'rightSliderShown' : null,
    rotate ? 'rightSliderRotate' : null,
    rotate && shown ? 'rightSliderRotateShown' : null
  ])}>
    {children}
  </div>;

export default RightSlider;
