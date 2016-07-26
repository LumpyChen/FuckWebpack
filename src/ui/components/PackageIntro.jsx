import React, { Component } from 'react'
import Close from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'


export default class PackageIntro extends Component {
  render() {
    return (
      <Dialog
        title={this.props.intro}
        model={false}
        open={this.props.dialog}
        actions={
          <FlatButton
            label="关闭"
            onTouchTap={() => this.props.close()}
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
  dialog: React.PropTypes.bool,
  close: React.PropTypes.func,
}
