import ReplayService from '../lib/ReplayService';
import { HOTSDATA, HOTSLOGS } from '../lib/ReplayUploader';

export const NEW_REPLAY = 'NEW_REPLAY';
export const NEW_REPLAYS = 'NEW_REPLAYS';
export const UPDATE_REPLAY_UPLOAD_STATUS = 'REPLAY_UPLOAD_STATUS';
export const UPDATE_REPLAY_UPLOAD_STATUSES = 'UPDATE_REPLAY_UPLOAD_STATUSES';
export const FETCH_REPLAYS = 'FETCH_REPLAYS';

export function newReplay(file) {
  return {
    type: NEW_REPLAY,
    payload: file
  }
}

export function newReplays(files) {
  return {
    type: NEW_REPLAYS,
    payload: files
  }
}

export function updateReplayUploadStatus(file, site, status) {
  switch (site) {
    case HOTSDATA:
      file.stormlogs.status = status;
      break;
    case HOTSLOGS:
      file.hotslogs.status = status;
      break;
    default:
      console.log('hmmmm', site);
  }
  return {
    type: UPDATE_REPLAY_UPLOAD_STATUS,
    payload: file
  }
}

export function fetchReplays(accountId = null) {
  var replayService = new ReplayService();
  var replays = replayService.listReplayFiles(accountId);

  return {
    type: FETCH_REPLAYS,
    payload: replays
  }
}
