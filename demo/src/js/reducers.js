import { combineReducers } from 'redux';

const DEFAULT_NESTED_STATE = {
  long: {
    nested: [{
      path: {
        to: {
          a: 'key'
        }
      }
    }]
  }
};

const HUGE_ARRAY = Array.from({ length: 5000 })
  .map((_, key) => ({ str: 'key ' + key }));

const HUGE_OBJECT = Array.from({ length: 5000 })
  .reduce((o, _, key) => (o['key ' + key] = 'item ' + key, o), {});


const RECURSIVE = {};
RECURSIVE.obj = RECURSIVE;

function createIterator() {
  const iterable = {};
  iterable[Symbol.iterator] = function *iterator() {
    for (var i = 0; i < 333; i++) {
      yield 'item ' + i;
    }
  }

  return iterable;
}

export default combineReducers({
  store: (state=0, action) => action.type === 'INCREMENT' ? state + 1 : state,
  undefined: (state={ val: undefined }) => state,
  null: (state=null) => state,
  func: (state=() => {}) => state,
  array: (state=[], action) => action.type === 'PUSH' ?
    [...state, Math.random()] : (
      action.type === 'POP' ? state.slice(0, state.length - 1) : (
        action.type === 'REPLACE' ? [Math.random(), ...state.slice(1)] : state
      )
    ),
  hugeArrays: (state=[], action) => action.type === 'PUSH_HUGE_ARRAY' ?
    [ ...state, ...HUGE_ARRAY ] : state,
  hugeObjects: (state=[], action) => action.type === 'ADD_HUGE_OBJECT' ?
    [ ...state, HUGE_OBJECT ] : state,
  iterators: (state=[], action) => action.type === 'ADD_ITERATOR' ?
    [...state, createIterator()] : state,
  nestedState: (state=DEFAULT_NESTED_STATE, action) =>
    action.type === 'CHANGE_NESTED' ?
      {
        ...state,
        long: {
          nested: [{
            path: {
              to: {
                a: state.long.nested[0].path.to.a + '!'
              }
            }
          }]
        }
      } : state,
  recursive: (state=[], action) => action.type === 'ADD_RECURSIVE' ?
    [...state, { ...RECURSIVE }] : state
});
