import React from 'react';
import moment from 'moment';

function statusColor(status) {
  switch (status) {
    case 'Uploaded':
        return 'green';
    case 'Failed':
      return 'red';
    default:
      return 'yellow';

  }
}

const ReplayRow = ({replay}) => {
    return (
      <tr>
        <td>{replay.filename}</td>
        <td>{moment(replay.datetime).format('llll')}</td>
        <td style={{fontWeight: "bold", color: (statusColor(replay.stormlogs.status))}}>{replay.stormlogs.status}</td>
      </tr>
    );
}

export default ReplayRow;
