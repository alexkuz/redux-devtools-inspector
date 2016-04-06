import React from 'react';

const ActionPreviewHeader = ({
  styling, inspectedPath, onInspectPath, tab, onSelectTab
}) => {
  return (
    <div key='previewHeader' {...styling('previewHeader')}>
      <div {...styling('tabSelector')}>
        {['Action', 'Diff', 'State'].map(t =>
          <div onClick={() => onSelectTab(t)}
               key={t}
               {...styling([
                 'tabSelectorButton',
                 t === tab && 'tabSelectorButtonSelected'
               ], t === tab)}>
            {t}
          </div>
        )}
      </div>
      <div {...styling('inspectedPath')}>
        {inspectedPath.length ?
          <span {...styling('inspectedPathKey')}>
            <a onClick={() => onInspectPath([])}
               {...styling('inspectedPathKeyLink')}>
              {tab}
            </a>
          </span> : tab
        }
        {inspectedPath.map((key, idx) =>
          idx === inspectedPath.length - 1 ? key :
          <span key={key}
             {...styling('inspectedPathKey')}>
            <a onClick={() => onInspectPath(inspectedPath.slice(0, idx + 1))}
               {...styling('inspectedPathKeyLink')}>
              {key}
            </a>
          </span>
        )}
      </div>
    </div>
  );
}

export default ActionPreviewHeader;
