// @flow
import { ReduxState, MonitorState } from './types';

type Action = {
  type: string,
  [key: string]: any
};

const UPDATE_MONITOR_STATE = '@@redux-devtools-inspector/UPDATE_MONITOR_STATE';

const DEFAULT_STATE: ReduxState = {
  selectedActionId: null,
  startActionId: null,
  inspectedActionPath: [],
  inspectedStatePath: [],
  tabName: 'Diff'
};

export function updateMonitorState(monitorState: MonitorState) {
  return { type: UPDATE_MONITOR_STATE, monitorState };
}

function reduceUpdateState(state, action) {
  return (action.type === UPDATE_MONITOR_STATE) ? {
    ...state,
    ...action.monitorState
  } : state;
}

export function reducer(props: Object, state: ReduxState=DEFAULT_STATE, action: Action) {
  return {
    ...reduceUpdateState(state, action)
  };
}
