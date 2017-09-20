import React from 'react';
import Header from './Header';
import ReplayService from '../lib/ReplayService';

class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <span>Replay Directory:</span>
        <br />
        <span>Accounts Found:</span>
      </div>
    );
  }

}

export default Settings;
