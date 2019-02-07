// @flow
import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

import type { LabelRenderer } from 'react-json-tree';
import type { StylingFunction, Base16Theme, StylingConfig } from 'react-base16-styling';
import type { FormatItemFunction } from '../types';

type Props = {
  styling: StylingFunction,
  base16Theme: Base16Theme,
  invertTheme: boolean,
  labelRenderer: LabelRenderer,
  isWideLayout: boolean,
  formatItem: FormatItemFunction,
  nextState: Object
};

type State = {
  theme: StylingConfig
};

const getStateFromProps = props => ({
  theme: getJsonTreeTheme(props.base16Theme)
});

export default class StateTab extends PureComponent<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.base16Theme !== this.props.base16Theme) {
      this.setState(getStateFromProps(nextProps));
    }
  }

  render() {
    const { labelRenderer, nextState, invertTheme } = this.props;
    return (
      <JSONTree
        labelRenderer={labelRenderer}
        theme={this.state.theme}
        data={nextState}
        getItemString={this.getItemString}
        invertTheme={invertTheme}
        hideRoot
      />
    );
  }

  getItemString = (type: string, data: any) => {
    const { styling, isWideLayout, formatItem } = this.props;
    return getItemString(styling, type, data, isWideLayout, false, formatItem);
  };
}
