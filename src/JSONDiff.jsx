import React from 'react';
import JSONTree from '@alexkuz/react-json-tree';
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
    if (Array.isArray(val) || val && val._t === 'a') {
      diffs.push(val);
      diffId++;
      return '<JSON_DIFF_ID>' + diffId;
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
    } else if (diff && diff._t === 'a') {
      const keys = Object.keys(diff);
      return (
        <span>
          [
            {keys
              .filter(key => key !== '_t')
              .map((key, idx) => {
                const last = idx === keys.length - 2;

                switch(diff[key].length) {
                case 1:
                  return (
                    <span>
                      {`${key}: `}
                      {renderSpan('diffAdd', stringify(diff[key][0]))}
                      {!last && ', '}
                    </span>
                  );
                case 3:
                  return (
                    <span>
                      {`${key.replace('_', '')}: `}
                      {renderSpan('diffRemove', stringify(diff[key][0]))}
                      {!last && ', '}
                    </span>
                  );
                }
              })
            }
          ]
        </span>
      );
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
