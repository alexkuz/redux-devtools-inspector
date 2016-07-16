import React, { Component, PropTypes } from 'react';
import { createStylingFromTheme } from './createStylingFromTheme';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ActionList from './ActionList';
import ActionPreview from './ActionPreview';
import getInspectedState from './getInspectedState';
import DiffPatcher from './DiffPatcher';
import { getBase16Theme } from 'react-base16-styling';
import * as base16Themes from 'redux-devtools-themes';
import * as inspectorThemes from './themes';
import { reducer, updateMonitorState } from './redux';
import { ActionCreators } from 'redux-devtools';

const { commit, sweep, toggleAction } = ActionCreators;

function getLastActionId(props) {
  return props.stagedActionIds[props.stagedActionIds.length - 1];
}

function getCurrentActionId(props, monitorState) {
  const lastActionId = getLastActionId(props);
  return monitorState.selectedActionId === null ? lastActionId : monitorState.selectedActionId;
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

function createMonitorState(props, monitorState) {
  const { supportImmutable, computedStates, stagedActionIds,
          actionsById: actions } = props;
  const { inspectedStatePath, inspectedActionPath } = monitorState;
  const currentActionId = getCurrentActionId(props, monitorState);
  const currentAction = actions[currentActionId] && actions[currentActionId].action;

  const actionIndex = stagedActionIds.indexOf(currentActionId);
  const fromState = getFromState(actionIndex, stagedActionIds, computedStates, monitorState);
  const toState = computedStates[actionIndex];
  const error = toState && toState.error;

  const fromInspectedState = !error && fromState &&
    getInspectedState(fromState.state, inspectedStatePath, supportImmutable);
  const toInspectedState =
    !error && toState && getInspectedState(toState.state, inspectedStatePath, supportImmutable);
  const delta = !error && fromState && toState && DiffPatcher.diff(
    fromInspectedState,
    toInspectedState
  );

  return {
    ...monitorState,
    delta,
    currentActionId,
    nextState: toState && getInspectedState(toState.state, inspectedStatePath, false),
    action: getInspectedState(currentAction, inspectedActionPath, false),
    error
  };
}

function createThemeState(props) {
  const themes = { ...base16Themes, ...inspectorThemes };
  const base16Theme = getBase16Theme(props.theme, themes);
  const styling = createStylingFromTheme(props.theme, themes, props.isLightTheme);

  return { base16Theme, styling };
}

const DEFAULT_MONITOR_STATE = {
  isWideLayout: false,
  tab: 'Diff',
  tabIdx: 1,
  inspectedStatePath: [],
  inspectedActionPath: [],
  startActionId: null,
  selectedActionId: null
};

export default class DevtoolsInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeState: createThemeState(props),
      monitorState: createMonitorState(props, DEFAULT_MONITOR_STATE)
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    stagedActionIds: PropTypes.array,
    actionsById: PropTypes.object,
    currentStateIndex: PropTypes.number,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number
    }),
    preserveScrollTop: PropTypes.bool,
    stagedActions: PropTypes.array,
    select: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    supportImmutable: PropTypes.bool
  };

  static update = reducer;

  static defaultProps = {
    select: (state) => state,
    supportImmutable: false,
    theme: 'inspector',
    isLightTheme: true,
    shouldPersistState: true
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    this.updateSizeMode();
    this.updateSizeTimeout = window.setInterval(this.updateSizeMode.bind(this), 150);
  }

  componentWillUnmount() {
    window.clearTimeout(this.updateSizeTimeout);
  }

  updateMonitorState(monitorState) {
    this.setState({ monitorState: { ...this.state.monitorState, ...monitorState } }, () => {
      if (this.props.shouldPersistState) {
        this.props.dispatch(updateMonitorState(monitorState));
      }
    });
  }

  updateSizeMode() {
    const isWideLayout = this.refs.inspector.offsetWidth > 500;
    const { monitorState } = this.state;

    if (isWideLayout !== monitorState.isWideLayout) {
      this.updateMonitorState({ isWideLayout });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextMonitorState = nextProps.monitorState;
    const monitorState = this.props.monitorState;

    if (monitorState !== nextMonitorState) {
      this.setState({ monitorState: { ...this.state.monitorState, ...nextMonitorState } });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let nextMonitorState = nextState.monitorState;
    const monitorState = this.state.monitorState;

    if (
      getCurrentActionId(this.props, monitorState) !==
      getCurrentActionId(nextProps, nextMonitorState) ||
      monitorState.startActionId !== nextMonitorState.startActionId ||
      monitorState.inspectedStatePath !== nextMonitorState.inspectedStatePath ||
      monitorState.inspectedActionPath !== nextMonitorState.inspectedActionPath
    ) {

      nextMonitorState = createMonitorState(nextProps, nextMonitorState);

      this.updateMonitorState(nextMonitorState);
    }

    if (this.props.theme !== nextProps.theme ||
        this.props.isLightTheme !== nextProps.isLightTheme) {
      this.setState({ themeState: createThemeState(nextProps) });
    }
  }

  render() {
    const { stagedActionIds: actionIds, actionsById: actions, computedStates,
      customTabs, isLightTheme, skippedActionIds } = this.props;
    const { monitorState } = this.state;
    const { isWideLayout, selectedActionId, startActionId, nextState, action,
            searchValue, tab, tabIdx, delta, error } = monitorState;
    const inspectedPathType = tab === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';
    const { base16Theme, styling } = this.state.themeState;

    return (
      <div key='inspector'
           ref='inspector'
           {...styling(['inspector', isWideLayout && 'inspectorWide'], isWideLayout)}>
        <ActionList {...{
          actions, actionIds, isWideLayout, searchValue, selectedActionId, startActionId
        }}
                    styling={styling}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelectAction}
                    onToggleAction={this.handleToggleAction}
                    onCommit={this.handleCommit}
                    onSweep={this.handleSweep}
                    skippedActionIds={skippedActionIds}
                    lastActionId={getLastActionId(this.props)} />
        <ActionPreview {...{
          base16Theme, isLightTheme, customTabs, tab, tabIdx, delta, error, nextState,
          computedStates, action, actions, selectedActionId, startActionId
        }}
                       styling={styling}
                       onInspectPath={this.handleInspectPath.bind(this, inspectedPathType)}
                       inspectedPath={monitorState[inspectedPathType]}
                       onSelectTab={this.handleSelectTab} />
      </div>
    );
  }

  handleToggleAction = actionId => {
    this.props.dispatch(toggleAction(actionId));
  };

  handleCommit = () => {
    this.props.dispatch(commit());
  };

  handleSweep = () => {
    this.props.dispatch(sweep());
  };

  handleSearch = val => {
    this.updateMonitorState({ searchValue: val });
  };

  handleSelectAction = (e, actionId) => {
    const { monitorState } = this.state;
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

  handleInspectPath = (pathType, path) => {
    this.updateMonitorState({ [pathType]: path });
  };

  handleSelectTab = (tab, tabIdx) => {
    this.updateMonitorState({ tab, tabIdx });
  };
}
