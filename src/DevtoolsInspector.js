// @flow
import React, { PureComponent } from 'react';
import { createStylingFromTheme, base16Themes } from './utils/createStylingFromTheme';
import ActionList from './ActionList';
import ActionPreview from './ActionPreview';
import getInspectedState from './utils/getInspectedState';
import createDiffPatcher from './createDiffPatcher';
import { getBase16Theme } from 'react-base16-styling';
import { reducer, updateMonitorState } from './redux';
import { ActionCreators } from 'redux-devtools';

import type { Base16Theme, StylingFunction, Theme } from 'react-base16-styling';
import type { Dispatch } from 'redux';
import type { Action, MonitorState, TabName } from './types';
import type { ObjectHash, PropertyFilter, Delta } from 'jsondiffpatch';

type DefaultProps = {
  supportImmutable: boolean,
  theme: Theme,
  invertTheme: boolean
};

type AppState = Object;

type Props = DefaultProps & {
  dispatch: Dispatch<*>,
  computedStates: AppState[],
  stagedActionIds: number[],
  actionsById: {
    [id: number]: Action
  },
  currentStateIndex: number,
  monitorState: MonitorState,
  preserveScrollTop: boolean,
  stagedActions: number[],
//  select: PropTypes.func.isRequired,
  diffObjectHash: ObjectHash,
  diffPropertyFilter: PropertyFilter
};

type State = {
  isWideLayout: boolean,
  themeState: {
    base16Theme: Base16Theme,
    styling: StylingFunction
  },
  action: Action,
  nextState: Object,
  delta: ?Delta,
  error: ?string
};

const { commit, sweep, toggleAction, jumpToAction, jumpToState } = ActionCreators;

function getLastActionId(props) {
  return props.stagedActionIds[props.stagedActionIds.length - 1];
}

function getCurrentActionId(props, monitorState) {
  return monitorState.selectedActionId === null ?
    props.stagedActionIds[props.currentStateIndex] : monitorState.selectedActionId;
}

function getFromState(actionIndex, stagedActionIds, computedStates, monitorState) {
  const { startActionId } = monitorState;
  if (startActionId === null) {
    return actionIndex > 0 ? computedStates[actionIndex - 1] : null;
  }
  let fromStateIdx = stagedActionIds.indexOf(startActionId - 1);
  if (fromStateIdx === -1) fromStateIdx = 0;
  return computedStates[fromStateIdx];
}

function createIntermediateState(props, monitorState) {
  const { supportImmutable, computedStates, stagedActionIds,
          actionsById: actions, diffObjectHash, diffPropertyFilter } = props;
  const { inspectedStatePath, inspectedActionPath } = monitorState;
  const currentActionId = getCurrentActionId(props, monitorState);
  const currentAction = actions[currentActionId] && actions[currentActionId].action;

  const actionIndex = stagedActionIds.indexOf(currentActionId);
  const fromState = getFromState(actionIndex, stagedActionIds, computedStates, monitorState);
  const toState = computedStates[actionIndex];
  const error = toState ? toState.error : null;

  const fromInspectedState = !error && fromState ?
    getInspectedState(fromState.state, inspectedStatePath, supportImmutable) : null;
  const toInspectedState = !error && toState ?
    getInspectedState(toState.state, inspectedStatePath, supportImmutable) : null;
  const delta = fromInspectedState && toInspectedState ?
    createDiffPatcher(diffObjectHash, diffPropertyFilter).diff(
      fromInspectedState,
      toInspectedState
    ) : null;

  return {
    delta,
    nextState: toState && getInspectedState(toState.state, inspectedStatePath, false),
    action: getInspectedState(currentAction, inspectedActionPath, false),
    error
  };
}

function createThemeState(props) {
  const base16Theme = getBase16Theme(props.theme, base16Themes);
  const styling = createStylingFromTheme(props.theme, props.invertTheme);

  return { base16Theme, styling };
}

