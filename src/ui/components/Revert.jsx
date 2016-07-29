import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import AVRevert from 'material-ui/svg-icons/av/replay'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

const mapStateToProps = (() => ({
}))

const mapDispatchToProps = (dispatch => ({
  push: url => dispatch(push(url)),
}))

const Revert = () => {
  const actions = [
    <Link to="/packages">
      <FlatButton
        label="确认"
        icon={<AVRevert />}
        primary
      />
    </Link>,
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

Revert.propTypes = {
  dialog: React.PropTypes.string,
  handleClose: React.PropTypes.func,
  push: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Revert)
