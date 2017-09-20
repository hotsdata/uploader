import needle from 'needle';
import fs from 'fs';
import redux from 'redux';
import { updateReplayUploadStatus } from '../actions/replay_actions';
import ReplayLogger from './ReplayLogger';

export const HOTSDATA = 'HOTSDATA';
export const HOTSLOGS = 'HOTSLOGS';
const HOTSDATA_UPLOAD_URL = 'http://api.hotsdata.com/upload';
const HOTSLOGS_UPLOAD_URL = 'https://www.hotslogs.com/FileUploadHandler.ashx?type=rau';

class ReplayUploader {
  constructor() {
    this.store = store;
  }

  async upload(file) {
    await this.uploadToStormLogs(file)
    // await this.uploadToHotsLogs(file)
    window.replayLogger.addFileToLog(file);
  }

  async uploadToStormLogs(file) {
    var buffer = fs.readFileSync(file.path);
    var data = {
      replay: {
        buffer: buffer,
        filename: file.filename,
        content_type: 'application/octet-stream'
      }
    }

    needle.post(HOTSDATA_UPLOAD_URL, data, { multipart: true }, (err, resp, body) => {
      if (err != undefined) {
        console.log("HotsData upload error", err);
        let action = updateReplayUploadStatus(file, HOTSDATA, 'Failed');
        this.store.dispatch(action);
      } else {
        if (resp.statusCode == 200) {
          let action = updateReplayUploadStatus(file, HOTSDATA, 'Uploaded');
          this.store.dispatch(action);
        } else {
          let action = updateReplayUploadStatus(file, HOTSDATA, 'Failed');
          this.store.dispatch(action);
        }
      }
    });
  }

  async uploadToHotsLogs(file) {
    // Don't do this twice! Pass it in?
    let buffer = fs.readFileSync(file.path);
    let data = {
      file: {
        buffer: buffer,
        filename: "blob",
        content_type: 'application/octet-stream' },
      fileName: file.filename,
    }

    needle.post(HOTSLOGS_UPLOAD_URL, data, { multipart: true}, (err, resp, body) => {
      if (err != undefined) {
        console.log("hotslogs upload error", err);
        let action = updateReplayUploadStatus(file, HOTSLOGS, 'Failed');
        this.store.dispatch(action);
      } else {
        if (resp.statusCode == 200) {
          let action = updateReplayUploadStatus(file, HOTSLOGS, 'Uploaded');
          this.store.dispatch(action);
        } else {
          let action = updateReplayUploadStatus(file, HOTSLOGS, 'Failed');
          this.store.dispatch(action);
        }
      }

    });
  }

}

export default ReplayUploader
