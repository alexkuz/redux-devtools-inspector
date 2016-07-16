import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import DemoApp from './DemoApp';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createDevTools } from 'redux-devtools';
import DevtoolsInspector from '../../../src/DevtoolsInspector';
import DockMonitor from 'redux-devtools-dock-monitor';
import getOptions from './getOptions';

const CustomComponent = () =>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '20rem'
  }}>
    <div>Custom Tab Content</div>
  </div>;

const getDevTools = options =>
  createDevTools(
    <DockMonitor defaultIsVisible
                 toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 changeMonitorKey='ctrl-m'>
      <DevtoolsInspector theme={options.theme}
                         isLightTheme={!options.dark}
                         supportImmutable={options.supportImmutable}
                         tabs={defaultTabs => [{
                           name: 'Custom Tab',
                           component: CustomComponent
                         }, ...defaultTabs]} />
    </DockMonitor>
  );

const ROOT = process.env.NODE_ENV === 'production' ? '/redux-devtools-inspector/' : '/';

let DevTools = getDevTools(getOptions());

const reduxRouterMiddleware = routerMiddleware(browserHistory);

const enhancer = compose(
  applyMiddleware(createLogger(), reduxRouterMiddleware),
  (...args) => {
    const useDevtoolsExtension = !!window.devToolsExtension && getOptions().useExtension;
    const instrument = useDevtoolsExtension ?
      window.devToolsExtension() : DevTools.instrument();
    return instrument(...args);
  }
);

const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer
}), {}, enhancer);

const history = syncHistoryWithStore(browserHistory, store);

const handleRouterUpdate = () => {
  renderApp(getOptions());
};

const router = (
  <Router history={history} onUpdate={handleRouterUpdate}>
    <Route path={ROOT}
           component={DemoApp} />
  </Router>
);

const renderApp = options => {
  DevTools = getDevTools(options);
  const useDevtoolsExtension = !!window.devToolsExtension && options.useExtension;

  return render(
    <Provider store={store}>
      <div>
        {router}
        {!useDevtoolsExtension && <DevTools />}
      </div>
    </Provider>,
    document.getElementById('root')
  );
}

renderApp(getOptions());
