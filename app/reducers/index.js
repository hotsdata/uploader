// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ReplayReducer from './replays_reducer';
import AccountsReducer from './accounts_reducer';

const rootReducer = combineReducers({
  replays: ReplayReducer,
  accounts: AccountsReducer,
  routing: routing
});

export default rootReducer;
