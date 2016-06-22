import React, { Component, cloneElement } from 'react';
import JSONTree from 'react-json-tree';
import ActionPreviewHeader from './ActionPreviewHeader';
import JSONDiff from './JSONDiff';
import { Iterable } from 'immutable';
import isIterable from './isIterable';

const IS_IMMUTABLE_KEY = '@@__IS_IMMUTABLE__@@';

function isImmutable(value) {
  return Iterable.isKeyed(value) || Iterable.isIndexed(value) || Iterable.isIterable(value);
}

function getItemString(createTheme, type, data) {
  let text;

  function getShortTypeString(val) {
    if (isIterable(val) && !isImmutable(val)) {
      return '(…)';
    } else if (Array.isArray(val)) {
      return val.length > 0 ? '[…]' : '[]';
    } else if (val === null) {
      return 'null';
    } else if (val === undefined) {
      return 'undef';
    } else if (typeof val === 'object') {
      return Object.keys(val).length > 0 ? '{…}' : '{}';
    } else if (typeof val === 'function') {
      return 'fn';
    } else if (typeof val === 'string') {
      return `"${val.substr(0, 10) + (val.length > 10 ? '…' : '')}"`
    } else if (typeof val === 'symbol') {
      return 'symbol'
    } else {
      return val;
    }
  }

  if (type === 'Object') {
    const keys = Object.keys(data);
    const str = keys
      .slice(0, 2)
      .map(key => `${key}: ${getShortTypeString(data[key])}`)
      .concat(keys.length > 2 ? ['…'] : [])
      .join(', ');

    text = `{ ${str} }`;
  } else if (type === 'Array') {
    const str = data
      .slice(0, 2)
      .map(getShortTypeString)
      .concat(data.length > 2 ? ['…'] : []).join(', ');

    text = `[${str}]`;
  } else {
    text = type;
  }

  const immutableStr = data[IS_IMMUTABLE_KEY] ? 'Immutable' : '';

  return <span {...createTheme('treeItemHint')}> {immutableStr} {text}</span>;
}

class ActionPreview extends Component {
  render() {
    const {
      styling, delta, error, nextState, onInspectPath, inspectedPath, tab,
      onSelectTab, action, actions, selectedActionId, startActionId,
      computedStates, base16Theme, isLightTheme, customTabs
    } = this.props;

    return (
      <div key='actionPreview' {...styling('actionPreview')}>
        <ActionPreviewHeader {...{
          styling, inspectedPath, onInspectPath, tab, onSelectTab, customTabs
        }} />
        {tab === 'Diff' && !error &&
          <JSONDiff labelRenderer={this.labelRenderer}
                    {...{ delta, styling, base16Theme, isLightTheme }} />
        }
        {(tab === 'State' && nextState && !error || tab === 'Action') &&
          <JSONTree labelRenderer={this.labelRenderer}
                    theme={{
                      extend: base16Theme,
                      nestedNodeItemString: ({ style }, expanded) => ({
                        style: {
                          ...style,
                          display: expanded ? 'none' : 'inline'
                        }
                      })
                    }}
                    data={tab === 'Action' ? action : nextState}
                    getItemString={(type, data) => getItemString(styling, type, data)}
                    isLightTheme={isLightTheme}
                    hideRoot />
        }
        {customTabs && customTabs[tab] &&
          cloneElement(customTabs[tab],
            {...{styling, computedStates, actions, selectedActionId, startActionId}}
          )
        }
        {error &&
          <div {...styling('stateError')}>{error}</div>
        }
      </div>
    );
  }

  labelRenderer = (key, ...rest) => {
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
      </span>
    );
  }
}

export default ActionPreview;
