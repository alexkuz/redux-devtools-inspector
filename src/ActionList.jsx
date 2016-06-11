import React, { Component } from 'react';
import ReactDOM from 'react/lib/ReactDOM';
import ActionListRow from './ActionListRow';
import ActionListHeader from './ActionListHeader';

function getTimestamps(actions, actionIds, actionId) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return {
    current: actions[actionId].timestamp,
    previous: idx ? actions[prevActionId].timestamp : 0
  };
}

export default class ActionList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.lastActionId !== prevProps.lastActionId) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const el = ReactDOM.findDOMNode(this.refs.rows);

    el.scrollTop = el.scrollHeight;
  }

  render() {
    const { styling, actions, actionIds, isWideLayout, onToggleAction, skippedActionIds,
            selectedActionId, startActionId, onSelect, onSearch, searchValue, onCommit, onSweep } = this.props;
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
                           isInitAction={!actionId}
                           isSelected={
                            startActionId !== null &&
                            actionId >= startActionId && actionId <= selectedActionId ||
                            actionId === selectedActionId
                           }
                           onSelect={(e) => onSelect(e, actionId)}
                           timestamps={getTimestamps(actions, actionIds, actionId)}
                           action={actions[actionId].action}
                           onViewClick={() => onToggleAction(actionId)}
                           onCommitClick={() => onCommit(actionId)}
                           isSkipped={skippedActionIds.indexOf(actionId) !== -1} />
          )}
        </div>
      </div>
    );
  }
}
