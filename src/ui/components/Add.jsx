import React, { Component } from 'react'
import { Link } from 'react-router'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

export default class Add extends Component {
  constructor() {
    super()
    this.state = {
      verify: 'empty',
      label: '',
      intro: '',
    }
  }
  handleAdd() {
    this.props.updateHome(this.state.label, this.state.intro)
    this.setState({
      verify: 'empty',
      label: '',
      intro: '',
    })
  }
  handleClose() {
    this.props.handleClose()
    this.setState({
      verify: 'empty',
      label: '',
      intro: '',
    })
  }
  handleChange1(e) {
    this.setState({
      label: e.target.value,
    })
    let same = false
    this.props.chipData.forEach((ele) => {
      same = ele.label === e.target.value ? true : same
    })
    if (e.target.value === '') {
      this.setState({
        verify: 'empty',
      })
    } else if (same) {
      this.setState({
        verify: false,
      })
    } else {
      this.setState({
        verify: true,
      })
    }
  }
  handleChange2(e) {
    this.setState({
      intro: e.target.value,
    })
  }
  render() {
    let errorText
    switch (this.state.verify) {
      case 'empty':
        errorText = '包名称不能为空'
        break
      case false:
        errorText = '该包已存在于项目中'
        break
      default:
    }
    const actions1 = [
      <FlatButton
        label="添加"
        icon={<AVAdd />}
        onTouchTap={() => this.handleAdd()}
        disabled={!!errorText}
        primary
      />,
      <Link to="/packages">
        <FlatButton
          label="取消"
          icon={<AVCancel />}
          onTouchTap={() => this.handleClose()}
          primary
        />
      </Link>,
    ]
    return (
      <Dialog
        title="请输入新增包的相关信息："
        open={this.props.dialog === 'new'}
        actions={actions1}
      >
        <div>
          <TextField
            hintText="注意不要和前面的包名称重复"
            floatingLabelText="包名称"
            value={this.state.label}
            errorText={errorText}
            onChange={(e) => this.handleChange1(e)}
          />
        </div>
        <div>
          <TextField
            hintText="请输入您对包的介绍"
            floatingLabelText="包介绍"
            value={this.state.intro}
            onChange={(e) => this.handleChange2(e)}
            multiLine
          />
        </div>
      </Dialog>
    )
  }
}

Add.propTypes = {
  updateHome: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  chipData: React.PropTypes.array,
  dialog: React.PropTypes.string,
}
