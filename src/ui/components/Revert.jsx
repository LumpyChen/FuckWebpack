import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { toggleSnackRv } from '../actions/Snack'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AVRevert from 'material-ui/svg-icons/av/replay'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

const mapDispatchToProps = (dispatch => ({
  onUndo: () => dispatch(UndoActionCreators.undo()),
  push: url => dispatch(push(url)),
  toggleSnackRv: () => dispatch(toggleSnackRv()),
}))


class Revert extends Component {
  handleRevert() {
    this.props.toggleSnackRv()
    this.props.onUndo()
    this.props.push('/packages')
  }
  render() {
    const actions = [
      <FlatButton
        label="确认"
        onTouchTap={() => this.handleRevert()}
        icon={<AVRevert />}
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
        title="是否取消之前最近一次操作？"
        open
        actions={actions}
      />
    )
  }
}

Revert.propTypes = {
  canUndo: React.PropTypes.bool,
  push: React.PropTypes.func,
  onUndo: React.PropTypes.func,
  toggleSnackRv: React.PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Revert)
