import React from 'react';
import JSONTree from 'leonaves-react-json-tree';
import deepMap from './deepMap';
import themeable from './themeable';

function stringify(val) {
  const str = JSON.stringify(val);

  return str.length > 22 ? `${str.substr(0, 15)}…${str.substr(-5)}` : str;
}

function prepareDelta(delta) {
  const diffs = [];
  let diffId = -1;
  const data = deepMap(delta, (val) => {
    if (Array.isArray(val)) {
      diffs.push(val);
      diffId++;
      return '<JSON_DIFF_ID>' + diffId;
    }

    if (val && val._t === 'a') {
      return Object.keys(val).reduce((obj, key) => {
        if (key === '_t') {
          return obj;
        } if (key[0] === '_' && !val[key.substr(1)]) {
          return { ...obj, [key.substr(1)]: val[key] };
        } else if (val['_' + key]) {
          return { ...obj, [key]: [val['_' + key][0], val[key][0]] };
        } else if (!val['_' + key] && key[0] !== '_') {
          return { ...obj, [key]: val[key] };
        }

        return obj;
      }, {});
    }

    return val;
  });

  return { diffs, data };
}

function valueRenderer(raw, diffs, createTheme) {
  function renderSpan(name, body) {
    return (
      <span key={name} {...createTheme('diff', name)}>{body}</span>
    );
  }

  if (raw.indexOf('"<JSON_DIFF_ID>') === 0) {
    const diff = diffs[parseInt(raw.replace(/[^\d]/g, ''), 10)];

    if (Array.isArray(diff)) {
      switch(diff.length) {
      case 1:
        return renderSpan('diffAdd', stringify(diff[0]));
      case 2:
        return (
          <span>
            {renderSpan('diffUpdateFrom', stringify(diff[0]))}
            {renderSpan('diffUpdateArrow', ' => ')}
            {renderSpan('diffUpdateTo', stringify(diff[1]))}
          </span>
        );
      case 3:
        return renderSpan('diffRemove', stringify(diff[0]));
      }
    }
  }

  return raw;
}

const JSONDiff = ({ delta, theme, defaultTheme, ...props }) => {
  const { data, diffs } = prepareDelta(delta);
  const createTheme = themeable({ ...theme, ...defaultTheme });

  return (
    <JSONTree {...props}
              data={data}
              getItemString={() => ''}
              valueRenderer={raw => valueRenderer(raw, diffs, createTheme)}
              expandAll
              hideRoot />
  );
}

export default JSONDiff;
