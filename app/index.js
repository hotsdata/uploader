import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.scss';
import ReplayScanner from './lib/ReplayScanner';
import ReplayLogger from './lib/ReplayLogger';

const store = configureStore();
window.store = store;
const history = syncHistoryWithStore(hashHistory, store);
const replayScanner = new ReplayScanner();
const replayLogger = new ReplayLogger();
window.replayLogger = replayLogger;

window.isScanning = false;

window.scannerId = window.setInterval(() => {
  replayScanner.scanReplays();
}, 60000);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
