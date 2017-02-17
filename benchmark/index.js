const Benchmark = require('benchmark');
require('./jsdom');
const createElement = require('react').createElement;
const render = require('react-test-renderer').create;
const Component = require('../lib').default;

const state = {
  actionsById: {},
  computedStates: [],
  currentStateIndex: -1,
  nextActionId: 0,
  skippedActionIds: [],
  stagedActionIds: [],
  monitorState: {
    selectedActionId: null,
    startActionId: null,
    inspectedActionPath: [],
    inspectedStatePath: [],
    tabName: 'Diff'
  }
};

function addNewAction() {
  const nextId = state.nextActionId;
  state.stagedActionIds = state.stagedActionIds.concat(nextId);
  state.actionsById = Object.assign(state.actionsById,
    { [nextId]: { action: { type: 'ACTION' }, timestamp: 1 } }
  );
  state.computedStates = state.computedStates.concat({ state: {} });
  state.currentStateIndex++;
  state.nextActionId++;
}

const instance = render(createElement(Component, state));

const suite = new Benchmark.Suite;
suite.add(function() {
  addNewAction();
  instance.update(createElement(Component, state));
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });
