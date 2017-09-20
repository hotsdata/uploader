import _ from 'lodash';
import ReplayService from './ReplayService';
import ReplayUploader from './ReplayUploader';
import ReplayLogger from './ReplayLogger';
import { newReplay, newReplays } from '../actions/replay_actions';

class ReplayScanner {
  constructor() {
    this.replayService = new ReplayService();
    this.replayUploader = new ReplayUploader();
  }

  scanReplays() {
    if (window.isScanning == true) { return }
    window.isScanning = true;

    // get replays
    let allReplays = this.replayService.listAllReplayFiles();

    // filter replay list too unlogged replaysn
    let newReplayFiles = _.take(window.replayLogger.filterNewReplays(allReplays), 20);

    // upload any new replays
    let newReplayChunks = _.chunk(newReplayFiles, 10);

    newReplayChunks.forEach((newReplayChunkFiles) => {
      // fire NEW_REPLAY
      // let action = newReplay(newReplayFile);
      let action = newReplays(newReplayChunkFiles);
      window.store.dispatch(action);

      // upload
      newReplayChunkFiles.forEach((newReplayFile) => {
        const uploadPromise = this.replayUploader.upload(newReplayFile);
      });

    });

    window.isScanning = false;
  }
}

export default ReplayScanner;
