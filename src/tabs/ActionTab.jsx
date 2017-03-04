// @flow
import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

import type { LabelRenderer } from 'react-json-tree';
import type { Action } from '../types';
import type { StylingFunction, Base16Theme, StylingConfig } from 'react-base16-styling';

type Props = {
  action: Action,
  styling: StylingFunction,
  base16Theme: Base16Theme,
  invertTheme: boolean,
  labelRenderer: LabelRenderer,
  isWideLayout: boolean
};

type State = {
  theme: StylingConfig
};

const getStateFromProps = props => ({
  theme: getJsonTreeTheme(props.base16Theme)
});

export default class ActionTab extends PureComponent<void, Props, State> {
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
    const { labelRenderer, action, invertTheme } = this.props;
    return (
      <JSONTree
        labelRenderer={labelRenderer}
        theme={this.state.theme}
        data={action}
        getItemString={this.getItemString}
        invertTheme={invertTheme}
        hideRoot
      />
    );
  }

  getItemString = (type: string, data: any) => {
    return getItemString(this.props.styling, type, data, this.props.isWideLayout);
  };
}
