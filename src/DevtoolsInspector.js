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

function getCurrentActionId(props) {
  const state = props.monitorState;
  const lastActionId = props.stagedActionIds[props.stagedActionIds.length - 1];
  return state.selectedActionId === null ? lastActionId : state.selectedActionId;
}

function createState(props) {
  const { supportImmutable, computedStates, stagedActionIds,
          actionsById: actions, monitorState: state } = props;
  const currentActionId = getCurrentActionId(props, state);
  const currentAction = actions[currentActionId] && actions[currentActionId].action;

  const actionIndex = stagedActionIds.indexOf(currentActionId);
  const fromState = actionIndex > 0 ? computedStates[actionIndex - 1] : null;
  const toState = computedStates[actionIndex];

  const fromInspectedState = fromState &&
    getInspectedState(fromState.state, state.inspectedStatePath, supportImmutable);
  const toInspectedState =
    toState && getInspectedState(toState.state, state.inspectedStatePath, supportImmutable);
  const delta = fromState && toState && DiffPatcher.diff(
    fromInspectedState,
    toInspectedState
  );

  return {
    delta,
    currentActionId,
    nextState: toState && getInspectedState(toState.state, state.inspectedStatePath, false),
    action: getInspectedState(currentAction, state.inspectedActionPath, false)
  };
}

function createThemeState(props) {
  const themes = { ...base16Themes, ...inspectorThemes };
  const base16Theme = getBase16Theme(props.theme, themes);
  const styling = createStylingFromTheme(props.theme, themes, props.isLightTheme);

  return { base16Theme, styling };
}

export default class DevtoolsInspector extends Component {
  state = {
    themeState: {}
  };

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
    isLightTheme: true
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentWillMount() {
    this.props.dispatch(updateMonitorState(createState(this.props)));
    this.setState({ themeState: createThemeState(this.props) });
  }

  componentDidMount() {
    this.updateSizeMode();
    this.updateSizeTimeout = window.setInterval(this.updateSizeMode.bind(this), 150);
  }

  componentWillUnmount() {
    window.clearTimeout(this.updateSizeTimeout);
  }

  updateSizeMode() {
    const isWideLayout = this.refs.inspector.offsetWidth > 500;
    if (isWideLayout !== this.props.monitorState.isWideLayout) {
      this.props.dispatch(updateMonitorState({ isWideLayout }));
    }
  }

  componentWillUpdate(nextProps) {
    let state = nextProps.monitorState;

    if (this.props.computedStates !== nextProps.computedStates ||
      getCurrentActionId(this.props) !== getCurrentActionId(nextProps) ||
      this.props.monitorState.inspectedStatePath !== nextProps.monitorState.inspectedStatePath ||
      this.props.monitorState.inspectedActionPath !== nextProps.monitorState.inspectedActionPath) {

      state = { ...state, ...createState(nextProps) };

      nextProps.dispatch(updateMonitorState(state));
    }

    if (this.props.theme !== nextProps.theme ||
        this.props.isLightTheme !== nextProps.isLightTheme) {
      this.setState({ themeState: createThemeState(nextProps) });
    }
  }

  render() {
    const { stagedActionIds: actionIds, actionsById: actions,
            monitorState, isLightTheme } = this.props;
    const { isWideLayout, selectedActionId, nextState, action,
            searchValue, tab, delta } = monitorState;
    const inspectedPathType = tab === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';
    const { base16Theme, styling } = this.state.themeState;

    return (
      <div key='inspector'
           ref='inspector'
           {...styling(['inspector', isWideLayout && 'inspectorWide'], isWideLayout)}>
        <ActionList {...{ actions, actionIds, isWideLayout, searchValue, selectedActionId }}
                    styling={styling}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelectAction} />
        <ActionPreview {...{ base16Theme, tab, delta, nextState, action, isLightTheme }}
                       styling={styling}
                       onInspectPath={this.handleInspectPath.bind(this, inspectedPathType)}
                       inspectedPath={monitorState[inspectedPathType]}
                       onSelectTab={this.handleSelectTab} />
      </div>
    );
  }

  handleSearch = val => {
    this.props.dispatch(updateMonitorState({ searchValue: val }));
  };

  handleSelectAction = actionId => {
    const { monitorState: { selectedActionId } } = this.props;

    this.props.dispatch(updateMonitorState({
      selectedActionId: actionId === selectedActionId ? null : actionId
    }));
  };

  handleInspectPath = (pathType, path) => {
    this.props.dispatch(updateMonitorState({ [pathType]: path }));
  };

  handleSelectTab = tab => {
    this.props.dispatch(updateMonitorState({ tab }));
  };
}
