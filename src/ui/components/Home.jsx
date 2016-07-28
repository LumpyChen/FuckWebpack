import React, { Component } from 'react'
import { Link } from 'react-router'

import Chip from 'material-ui/Chip'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import { CardActions, CardHeader, CardText } from 'material-ui/Card'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVRevert from 'material-ui/svg-icons/av/replay'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      dialog: '',
      intro: '',
      chipData: [
        { key: 0, label: 'ImmutableJS', intro: '1' },
        { key: 1, label: 'Material-UI', intro: '2' },
        { key: 2, label: 'Radium', intro: '3' },
        { key: 3, label: 'ReactJS', intro: '4' },
        { key: 4, label: 'ReactDOM', intro: '5' },
        { key: 5, label: 'React-Router', intro: '6' },
        { key: 6, label: 'React-Redux/Redux', intro: '7' },
        { key: 7, label: 'React-Router-Redux', intro: '8' },
        { key: 8, label: 'Redux-Saga', intro: '9' },
        { key: 9, label: 'redux-undo', intro: '9' },
      ],
      openAdd: false,
      openDel: false,
      openRevert: false,
      delPackage: null,
    }
  }
  componentWillMount() {
    if (this.getSelectedIndex()) {
      if (this.getSelectedIndex() === 'new') {
        this.setState({ dialog: 'new' })
      } else if (this.getSelectedIndex() === 'revert') {
        this.setState({ dialog: 'revert' })
      } else if (typeof this.getSelectedIndex() === 'number') {
        this.setState({
          dialog: 'chip',
          intro: this.state.chipData[this.getSelectedIndex()].intro,
        })
      }
    }
  }
  componentWillReceiveProps() {
    if (this.getSelectedIndex()) {
      if (this.getSelectedIndex() === 'new') {
        this.setState({ dialog: 'new' })
      } else if (this.getSelectedIndex() === 'revert') {
        this.setState({ dialog: 'revert' })
      } else if (typeof this.getSelectedIndex() === 'number') {
        this.setState({
          dialog: 'chip',
          intro: this.state.chipData[this.getSelectedIndex()].intro,
        })
      }
    }
  }
  getSelectedIndex() {
    let out
    this.state.chipData.forEach((ele, i) => {
      if (this.context.router.isActive(`/packages/${ele.label}`, true)) {
        out = i
      }
    })
    if (this.context.router.isActive('revert')) {
      out = 'revert'
    } else if (this.context.router.isActive('new')) {
      out = 'new'
    }
    return out
  }
  handleClose() {
    this.setState({
      dialog: '',
      intro: '',
    })
  }
  handleUpdate(label, intro) {
    const chipData = this.state.chipData
    chipData.push({
      key: chipData[chipData.length - 1].key + 1,
      label,
      intro: intro || '不存在对该包的描述。',
    })
    this.setState({
      chipData,
      dialog: '',
      openAdd: true,
    })
    this.context.router.push('/')
  }
  handleDel(key) {
    const newChipData = this.state.chipData
    newChipData.splice(key, 1)
    newChipData.map((chip, i) => {
      chip.key = i
      return chip
    })
    this.setState({
      chipData: newChipData,
      openDel: true,
    })
  }
  handleRequestClose() {
    this.setState({
      openAdd: false,
      openDel: false,
      openRevert: false,
    })
  }
  handleTap(key) {
    const display = this.state.chipData[key].label.split('/').reduce((p, c) => (`${p}\\${c}`))
    this.context.router.push(`/packages/${display}`)
    this.setState({
      intro: this.state.chipData.filter((item) => (item.key === key))[0].intro,
      dialog: 'chip',
    })
  }
  handleOpen(str) {
    this.setState({
      dialog: str,
    })
  }
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleDel(data.key)}
        onTouchTap={() => this.handleTap(data.key)}
      >
        {data.label}
      </Chip>
    )
  }
  render() {
    let children
    if (this.props.children) {
      children =
          React.cloneElement(this.props.children, {
            intro: this.state.intro,
            dialog: this.state.dialog,
            handleClose: () => this.handleClose(),
            chipData: this.state.chipData,
            updateHome: (label, intro) => this.handleUpdate(label, intro),
          })
    }
    return (
      <div>
        <CardHeader
          title="查看本应用采用了那些包："
        />
        <CardText>
          {this.state.chipData.map(this.renderChip, this)}
        </CardText>
        <CardActions>
          <Link to="/new">
            <FlatButton
              label="添加包"
              icon={<AVAdd />}
              onTouchTap={() => this.handleOpen('new')}
              primary
            />
          </Link>
          <Link to="/revert">
            <FlatButton
              label="撤销修改"
              icon={<AVRevert />}
              onTouchTap={() => this.handleOpen('revert')}
              primary
            />
          </Link>
        </CardActions>
        {children}
        <Snackbar
          message="包已经被从项目中删除"
          autoHideDuration={2000}
          onRequestClose={() => this.handleRequestClose()}
          open={this.state.openDel}
        />
        <Snackbar
          message="包已被添加到项目中"
          autoHideDuration={2000}
          onRequestClose={() => this.handleRequestClose()}
          open={this.state.openAdd}
        />
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

Home.propTypes = {
  children: React.PropTypes.node,
}

export default Home
