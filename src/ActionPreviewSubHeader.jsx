import React from 'react';

const ActionPreviewSubHeader =
  ({ styling, tabName, onSelectTab, tabs }) =>
    <div key='previewSubHeader' {...styling('previewSubHeader')}>
      <div {...styling('subTabSelector')}>
        {tabs.map(tab =>
          <div onClick={() => onSelectTab(tab)}
               key={tab}
               {...styling([
                 'selectorButton',
                 tab === tabName && 'selectorButtonSelected'
               ], tab === tabName)}>
            {tab}
          </div>
        )}
      </div>
    </div>;

export default ActionPreviewSubHeader;
