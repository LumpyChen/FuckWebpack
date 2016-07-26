import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVRevert from 'material-ui/svg-icons/av/replay'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

export default class AddNRevert extends Component {
  constructor() {
    super()
    this.state = {
      dialog: 0,
      verify: 'empty',
      label: '',
      intro: '',
      open: false,
    }
  }
  handleAdd() {
    this.props.updateHome(this.state.label, this.state.intro)
    this.setState({
      dialog: 0,
      verify: 'empty',
      label: '',
      intro: '',
      open: true,
    })
  }
  handleClose() {
    this.setState({
      dialog: 0,
      verify: 'empty',
      label: '',
      intro: '',
    })
  }
  handleTap(key) {
    this.setState({
      dialog: key,
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
  handleRequestClose() {
    this.setState({
      open: false,
    })
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
      <FlatButton
        label="取消"
        icon={<AVCancel />}
        onTouchTap={() => this.handleClose()}
        primary
      />,
    ]
    const actions2 = [
      <FlatButton
        label="确认"
        icon={<AVRevert />}
        onTouchTap={() => this.handleClose()}
        primary
      />,
      <FlatButton
        label="取消"
        icon={<AVCancel />}
        onTouchTap={() => this.handleClose()}
        primary
      />,
    ]
    return (
      <div>
        <FlatButton
          label="添加包"
          icon={<AVAdd />}
          onTouchTap={() => this.handleTap(1)}
          primary
        />
        <FlatButton
          label="撤销修改"
          icon={<AVRevert />}
          onTouchTap={() => this.handleTap(2)}
          primary
        />
        <Dialog
          title="请输入新增包的相关信息："
          open={this.state.dialog === 1}
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
        <Dialog
          title="是否取消之前最近一次操作？"
          open={this.state.dialog === 2}
          actions={actions2}
        />
        <Snackbar
          message="包已被添加到项目中"
          autoHideDuration={2000}
          onRequestClose={() => this.handleRequestClose()}
          open={this.state.open}
        />
      </div>
    )
  }
}

AddNRevert.propTypes = {
  updateHome: React.PropTypes.func,
  chipData: React.PropTypes.array,
  label: React.PropTypes.string,
  intro: React.PropTypes.string,
}
