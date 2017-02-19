import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import getItemString from './getItemString';
import getJsonTreeTheme from './getJsonTreeTheme';

const getStateFromProps = props => ({
  theme: getJsonTreeTheme(props.base16Theme),
  getItemString: (type, data) => getItemString(props.styling, type, data, props.isWideLayout)
});

export default class StateTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (['base16Theme', 'styling', 'isWideLayout'].find(k => nextProps[k] !== this.props[k])) {
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
        getItemString={this.state.getItemString}
        invertTheme={invertTheme}
        hideRoot
      />
    );
  }
}
