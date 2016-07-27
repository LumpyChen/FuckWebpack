import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AVRevert from 'material-ui/svg-icons/av/replay'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

export default class Revert extends Component {
  handleTap() {
    this.setState({
      dialog: true,
    })
  }
  render() {
    const actions2 = [
      <FlatButton
        label="确认"
        icon={<AVRevert />}
        onTouchTap={() => this.props.handleClose()}
        primary
      />,
      <FlatButton
        label="取消"
        icon={<AVCancel />}
        onTouchTap={() => this.props.handleClose()}
        primary
      />,
    ]
    return (
      <Dialog
        title="是否取消之前最近一次操作？"
        open={this.props.dialog === 'revert'}
        actions={actions2}
      />
    )
  }
}

Revert.propTypes = {
  dialog: React.PropTypes.string,
  handleClose: React.PropTypes.func,
}
