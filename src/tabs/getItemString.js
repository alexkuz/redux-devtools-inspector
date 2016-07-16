import React from 'react';
import { Iterable } from 'immutable';
import isIterable from '../utils/isIterable';

const IS_IMMUTABLE_KEY = '@@__IS_IMMUTABLE__@@';

function isImmutable(value) {
  return Iterable.isKeyed(value) || Iterable.isIndexed(value) || Iterable.isIterable(value);
}

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

function getText(type, data) {
  if (type === 'Object') {
    const keys = Object.keys(data);
    const str = keys
      .slice(0, 2)
      .map(key => `${key}: ${getShortTypeString(data[key])}`)
      .concat(keys.length > 2 ? ['…'] : [])
      .join(', ');

    return `{ ${str} }`;
  } else if (type === 'Array') {
    const str = data
      .slice(0, 2)
      .map(getShortTypeString)
      .concat(data.length > 2 ? ['…'] : []).join(', ');

    return `[${str}]`;
  } else {
    return type;
  }
}

const getItemString = (createTheme, type, data) =>
  <span {...createTheme('treeItemHint')}>
    {data[IS_IMMUTABLE_KEY] ? 'Immutable' : ''}
    {getText(type, data)}
  </span>;

export default getItemString;
