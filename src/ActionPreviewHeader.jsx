import React from 'react';
import themeable from './themeable';

const ActionPreviewHeader = ({
  theme, defaultTheme, inspectedPath, onInspectPath, tab, onSelectTab
}) => {
  const createTheme = themeable({ ...theme, ...defaultTheme });

  return (
    <div key='previewHeader' {...createTheme('previewHeader')}>
      <div>
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
      <div {...createTheme('tabSelector')}>
        {['Diff', 'State'].map(t =>
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
    </div>
  );
}

export default ActionPreviewHeader;
