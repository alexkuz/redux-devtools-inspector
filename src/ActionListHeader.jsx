import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import RightSlider from './RightSlider';

export default class ActionListHeader extends Component {
  static propTypes = {
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    const { styling, onSearch, hasSkippedActions, hasStagedActions } = this.props;
    const activeButtons = [
      hasSkippedActions && 'Sweep',
      'Commit'
    ].filter(a => a);

    return (
      <div {...styling('actionListHeader')}>
        <input {...styling('actionListHeaderSearch')}
               onChange={e => onSearch(e.target.value)}
               placeholder='filter...' />
        <div {...styling('actionListHeaderWrapper')}>
          <RightSlider shown={hasStagedActions} styling={styling}>
            <div {...styling('actionListHeaderSelector')}>
              {activeButtons.map(btn =>
                <div key={btn}
                     onClick={this.handleButtonClick.bind(this, btn)}
                     {...styling([
                       'selectorButton',
                       'selectorButtonSmall'], false, true)}>
                  {btn}
                </div>
              )}
            </div>
          </RightSlider>
        </div>
      </div>
    );
  }

  handleButtonClick(btn) {
    switch(btn) {
    case 'Commit':
      this.props.onCommit();
      break;

    case 'Sweep':
      this.props.onSweep();
      break;
    }
  }
}
