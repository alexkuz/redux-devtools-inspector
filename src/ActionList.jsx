import React from 'react';
import dateformat from 'dateformat';
import themeable from './themeable';

function getTime(actions, actionIds, actionId) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return idx ?
    dateformat(actions[actionId].timestamp - actions[prevActionId].timestamp, '+MM:ss.L') :
    dateformat(actions[actionId].timestamp, 'h:MM:ss.L');
}

const ActionList = ({
  theme, defaultTheme, actions, actionIds, isWideLayout,
  selectedActionId, onSelect, onSearch, searchValue
}) => {
  const createTheme = themeable({ ...theme, ...defaultTheme });
  const filteredActionIds = searchValue ? actionIds.filter(
    id => actions[id].action.type.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  ) : actionIds;

  return (
    <div key='actionList'
         {...createTheme('actionList', 'actionListLayout', isWideLayout && 'actionListWideLayout')}>
      <input {...createTheme('actionListSearch', 'actionListSearchLayout')}
             onChange={e => onSearch(e.target.value)}
             value={searchValue}
             placeholder='filter...' />
      {filteredActionIds.map(actionId =>
        <div key={actionId}
             {...createTheme(
                'actionListItem',
                actionId === selectedActionId && 'actionListItemSelected',
                'actionListItemLayout'
             )}
             onClick={() => onSelect(actionId)}>
          {actions[actionId].action.type}
          <div {...createTheme('actionListItemTime', 'actionListItemTimeLayout')}>
            {getTime(actions, actionIds, actionId)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionList;
