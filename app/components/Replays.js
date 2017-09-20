// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import AccountSelector from './AccountSelector';
import ReplayService from '../lib/ReplayService';
import ReplayList from './ReplayList';
import ReplayUploader from '../lib/ReplayUploader';
import ReplayScanner from '../lib/ReplayScanner';

import styles from './Home.css';

class Replays extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAccountId: null
    }
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div>
            <div className="replay-list">
              <ReplayList accountId={this.selectedAccountId} replays={this.props.replays} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    replays: state.replays
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchReplays }, dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Replays);
export default connect(mapStateToProps)(Replays);