export default class DevtoolsInspector extends PureComponent<DefaultProps, Props, State> {
  state: State;
  updateSizeTimeout: ?number;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...createIntermediateState(props, props.monitorState),
      isWideLayout: false,
      themeState: createThemeState(props)
    };
  }

  static update = reducer;

  static defaultProps = {
    select: (state) => state,
    supportImmutable: false,
    theme: 'inspector',
    invertTheme: true
  };

  componentDidMount() {
    this.updateSizeMode();
    this.updateSizeTimeout = setInterval(this.updateSizeMode.bind(this), 150);
  }

  componentWillUnmount() {
    clearTimeout(this.updateSizeTimeout);
  }

  updateMonitorState = (monitorState: MonitorState) => {
    this.props.dispatch(updateMonitorState(monitorState));
  };

  updateSizeMode() {
    const isWideLayout = this.refs.inspector.offsetWidth > 500;

    if (isWideLayout !== this.state.isWideLayout) {
      this.setState({ isWideLayout });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    let nextMonitorState = nextProps.monitorState;
    const monitorState = this.props.monitorState;

    if (
      getCurrentActionId(this.props, monitorState) !==
      getCurrentActionId(nextProps, nextMonitorState) ||
      monitorState.startActionId !== nextMonitorState.startActionId ||
      monitorState.inspectedStatePath !== nextMonitorState.inspectedStatePath ||
      monitorState.inspectedActionPath !== nextMonitorState.inspectedActionPath
    ) {
      this.setState(createIntermediateState(nextProps, nextMonitorState));
    }

    if (this.props.theme !== nextProps.theme ||
        this.props.invertTheme !== nextProps.invertTheme) {
      this.setState({ themeState: createThemeState(nextProps) });
    }
  }

  render() {
    const { stagedActionIds: actionIds, actionsById: actions, computedStates,
      tabs, invertTheme, skippedActionIds, currentStateIndex, monitorState } = this.props;
    const { selectedActionId, startActionId, searchValue, tabName } = monitorState;
    const inspectedPathType = tabName === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';
    const {
      themeState, isWideLayout, action, nextState, delta, error
    } = this.state;
    const { base16Theme, styling } = themeState;

    return (
      <div key='inspector'
           ref='inspector'
           {...styling(['inspector', isWideLayout ? 'inspectorWide' : null], isWideLayout)}>
        <ActionList {...{
          actions, actionIds, isWideLayout, searchValue, selectedActionId, startActionId
        }}
                    styling={styling}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelectAction}
                    onToggleAction={this.handleToggleAction}
                    onJumpToState={this.handleJumpToState}
                    onCommit={this.handleCommit}
                    onSweep={this.handleSweep}
                    skippedActionIds={skippedActionIds}
                    currentActionId={actionIds[currentStateIndex]}
                    lastActionId={getLastActionId(this.props)} />
        <ActionPreview {...{
          base16Theme, invertTheme, isWideLayout, tabs, tabName, delta, error, nextState,
          computedStates, action, actions, selectedActionId, startActionId, monitorState
        }}
                       updateMonitorState={this.updateMonitorState}
                       styling={styling}
                       onInspectPath={this.handleInspectPath.bind(this, inspectedPathType)}
                       inspectedPath={monitorState[inspectedPathType]}
                       onSelectTab={this.handleSelectTab} />
      </div>
    );
  }

  handleToggleAction = (actionId: number) => {
    this.props.dispatch(toggleAction(actionId));
  };

  handleJumpToState = (actionId: number) => {
    if (jumpToAction) {
      this.props.dispatch(jumpToAction(actionId));
    } else { // Fallback for redux-devtools-instrument < 1.5
      const index = this.props.stagedActionIds.indexOf(actionId);
      if (index !== -1) this.props.dispatch(jumpToState(index));
    }
  };

  handleCommit = () => {
    this.props.dispatch(commit());
  };

  handleSweep = () => {
    this.props.dispatch(sweep());
  };

  handleSearch = (val: string) => {
    this.updateMonitorState({ searchValue: val });
  };

  handleSelectAction = (e: SyntheticMouseEvent, actionId: number) => {
    const { monitorState } = this.props;
    let startActionId;
    let selectedActionId;

    if (e.shiftKey && monitorState.selectedActionId !== null) {
      if (monitorState.startActionId !== null) {
        if (actionId >= monitorState.startActionId) {
          startActionId = Math.min(monitorState.startActionId, monitorState.selectedActionId);
          selectedActionId = actionId;
        } else {
          selectedActionId = Math.max(monitorState.startActionId, monitorState.selectedActionId);
          startActionId = actionId;
        }
      } else {
        startActionId = Math.min(actionId, monitorState.selectedActionId);
        selectedActionId = Math.max(actionId, monitorState.selectedActionId);
      }
    } else {
      startActionId = null;
      if (actionId === monitorState.selectedActionId || monitorState.startActionId !== null) {
        selectedActionId = null;
      } else {
        selectedActionId = actionId;
      }
    }

    this.updateMonitorState({ startActionId, selectedActionId });
  };

  handleInspectPath = (pathType: string, path: string[]) => {
    this.updateMonitorState({ [pathType]: path });
  };

  handleSelectTab = (tabName: TabName) => {
    this.updateMonitorState({ tabName });
  };
}
