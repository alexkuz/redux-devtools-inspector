import React from 'react';
import themeable from './themeable';
import { create as createJSONDiff } from 'jsondiffpatch';
import formatters from 'jsondiffpatch/src/main-formatters';
import JSONTree from '@alexkuz/react-json-tree';

import 'jsondiffpatch/public/formatters-styles/html.css';

const jsonDiff = createJSONDiff({});

function getInspectedState(state, path) {
  return path.length ?
    {
      [path[path.length - 1]]: path.reduce(
        (s, key) => s && s[key],
        state
      )
    } : state
}

function getItemString(createTheme, type, data) {
  let text;

  function getShortTypeString(val) {
    if (Array.isArray(val)) {
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

  return <span {...createTheme('treeItemHint')}> {text}</span>;
}

const ActionPreview = ({
  theme, defaultTheme, fromState, toState, onInspectPath, inspectedPath
}) => {
  const createTheme = themeable({ ...theme, ...defaultTheme });
  const delta = fromState && toState && jsonDiff.diff(
    getInspectedState(fromState.state, inspectedPath),
    getInspectedState(toState.state, inspectedPath)
  );

  return (
    <div key='actionPreview' {...createTheme('actionPreview', 'actionPreviewLayout')}>
      <div key='inspectedPath' {...createTheme('inspectedPath', 'inspectedPathLayout')}>
        {inspectedPath.length ?
          <span {...createTheme('inspectedPathKey', 'inspectedPathKeyLayout')}>
            <a onClick={() => onInspectPath([])}>
              State
            </a>
          </span> : 'State'
        }
        {inspectedPath.map((key, idx) =>
          idx === inspectedPath.length - 1 ? key :
          <span key={key}
             {...createTheme('inspectedPathKey', 'inspectedPathKeyLayout')}>
            <a onClick={() => onInspectPath(inspectedPath.slice(0, idx + 1))}>
              {key}
            </a>
          </span>
        )}
      </div>
      {toState &&
        <JSONTree labelRenderer={(key, ...rest) =>
                                  <span>
                                    <span {...createTheme('treeItemKey')}>
                                      {key}
                                    </span>
                                    <span {...createTheme('treeItemPin')}
                                          onClick={() => onInspectPath([
                                            ...inspectedPath.slice(0, inspectedPath.length - 1),
                                            ...[key, ...rest].reverse()
                                          ])}>
                                      {'(pin)'}
                                    </span>
                                  </span>
                                }
                  data={getInspectedState(toState.state, inspectedPath)}
                  getItemString={(type, data) => getItemString(createTheme, type, data)}
                  getItemStringStyle={
                    (type, expanded) => ({ display: expanded ? 'none' : 'inline' })
                  }
                  hideRoot />
      }
      <div key='diffHeader' {...createTheme('diffHeader', 'diffHeaderLayout')}>
        Diff
      </div>
      {delta &&
        <div {...createTheme('stateDiff', 'stateDiffLayout')}
             dangerouslySetInnerHTML={{ __html: formatters.html.format(delta) }} />
      }
    </div>
  );
}

export default ActionPreview;
