import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dragula from 'react-dragula';
import ActionListRow from './ActionListRow';
import ActionListHeader from './ActionListHeader';
import shouldPureComponentUpdate from 'react-pure-render/function';

function getTimestamps(actions, actionIds, actionId) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return {
    current: actions[actionId].timestamp,
    previous: idx ? actions[prevActionId].timestamp : 0
  };
}

export default class ActionList extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    this.scrollToBottom(true);
    if (!this.props.draggableActions) return;
    const container = ReactDOM.findDOMNode(this.refs.rows);
    this.drake = dragula([container], {
      copy: false,
      copySortSource: false,
      mirrorContainer: container,
      accepts: (el, target, source, sibling) => (
        !sibling || parseInt(sibling.getAttribute('data-id'))
      ),
      moves: (el, source, handle) => (
        parseInt(el.getAttribute('data-id')) &&
        !/\bselectorButton\b/.test(handle.className)
      ),
    }).on('drop', (el, target, source, sibling) => {
      let beforeActionId = Infinity;
      if (sibling && sibling.className.indexOf('gu-mirror') === -1) {
        beforeActionId = parseInt(sibling.getAttribute('data-id'));
      }
      const actionId = parseInt(el.getAttribute('data-id'));
      this.props.onReorderAction(actionId, beforeActionId)
    });
  }

  componentWillUnmount() {
    if (this.drake) this.drake.destroy();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastActionId !== prevProps.lastActionId) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(force) {
    const el = ReactDOM.findDOMNode(this.refs.rows);
    const scrollHeight = el.scrollHeight;
    if (force || Math.abs(scrollHeight - (el.scrollTop + el.offsetHeight)) < 50) {
      el.scrollTop = scrollHeight;
    }
  }

  render() {
    const { styling, actions, actionIds, isWideLayout, onToggleAction, skippedActionIds,
            selectedActionId, startActionId, onSelect, onSearch, searchValue, currentActionId,
            onCommit, onSweep, onJumpToState } = this.props;
    const lowerSearchValue = searchValue && searchValue.toLowerCase();
    const filteredActionIds = searchValue ? actionIds.filter(
      id => actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1
    ) : actionIds;

    return (
      <div key='actionList'
           {...styling(['actionList', isWideLayout && 'actionListWide'], isWideLayout)}>
        <ActionListHeader styling={styling}
                          onSearch={onSearch}
                          onCommit={onCommit}
                          onSweep={onSweep}
                          hasSkippedActions={skippedActionIds.length > 0}
                          hasStagedActions={actionIds.length > 1} />
        <div {...styling('actionListRows')} ref='rows'>
          {filteredActionIds.map(actionId =>
            <ActionListRow key={actionId}
                           styling={styling}
                           actionId={actionId}
                           isInitAction={!actionId}
                           isSelected={
                            startActionId !== null &&
                            actionId >= startActionId && actionId <= selectedActionId ||
                            actionId === selectedActionId
                           }
                           isInFuture={
                             actionIds.indexOf(actionId) > actionIds.indexOf(currentActionId)
                           }
                           onSelect={(e) => onSelect(e, actionId)}
                           timestamps={getTimestamps(actions, actionIds, actionId)}
                           action={actions[actionId].action}
                           onToggleClick={() => onToggleAction(actionId)}
                           onJumpClick={() => onJumpToState(actionId)}
                           onCommitClick={() => onCommit(actionId)}
                           isSkipped={skippedActionIds.indexOf(actionId) !== -1} />
          )}
        </div>
      </div>
    );
  }
}
