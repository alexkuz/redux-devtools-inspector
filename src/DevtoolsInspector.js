import React, { Component, PropTypes } from 'react';
import themeable from './themeable';
import defaultTheme from './defaultTheme';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ActionList from './ActionList';
import ActionPreview from './ActionPreview';
import getInspectedState from './getInspectedState';
import DiffPatcher from './DiffPatcher';

function getCurrentActionId(props, state) {
  const lastActionId = props.stagedActionIds[props.stagedActionIds.length - 1];
  return state.selectedActionId === null ? lastActionId : state.selectedActionId;
}

export default class DevtoolsInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWideLayout: false,
      selectedActionId: null,
      inspectedPath: [],
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
    ])
  };

  static update = (s => s);

  static defaultProps = {
    theme: {},
    select: (state) => state
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

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
    const currentActionId = getCurrentActionId(nextProps, nextState);
    if (this.props.computedStates !== nextProps.computedStates ||
      getCurrentActionId(this.props, this.state) !== currentActionId ||
      this.state.inspectedPath !== nextState.inspectedPath) {
      const fromState = currentActionId > 0 ? nextProps.computedStates[currentActionId - 1] : null;
      const toState = nextProps.computedStates[currentActionId];

      const fromInspectedState = fromState &&
        getInspectedState(fromState.state, nextState.inspectedPath);
      const toInspectedState = getInspectedState(toState.state, nextState.inspectedPath);
      const delta = fromState && toState && DiffPatcher.diff(
        fromInspectedState,
        toInspectedState
      );

      this.setState({
        delta,
        currentActionId,
        nextState: toInspectedState
      })
    }
  }

  render() {
    const { theme, stagedActionIds: actionIds, actionsById: actions } = this.props;
    const { isWideLayout, selectedActionId, inspectedPath, nextState,
            searchValue, tab, delta } = this.state;
    const createTheme = themeable({ ...theme, ...defaultTheme });

    return (
      <div key='inspector'
           {...createTheme('inspector', isWideLayout && 'inspectorWide')}
           ref='inspector'>
        <ActionList {...{ theme, defaultTheme, actions, actionIds, isWideLayout, searchValue }}
                    selectedActionId={selectedActionId}
                    onSearch={val => this.setState({ searchValue: val })}
                    onSelect={actionId => this.setState({
                      selectedActionId: actionId === selectedActionId ? null : actionId
                    })} />
        <ActionPreview {...{ theme, defaultTheme, tab }}
                       delta={delta}
                       nextState={nextState}
                       onInspectPath={(path) => this.setState({ inspectedPath: path })}
                       inspectedPath={inspectedPath}
                       onSelectTab={tab => this.setState({ tab })} />
      </div>
    );
  }
}
