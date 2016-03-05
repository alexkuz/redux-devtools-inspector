import 'babel-polyfill';
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

const options = {
  useExtension: window.location.search.indexOf('ext') !== -1,
  supportImmutable: window.location.search.indexOf('immutable') !== -1,
  theme: do {
    const match = window.location.search.match(/theme=([^&]+)/);
    match ? match[1] : undefined
  }
};

const useDevtoolsExtension =
  !!window.devToolsExtension && options.useExtension;

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible
               toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'
               supportImmutable={options.supportImmutable}>
    <DevtoolsInspector theme={options.theme} />
  </DockMonitor>
);

const enhancer = compose(
  applyMiddleware(createLogger()),
  useDevtoolsExtension ? window.devToolsExtension() : DevTools.instrument()
);

const store = createStore(reducers, {}, enhancer);

render(
  <Provider store={store}>
    <div>
      <DemoApp options={options} />
      {!useDevtoolsExtension && <DevTools />}
    </div>
  </Provider>,
  document.getElementById('root')
);
