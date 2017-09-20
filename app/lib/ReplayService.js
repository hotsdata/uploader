import electron from 'electron';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const app = electron.app;
const LIBRARY_PATH = "/Library/Application Support";

class ReplayService {

  constructor() {
    this.platform = process.platform;
    this.accounts = [];
  }

  getHotsPath() {
    if (this.platform === 'darwin') {
      return this.getOSXHotsPath();
    } else if (this.platform == 'win32') {
      return this.getWindowsHotsPath();
    } else {
      return null;
    }
  }

  getOSXHotsPath() {
    return electron.remote.app.getPath("home") + LIBRARY_PATH + "/Blizzard/Heroes of the Storm/Accounts/";
  }

  getWindowsHotsPath() {
    var dir = electron.remote.app.getPath("documents");
    return dir + "/Heroes of the Storm/Accounts";
  }

  getAccountDirectories() {
    var filePath = this.getHotsPath();
    var files = fs.readdirSync(filePath);
    var accountDirectories = files.filter((file) => {
      return /^[0-9]*$/.test(file);
    });

    return accountDirectories;
  }

  getAccountReplayDirectories(accountId) {
    var filePath = path.join(this.getHotsPath(), accountId);
    var files = fs.readdirSync(filePath);
    var pattern = /\d\-Hero.*/;
    var accountReplayDirectories = files.filter((fname) => {
      return pattern.test(fname);
    });
    
    return accountReplayDirectories;
  }

  listAccounts() {
    var accounts = fs.readdirSync(this.getHotsPath());
    var accountIds = accounts.filter((account) => {
      return /^[0-9]*$/.test(account)
    });
    return accountIds.map((accountId) => {
      return { id: accountId }
    });
  }

  listReplayFiles(accountId) {
    if (accountId == null) {
      accountId = this.listAccounts()[0].id
    }

    var basePath = this.getHotsPath();
    var accountReplayDirectories = this.getAccountReplayDirectories(accountId)
    var replays = accountReplayDirectories.map((adir) => {
      var filePath = path.join(basePath, accountId);
      filePath = path.join(filePath, adir, "/Replays/Multiplayer");
      var files = fs.readdirSync(filePath);
      files = this.filterStormReplays(files);

      return files.map((file) => {
        return {
          filename: file,
          path: path.join(filePath, file),
          accountId: accountId,
          datetime: fs.statSync(filePath + "/" + file).mtime,
          stormlogs: {
            status: 'New'
          },
          hotslogs: {
            status: 'New'
          }
        };
      })
    });
    replays = [].concat.apply([], replays);
    return replays;
  }

  listAllReplayFiles() {
    var accounts = this.listAccounts();
    var allReplays = accounts.map((account) => {
      return this.listReplayFiles(account.id)
    })

    allReplays = _.flatten(allReplays);
    // return _.slice(allReplays, 0, 10);
    return allReplays;
  }

  getFileDetails(path) {

  }

  filterStormReplays(files) {
    return _.filter(files, (file) => _.includes(file, ".StormReplay"))
  }


}

export default ReplayService;
