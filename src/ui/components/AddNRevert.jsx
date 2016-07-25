import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVRevert from 'material-ui/svg-icons/av/replay'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

export default class AddNRevert extends Component {
  constructor() {
    super()
    this.state = {
      dialog: 0,
      label: '',
      intro: '',
      verify: false,
    }
    this.handleAdd = () => {
      this.props.updateHome(this.state.label, this.state.intro)
      this.setState({
        dialog: 0,
        verify: false,
      })
    }
    this.handleClose = () => {
      this.setState({
        dialog: 0,
        verify: false,
      })
    }
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
    this.props.chipData.forEach((chip) => {
      if (chip.label === e.target.value) {
        same = true
      }
    })
    console.log(same)
    if (this.state.label === '' || same) {
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
    const actions1 = [
      <FlatButton
        label="添加"
        icon={<AVAdd />}
        onTouchTap={this.handleAdd}
        disabled={!this.state.verify}
        primary
      />,
      <FlatButton
        label="取消"
        icon={<AVCancel />}
        onTouchTap={this.handleClose}
        primary
      />,
    ]
    const actions2 = [
      <FlatButton
        label="确认"
        icon={<AVRevert />}
        onTouchTap={this.handleClose}
        primary
      />,
      <FlatButton
        label="取消"
        icon={<AVCancel />}
        onTouchTap={this.handleClose}
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
              errorText={this.state.verify ? null : '包名称错误'}
              onChange={(e) => this.handleChange1(e)}
            />
          </div>
          <div>
            <TextField
              hintText="请输入您对包的介绍"
              floatingLabelText="包介绍"
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
      </div>
    )
  }
}

AddNRevert.propTypes = {
  updateHome: React.PropTypes.func,
  chipData: React.PropTypes.array,
}
