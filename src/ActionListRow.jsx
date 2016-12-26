import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import dateformat from 'dateformat';
import debounce from 'lodash.debounce';
import RightSlider from './RightSlider';

const BUTTON_SKIP = 'Skip';

export default class ActionListRow extends Component {
  state = { hover: false };

  static propTypes = {
    styling: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    action: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired,
    isInitAction: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    timestamps: PropTypes.shape({
      current: PropTypes.number.isRequired,
      previous: PropTypes.number.isRequired
    }).isRequired,
    isSkipped: PropTypes.bool.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    document.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  render() {
    const { styling, isSelected, action, isInitAction, onSelect,
            timestamps, isSkipped } = this.props;
    const { hover } = this.state;
    const timeDelta = timestamps.current - timestamps.previous;
    const showButtons = hover && !isInitAction || isSkipped;

    const isButtonSelected = btn =>
      btn === BUTTON_SKIP && isSkipped;

    return (
      <div onClick={onSelect}
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}
           {...styling([
             'actionListItem',
             isSelected && 'actionListItemSelected',
             isSkipped && 'actionListItemSkipped'
           ], isSelected, action)}>
        <div {...styling(['actionListItemName', isSkipped && 'actionListItemNameSkipped'])}>
          {action.type}
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
              {[BUTTON_SKIP].map(btn => (!isInitAction || btn !== BUTTON_SKIP) &&
                <div key={btn}
                     onClick={this.handleButtonClick.bind(this, btn)}
                     {...styling([
                       'selectorButton',
                       isButtonSelected(btn) && 'selectorButtonSelected',
                       'selectorButtonSmall'], isButtonSelected(btn), true)}>
                  {btn}
                </div>
              )}
            </div>
          </RightSlider>
        </div>
      </div>
    );
  }

  handleButtonClick(btn, e) {
    e.stopPropagation();

    switch(btn) {
    case BUTTON_SKIP:
      this.props.onViewClick();
      break;
    }
  }

  handleMouseEnter = debounce(() => {
    this.setState({ hover: true });
  }, 150)

  handleMouseLeave = () => {
    this.handleMouseEnter.cancel();
    if (this.state.hover) this.setState({ hover: false });
  }
}
