import fs from 'fs';
import os from 'os';
import touch from 'touch';
import JFile from 'jfile';
import _ from 'lodash';
import ReplayService from './ReplayService';

const LOG_FILE_NAME = "hotsdata_uploader_log.txt";

class ReplayLogger {
  constructor() {
    this.logFile = new ReplayService().getHotsPath() + LOG_FILE_NAME;
    touch(this.logFile);
    window.loggedReplays = [];
    this.loadLoggedReplays();
  }

  loadLoggedReplays() {
    let buffer = fs.readFileSync(this.logFile);
    let fileNames = _.split(buffer, os.EOL);

    window.loggedReplays = fileNames;
  }

  isLogged(file) {
    // let fHandle = new JFile(this.logFile);
    // let result = fHandle.grep(file.path);
    //
    // return _.includes(result, file.path);

    return _.includes(window.loggedReplays, file.path);
  }

  filterNewReplays(replays) {
    let newReplays = replays.filter((replay) => {
      return this.isLogged(replay) == false
    })

    return newReplays;
  }

  addFileToLog(file) {
    window.loggedReplays.push(file.path);
    fs.appendFileSync(this.logFile, (file.path + os.EOL));
  }
}

export default ReplayLogger;
