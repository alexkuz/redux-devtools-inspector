import React, { Component } from 'react';
import ActionPreviewHeader from './ActionPreviewHeader';
import ActionPreviewSubHeader from './ActionPreviewSubHeader';
import DiffTab from './tabs/DiffTab';
import StateTab from './tabs/StateTab';
import ActionTab from './tabs/ActionTab';

const DEFAULT_TABS = [{
  name: 'Action',
  component: ActionTab
}, {
  name: 'Diff',
  component: DiffTab
}, {
  name: 'State',
  components: [
    {
      name: 'Tree',
      component: StateTab
    }
  ]
}];

class ActionPreview extends Component {
  render() {
    const {
      styling, delta, error, nextState, onInspectPath, inspectedPath, tabName,
      subTabName, onSelectTab, onSelectSubTab, action, actions, selectedActionId, startActionId,
      computedStates, base16Theme, invertTheme, tabs
    } = this.props;

    const renderedTabs = (typeof tabs === 'function') ?
      tabs(DEFAULT_TABS) :
      (tabs ? tabs : DEFAULT_TABS);

    const { component: TabComponent, components } = renderedTabs.find(tab => tab.name === tabName);

    const tabProps = {
      labelRenderer: this.labelRenderer,
      styling,
      computedStates,
      actions,
      selectedActionId,
      startActionId,
      base16Theme,
      invertTheme,
      delta,
      action,
      nextState
    };

    let actionPreviewContent;
    if (!error) {
      if (components) {
        let component;
        const subTabs = components.map(c => {
          if (c.name === subTabName) component = c;
          return c.name;
        });
        const { component: SubTabComponent, selector } = component || components[0];
        actionPreviewContent = [
          <ActionPreviewSubHeader
            key='actionPreviewSubHeader'
            tabs={subTabs}
            {...{ styling, tabName: subTabName, onSelectTab: onSelectSubTab }}
          />,
          <div key='actionPreviewContent' {...styling('actionPreviewContent')}>
            <SubTabComponent {...(selector ? selector(tabProps) : tabProps)} />
          </div>
        ];
      } else {
        actionPreviewContent = <TabComponent {...tabProps} />;
      }
    } else {
      actionPreviewContent = <div {...styling('stateError')}>{error}</div>;
    }

    return (
      <div key='actionPreview' {...styling('actionPreview')}>
        <ActionPreviewHeader
          tabs={renderedTabs}
          {...{ styling, inspectedPath, onInspectPath, tabName, onSelectTab }}
        />
        {actionPreviewContent}
      </div>
    );
  }

  labelRenderer = ([key, ...rest], nodeType, expanded) => {
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
