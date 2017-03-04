// @flow
import React, { PureComponent } from 'react';
import dateformat from 'dateformat';
import debounce from 'lodash.debounce';
import RightSlider from './RightSlider';

import type { StylingFunction } from 'react-base16-styling';
import type { Action } from './types';

type Button = 'Skip' | 'Jump';

const BUTTON_SKIP = 'Skip';
const BUTTON_JUMP = 'Jump';

type Props = {
  styling: StylingFunction,
  isSelected: boolean,
  action: Action,
  isInFuture: boolean,
  isInitAction: boolean,
  onSelect: (e: SyntheticMouseEvent) => void,
  timestamps: {
    current: number,
    previous: number
  },
  isSkipped: boolean,
  onToggleClick: () => void,
  onJumpClick: () => void
};

type State = {
  hover: boolean
};

export default class ActionListRow extends PureComponent<void, Props, State> {
  state: State = { hover: false };

  render() {
    const { styling, isSelected, action, isInitAction, onSelect,
            timestamps, isSkipped, isInFuture } = this.props;
    const { hover } = this.state;
    const timeDelta = timestamps.current - timestamps.previous;
    const showButtons = hover && !isInitAction || isSkipped;

    const isButtonSelected = btn =>
      btn === BUTTON_SKIP && isSkipped;

    let actionType = action.type;
    if (typeof actionType === 'undefined') actionType = '<UNDEFINED>';
    else if (actionType === null) actionType = '<NULL>';
    else actionType = actionType.toString() || '<EMPTY>';

    return (
      <div
        onClick={onSelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        {...styling([
          'actionListItem',
          isSelected ? 'actionListItemSelected' : null,
          isSkipped ? 'actionListItemSkipped' : null,
          isInFuture ? 'actionListFromFuture' : null
        ], isSelected, action)}>
        <div
          {...styling([
            'actionListItemName',
            isSkipped ? 'actionListItemNameSkipped' : null
          ])}
        >
          {actionType}
        </div>
        <div {...styling('actionListItemButtons')}>
          <RightSlider styling={styling} shown={!showButtons} rotate>
            <div {...styling('actionListItemTime')}>
              {timeDelta === 0 ? '+00:00:00' :
                dateformat(timeDelta, timestamps.previous ? '+MM:ss.L' : 'h:MM:ss.L')}
            </div>
          </RightSlider>
          <RightSlider styling={styling} shown={showButtons} rotate>
            <div {...styling('actionListItemSelector')}>
              {[BUTTON_JUMP, BUTTON_SKIP].map(btn => (!isInitAction || btn !== BUTTON_SKIP) &&
                <div
                  key={btn}
                  onClick={this.handleButtonClick.bind(this, btn)}
                  {...styling([
                    'selectorButton',
                    isButtonSelected(btn) ? 'selectorButtonSelected' : null,
                    'selectorButtonSmall'
                  ], isButtonSelected(btn), true)}
                >
                  {btn}
                </div>
              )}
            </div>
          </RightSlider>
        </div>
      </div>
    );
  }

  handleButtonClick(btn: Button, e: SyntheticMouseEvent) {
    e.stopPropagation();

    switch(btn) {
    case BUTTON_SKIP:
      this.props.onToggleClick();
      break;
    case BUTTON_JUMP:
      this.props.onJumpClick();
      break;
    }
  }

  handleMouseEnter = (e: SyntheticMouseEvent) => {
    if (this.hover) return;
    this.handleMouseEnterDebounced(e.buttons);
  }

  handleMouseEnterDebounced = debounce((buttons) => {
    if (buttons) return;
    this.setState({ hover: true });
  }, 300)

  handleMouseLeave = () => {
    this.handleMouseEnterDebounced.cancel();
    if (this.state.hover) this.setState({ hover: false });
  }

  handleMouseDown = (e: SyntheticMouseEvent) => {
    if (e.target instanceof Element && e.target.className.indexOf('selectorButton') === 0) return;
    if (this.handleMouseEnterDebounced) this.handleMouseEnterDebounced.cancel();
    if (this.state.hover) this.setState({ hover: false });
  }
}
