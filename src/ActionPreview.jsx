// @flow
import React, { Component } from 'react';
import ActionPreviewHeader from './ActionPreviewHeader';
import DiffTab from './tabs/DiffTab';
import StateTab from './tabs/StateTab';
import ActionTab from './tabs/ActionTab';

import type { LabelRenderer } from 'react-json-tree';
import type { Tab, TabName } from './types';

type DefaultProps = {
  tabName: TabName
};

type Props = DefaultProps & {
  tabs: ((defaultTabs: Tab[]) => Tab[]) | Tab[]
};

const DEFAULT_TABS: Tab[] = [{
  name: 'Action',
  component: ActionTab
}, {
  name: 'Diff',
  component: DiffTab
}, {
  name: 'State',
  component: StateTab
}]

class ActionPreview extends Component<DefaultProps, Props, void> {
  static defaultProps: DefaultProps = {
    tabName: 'Diff'
  }

  render() {
    const {
      styling, delta, error, nextState, onInspectPath, inspectedPath, tabName,
      isWideLayout, onSelectTab, action, actions, selectedActionId, startActionId,
      computedStates, base16Theme, invertTheme, tabs, monitorState, updateMonitorState
    } = this.props;

    const renderedTabs = (typeof tabs === 'function') ?
      tabs(DEFAULT_TABS) :
      (tabs ? tabs : DEFAULT_TABS);

    const tab = renderedTabs.find(tab => tab.name === tabName);

    let TabComponent;
    if (tab) {
      TabComponent = tab.component;
    }

    return (
      <div key='actionPreview' {...styling('actionPreview')}>
        <ActionPreviewHeader
          tabs={renderedTabs}
          {...{ styling, inspectedPath, onInspectPath, tabName, onSelectTab }}
        />
        {!error &&
          <div key='actionPreviewContent' {...styling('actionPreviewContent')}>
            {TabComponent &&
              <TabComponent
                labelRenderer={this.labelRenderer}
                {...{
                  styling,
                  computedStates,
                  actions,
                  selectedActionId,
                  startActionId,
                  base16Theme,
                  invertTheme,
                  isWideLayout,
                  delta,
                  action,
                  nextState,
                  monitorState,
                  updateMonitorState
                }}
              />
            }
          </div>
        }
        {error &&
          <div {...styling('stateError')}>{error}</div>
        }
      </div>
    );
  }

  labelRenderer: LabelRenderer = ([key, ...rest], nodeType, expanded) => {
    const { styling, onInspectPath, inspectedPath } = this.props;

    return (
      <span>
        <span {...styling('treeItemKey')}>
          {key}
        </span>
        <span {...styling('treeItemPin')}
              onClick={() => onInspectPath([
                ...inspectedPath.slice(0, inspectedPath.length - 1),
                ...[key, ...rest].reverse()
              ])}>
          {'(pin)'}
        </span>
        {!expanded && ': '}
      </span>
    );
  }
}

export default ActionPreview;
