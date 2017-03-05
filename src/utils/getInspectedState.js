// @flow
import { Iterable, fromJS } from 'immutable';
import isIterable from './isIterable';
import getType from './getType';

function iterateToKey(obj, key) { // maybe there's a better way, dunno
  let idx = 0;
  for (let entry of obj) {
    if (idx === key) return entry;
    idx++;
  }
}

const entryRegex = /\[entry (\d+)\]/;

export default function getInspectedState(
  state: Object, path: ?string[], convertImmutable: boolean
): Object {
  state = path && path.length ? {
    [path[path.length - 1]]: path.reduce(
      (s, key) => {
        if (!s) {
          return s;
        }
        if (Iterable.isAssociative(s) || getType(s) === 'Map') {
          if (!s.has(key) && entryRegex.test(key)) {
            const match = key.match(entryRegex);
            const entry = iterateToKey(s, parseInt(match && match[1], 10));
            return entry && {
              '[key]': entry[0],
              '[value]': entry[1]
            };
          }
          return s.get(key);
        } else if (isIterable(s)) {
          return iterateToKey(s, parseInt(key, 10));
        }

        return s[key];
      },
      state
    )
  } : state;

  if (convertImmutable) {
    try {
      state = fromJS(state).toJS();
    } catch(e) {}
  }

  return state;
}
