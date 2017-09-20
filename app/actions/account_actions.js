import ReplayService from '../lib/ReplayService';

export const ACCOUNTS_FETCH = 'ACCOUNTS_FETCH';

export function fetchAccounts() {
  var replayService = new ReplayService();
  var accounts = replayService.listAccounts()

  return {
    type: ACCOUNTS_FETCH,
    payload: accounts
  }
}
