import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { addPackage } from '../actions/ChipData'
import { changeIntro, changeLabel, verifyLabel, setEmpty } from '../actions/NewPackage'
import { toggleSnackAdd } from '../actions/Snack'


import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVCancel from 'material-ui/svg-icons/av/not-interested'

const mapStateToProps = ({ verify, label, intro, chipData }) => ({
  verify,
  label,
  intro,
  chipData: chipData.present,
})

const mapDispatchToProps = dispatch => ({
  pushHome: () => dispatch(push('/')),
  addPackage: data => dispatch(addPackage(data)),
  changeLabel: label => dispatch(changeLabel(label)),
  changeIntro: intro => dispatch(changeIntro(intro)),
  verifyLabel: (label, chipData) => dispatch(verifyLabel(label, chipData)),
  setEmpty: () => dispatch(setEmpty()),
  toggleSnackAdd: () => dispatch(toggleSnackAdd()),
})

class Add extends Component {
  componentWillUnmount() {
    this.props.changeLabel('')
    this.props.changeIntro('')
    this.props.setEmpty()
  }
  handleChangeLabel(e) {
    this.props.changeLabel(e.target.value)
    this.props.verifyLabel(e.target.value, this.props.chipData)
  }
  handleChangeIntro(e) {
    this.props.changeIntro(e.target.value)
  }
  handleAdd() {
    this.props.toggleSnackAdd()
    this.props.addPackage({
      label: this.props.label,
      intro: this.props.intro,
    })
    this.props.pushHome()
  }
  render() {
    let errorText
    switch (this.props.verify) {
      case 'empty':
        errorText = '包名称不能为空'
        break
      case 'same':
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
          primary
        />
      </Link>,
    ]
    return (
      <Dialog
        title="请输入新增包的相关信息："
        actions={actions1}
        open
      >
        <div>
          <TextField
            hintText="注意不要和前面的包名称重复"
            floatingLabelText="包名称"
            value={this.props.label}
            errorText={errorText}
            onChange={(e) => this.handleChangeLabel(e)}
          />
        </div>
        <div>
          <TextField
            hintText="请输入您对包的介绍"
            floatingLabelText="包介绍"
            value={this.props.intro}
            onChange={(e) => this.handleChangeIntro(e)}
            multiLine
          />
        </div>
      </Dialog>
    )
  }
}

Add.propTypes = {
  chipData: React.PropTypes.array,
  label: React.PropTypes.string,
  intro: React.PropTypes.string,
  verify: React.PropTypes.string,
  pushHome: React.PropTypes.func,
  addPackage: React.PropTypes.func,
  changeLabel: React.PropTypes.func,
  changeIntro: React.PropTypes.func,
  verifyLabel: React.PropTypes.func,
  setEmpty: React.PropTypes.func,
  toggleSnackAdd: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)
