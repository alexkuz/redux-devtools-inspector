import React, { Component, PropTypes } from 'react';
import themeable from './themeable';
import createDefaultTheme from './createDefaultTheme';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ActionList from './ActionList';
import ActionPreview from './ActionPreview';
import getInspectedState from './getInspectedState';
import DiffPatcher from './DiffPatcher';
import getBase16Theme from './getBase16Theme';

function getCurrentActionId(props, state) {
  const lastActionId = props.stagedActionIds[props.stagedActionIds.length - 1];
  return state.selectedActionId === null ? lastActionId : state.selectedActionId;
}

function createState(props, state) {
  const { supportImmutable, computedStates, actionsById: actions } = props;
  const currentActionId = getCurrentActionId(props, state);
  const currentAction = actions[currentActionId] && actions[currentActionId].action;

  const fromState = currentActionId > 0 ? computedStates[currentActionId - 1] : null;
  const toState = computedStates[currentActionId];

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

export default class DevtoolsInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWideLayout: false,
      selectedActionId: null,
      inspectedActionPath: [],
      inspectedStatePath: [],
      tab: 'Diff'
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

  static update = (s => s);

  static defaultProps = {
    theme: {},
    select: (state) => state,
    supportImmutable: false
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentWillMount() {
    this.setState(createState(this.props, this.state));
  }

  componentDidMount() {
    this.updateSizeTimeout = window.setInterval(() => this.updateSizeMode(), 150);
  }

  componentWillUnmount() {
    window.clearTimeout(this.updateSizeTimeout);
  }

  updateSizeMode() {
    this.setState({
      isWideLayout: this.refs.inspector.offsetWidth > 500
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.computedStates !== nextProps.computedStates ||
      getCurrentActionId(this.props, this.state) !== getCurrentActionId(nextProps, nextState) ||
      this.state.inspectedStatePath !== nextState.inspectedStatePath ||
      this.state.inspectedActionPath !== nextState.inspectedActionPath) {

      this.setState(createState(nextProps, nextState));
    }
  }

  render() {
    const { theme, stagedActionIds: actionIds, actionsById: actions } = this.props;
    const { isWideLayout, selectedActionId, nextState, action,
            searchValue, tab, delta } = this.state;
    const base16Theme = getBase16Theme(theme);
    const inspectorTheme = { ...createDefaultTheme(base16Theme), ...(base16Theme ? {} : theme) };
    const createTheme = themeable(inspectorTheme);
    const inspectedPathType = tab === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';

    return (
      <div key='inspector'
           {...createTheme('inspector', isWideLayout && 'inspectorWide')}
           ref='inspector'>
        <ActionList {...{ actions, actionIds, isWideLayout, searchValue, selectedActionId }}
                    theme={inspectorTheme}
                    onSearch={val => this.setState({ searchValue: val })}
                    onSelect={actionId => this.setState({
                      selectedActionId: actionId === selectedActionId ? null : actionId
                    })} />
        <ActionPreview {...{ base16Theme, tab, delta, nextState, action }}
                       theme={inspectorTheme}
                       onInspectPath={(path) => this.setState({ [inspectedPathType]: path })}
                       inspectedPath={this.state[inspectedPathType]}
                       onSelectTab={tab => this.setState({ tab })} />
      </div>
    );
  }
}
