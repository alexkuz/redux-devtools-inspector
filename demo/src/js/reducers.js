import { combineReducers } from 'redux';

const DEFAULT_NESTED_STATE = {
  long: {
    nested: {
      path: {
        to: {
          a: 'key'
        }
      }
    }
  }
};

export default combineReducers({
  store: (state=0, action) => action.type === 'INCREMENT' ? state + 1 : state,
  undefined: (state={ val: undefined }) => state,
  null: (state=null) => state,
  func: (state=() => {}) => state,
  array: (state=[], action) => action.type === 'PUSH' ?
    [...state, Math.random()] : (
      action.type === 'POP' ? state.slice(1) : (
        action.type === 'REPLACE' ? [Math.random(), ...state.slice(1)] : state
      )
    ),
  nestedState: (state=DEFAULT_NESTED_STATE, action) =>
    action.type === 'CHANGE_NESTED' ?
      {
        ...state,
        long: {
          nested: {
            path: {
              to: {
                a: state.long.nested.path.to.a + '!'
              }
            }
          }
        }
      } : state
});
