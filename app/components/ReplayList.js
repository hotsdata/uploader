import React, { Component } from 'react';
import _ from 'lodash';
import ReplayRow from './ReplayRow';

class ReplayList extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    if (!this.props.replays) { return <div>Loading...</div>; }

    let replayRows = _.sortBy(this.props.replays, (replay) => {
      return -replay.datetime;
    }).map((replay, i) => {
      return <ReplayRow key={i} replay={replay} />;
    });

    return (
      <div>
        <table className="table">
          <caption>Uploads({this.props.replays.length})</caption>
          <thead>
            <tr>
              <th>File</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {replayRows}
          </tbody>
        </table>
      </div>
    );
  }

}

export default ReplayList;
