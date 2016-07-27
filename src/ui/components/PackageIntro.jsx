import React, { Component } from 'react'
import Close from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'


export default class PackageIntro extends Component {
  // prevent from error of eslint airbib
  // must be written in class
  getLabel() {
    return '关闭'
  }
  render() {
    return (
      <Dialog
        title={this.props.intro}
        model={false}
        open={!!this.props.dialog}
        actions={
          <FlatButton
            label={this.getLabel()}
            onTouchTap={() => this.props.handleClose()}
            icon={<Close />}
            primary
          />
        }
      />
    )
  }
}

PackageIntro.propTypes = {
  intro: React.PropTypes.string,
  dialog: React.PropTypes.string,
  handleClose: React.PropTypes.func,
}
