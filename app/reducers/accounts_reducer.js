import { ACCOUNTS_FETCH } from '../actions/account_actions';

export default function(state = [], action) {
  switch (action.type) {
    case ACCOUNTS_FETCH:
      return action.payload;
    default:
      return state;
  }
}
