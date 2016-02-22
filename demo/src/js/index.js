import React from 'react';
import { render } from 'react-dom';
import DemoApp from './DemoApp';
import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import DevtoolsInspector from '../../../src/DevtoolsInspector';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import DockMonitor from 'redux-devtools-dock-monitor';
import createLogger from 'redux-logger';

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible
               toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'>
    <DevtoolsInspector />
  </DockMonitor>
);

const enhancer = compose(
  applyMiddleware(createLogger()),
  DevTools.instrument()
);

const store = createStore(reducers, {}, enhancer);

render(
  <Provider store={store}>
    <div>
      <DemoApp />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
