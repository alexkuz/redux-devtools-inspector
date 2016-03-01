import React, { Component, PropTypes } from 'react';
import themeable from './themeable';
import defaultTheme from './defaultTheme';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ActionList from './ActionList';
import ActionPreview from './ActionPreview';

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

  render() {
    const { theme, stagedActionIds: actionIds, actionsById: actions, computedStates } = this.props;
    const { isWideLayout, selectedActionId, inspectedPath, searchValue, tab } = this.state;
    const createTheme = themeable({ ...theme, ...defaultTheme });
    const lastActionId = actionIds[actionIds.length - 1];
    const currentActionId = selectedActionId === null ? lastActionId : selectedActionId;

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
                       fromState={currentActionId > 0 ?
                         computedStates[currentActionId - 1] : null
                       }
                       toState={computedStates[currentActionId]}
                       onInspectPath={(path) => this.setState({ inspectedPath: path })}
                       inspectedPath={inspectedPath}
                       onSelectTab={tab => this.setState({ tab })}
                       action={actions[currentActionId].action} />
      </div>
    );
  }
}
