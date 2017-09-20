import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAccounts } from '../actions/account_actions';


class AccountSelector extends Component {
  constructor(props) {
    super(props)

    this.props.fetchAccounts();
  }

  render() {
    let options = this.props.accounts.map((account) => {
      return (<option key={account.id}>{account.id}</option>);
    })

    return (
      <div>
        <select>
          {options}
        </select>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAccounts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);
