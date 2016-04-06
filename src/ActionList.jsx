import React from 'react';
import dateformat from 'dateformat';

function getTime(actions, actionIds, actionId) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return idx ?
    dateformat(actions[actionId].timestamp - actions[prevActionId].timestamp, '+MM:ss.L') :
    dateformat(actions[actionId].timestamp, 'h:MM:ss.L');
}

const ActionList = ({
  styling, actions, actionIds, isWideLayout,
  selectedActionId, onSelect, onSearch, searchValue
}) => {
  const lowerSearchValue = searchValue && searchValue.toLowerCase();
  const filteredActionIds = searchValue ? actionIds.filter(
    id => actions[id].action.type.toLowerCase().indexOf(lowerSearchValue) !== -1
  ) : actionIds;

  return (
    <div key='actionList'
         {...styling(['actionList', isWideLayout && 'actionListWide'], isWideLayout)}>
      <input {...styling('actionListSearch')}
             onChange={e => onSearch(e.target.value)}
             placeholder='filter...' />
      {filteredActionIds.map((actionId, idx) =>
        <div key={idx}
             {...styling([
               'actionListItem',
               actionId === selectedActionId && 'actionListItemSelected'
             ], actionId === selectedActionId)}
             onClick={() => onSelect(actionId)}>
          <div {...styling('actionListItemName')}>
            {actions[actionId].action.type}
          </div>
          <div {...styling('actionListItemTime')}>
            {getTime(actions, actionIds, actionId)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionList;
