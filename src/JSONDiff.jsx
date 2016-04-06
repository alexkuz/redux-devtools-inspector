import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
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

export default class JSONDiff extends Component {
  render() {
    const { delta, styling, base16Theme, ...props } = this.props;

    return (
      <JSONTree {...props}
                theme={base16Theme}
                data={delta}
                getItemString={() => ''}
                valueRenderer={(raw, value) => this.valueRenderer(raw, value, styling)}
                postprocessValue={prepareDelta}
                isCustomNode={value => Array.isArray(value)}
                expandAll
                hideRoot />
    );
  }

  valueRenderer(raw, value, styling) {
    function renderSpan(name, body) {
      return (
        <span key={name} {...styling(['diff', name])}>{body}</span>
      );
    }

    if (Array.isArray(value)) {
      switch(value.length) {
      case 1:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffAdd', stringifyAndShrink(value[0]))}
          </span>
        );
      case 2:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0]))}
            {renderSpan('diffUpdateArrow', ' => ')}
            {renderSpan('diffUpdateTo', stringifyAndShrink(value[1]))}
          </span>
        );
      case 3:
        return (
          <span {...styling('diffWrap')}>
            {renderSpan('diffRemove', stringifyAndShrink(value[0]))}
          </span>
        );
      }
    }

    return raw;
  }
}
