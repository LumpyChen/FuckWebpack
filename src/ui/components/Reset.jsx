import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { toggleSnackRs } from '../actions/Snack'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AVReset from 'material-ui/svg-icons/av/loop'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

const mapDispatchToProps = (dispatch => ({
  push: url => dispatch(push(url)),
  reset: () => dispatch({ type: 'RESET_DATA' }),
  toggleSnackRs: () => dispatch(toggleSnackRs()),
}))

class Revert extends Component {
  handleReset() {
    this.props.reset()
    this.props.toggleSnackRs()
    this.props.push('/packages')
  }
  render() {
    const actions = [
      <FlatButton
        label="确认"
        onTouchTap={() => this.handleReset()}
        icon={<AVReset />}
        primary
      />,
      <Link to="/packages">
        <FlatButton
          label="取消"
          icon={<AVCancel />}
          primary
        />
      </Link>,
    ]
    return (
      <Dialog
        title="是否重置当前包的内容？"
        open
        actions={actions}
      />
    )
  }
}

Revert.propTypes = {
  push: React.PropTypes.func,
  reset: React.PropTypes.func,
  toggleSnackRs: React.PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Revert)
