import React from 'react';
import JSONTree from 'react-json-tree';
import themeable from './themeable';
import stringify from 'javascript-stringify';

function stringifyAndShrink(val) {
  const str = stringify(val);
  if (val === null) { return 'null'; }
  else if (typeof val === 'undefined') { return 'undefined'; }

  return str.length > 22 ? `${str.substr(0, 15)}…${str.substr(-5)}` : str;
}

function prepareDelta(value) {
  if (value && value._t === 'a') {
    const res = {};
    for (let key in value) {
      if (key !== '_t') {
        if (key[0] === '_' && !value[key.substr(1)]) {
          res[key.substr(1)] = value[key];
        } else if (value['_' + key]) {
          res[key] = [value['_' + key][0], value[key][0]];
        } else if (!value['_' + key] && key[0] !== '_') {
          res[key] = value[key];
        }
      }
    }
    return res;
  }

  return value;
}

function valueRenderer(raw, value, createTheme) {
  function renderSpan(name, body) {
    return (
      <span key={name} {...createTheme('diff', name)}>{body}</span>
    );
  }

  if (Array.isArray(value)) {
    switch(value.length) {
    case 1:
      return (
        <span {...createTheme('diffWrap')}>
          {renderSpan('diffAdd', stringifyAndShrink(value[0]))}
        </span>
      );
    case 2:
      return (
        <span {...createTheme('diffWrap')}>
          {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0]))}
          {renderSpan('diffUpdateArrow', ' => ')}
          {renderSpan('diffUpdateTo', stringifyAndShrink(value[1]))}
        </span>
      );
    case 3:
      return (
        <span {...createTheme('diffWrap')}>
          {renderSpan('diffRemove', stringifyAndShrink(value[0]))}
        </span>
      );
    }
  }

  return raw;
}

const JSONDiff = ({ delta, theme, base16Theme, ...props }) => {
  const createTheme = themeable(theme);

  return (
    <JSONTree {...props}
              theme={base16Theme}
              data={delta}
              getItemString={() => ''}
              valueRenderer={(raw, value) => valueRenderer(raw, value, createTheme)}
              postprocessValue={prepareDelta}
              isCustomNode={value => Array.isArray(value)}
              expandAll
              hideRoot />
  );
}

export default JSONDiff;
