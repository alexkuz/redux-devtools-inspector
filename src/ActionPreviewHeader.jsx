// @flow
import React from 'react';

import type { StylingFunction } from 'react-base16-styling';
import type { Tab, TabName } from './types';

type Props = {
  styling: StylingFunction,
  inspectedPath: string[],
  onInspectPath: (path: string[]) => void,
  tabName: TabName,
  onSelectTab: (tabName: TabName) => void,
  tabs: Tab[]
};

const ActionPreviewHeader =
  ({ styling, inspectedPath, onInspectPath, tabName, onSelectTab, tabs }: Props) =>
  <div key='previewHeader' {...styling('previewHeader')}>
    <div {...styling('tabSelector')}>
      {tabs.map(tab =>
        <div onClick={() => onSelectTab(tab.name)}
             key={tab.name}
          {...styling([
            'selectorButton',
            tab.name === tabName ? 'selectorButtonSelected' : null
          ], tab.name === tabName)}>
          {tab.name}
        </div>
      )}
    </div>
    <div {...styling('inspectedPath')}>
      {inspectedPath.length ?
        <span {...styling('inspectedPathKey')}>
          <a onClick={() => onInspectPath([])}
            {...styling('inspectedPathKeyLink')}>
            {tabName}
          </a>
        </span> : tabName
      }
      {inspectedPath.map((key, idx) =>
        idx === inspectedPath.length - 1 ? <span key={key}>{key}</span> :
          <span key={key}
            {...styling('inspectedPathKey')}>
          <a onClick={() => onInspectPath(inspectedPath.slice(0, idx + 1))}
            {...styling('inspectedPathKeyLink')}>
            {key}
          </a>
        </span>
      )}
    </div>
  </div>;

export default ActionPreviewHeader;
