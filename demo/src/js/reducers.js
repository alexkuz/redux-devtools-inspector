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
  store1: (state=0, action) => action.type === 'INCREMENT_STATE1' ? state + 1 : state,
  store2: (state=0, action) => action.type === 'INCREMENT_STATE2' ? state + 1 : state,
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
