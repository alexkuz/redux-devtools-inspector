import React from 'react';
import themeable from './themeable';

const ActionPreviewHeader = ({
  theme, inspectedPath, onInspectPath, tab, onSelectTab
}) => {
  const createTheme = themeable(theme);

  return (
    <div key='previewHeader' {...createTheme('previewHeader')}>
      <div {...createTheme('tabSelector')}>
        {['Action', 'Diff', 'State'].map(t =>
          <div onClick={() => onSelectTab(t)}
               key={t}
               {...createTheme(
                 'tabSelectorButton',
                 t === tab && 'tabSelectorButtonSelected'
               )}>
            {t}
          </div>
        )}
      </div>
      <div {...createTheme('inspectedPath')}>
        {inspectedPath.length ?
          <span {...createTheme('inspectedPathKey')}>
            <a onClick={() => onInspectPath([])}
               {...createTheme('inspectedPathKeyLink')}>
              {tab}
            </a>
          </span> : tab
        }
        {inspectedPath.map((key, idx) =>
          idx === inspectedPath.length - 1 ? key :
          <span key={key}
             {...createTheme('inspectedPathKey')}>
            <a onClick={() => onInspectPath(inspectedPath.slice(0, idx + 1))}
               {...createTheme('inspectedPathKeyLink')}>
              {key}
            </a>
          </span>
        )}
      </div>
    </div>
  );
}

export default ActionPreviewHeader;
