import React, { Component } from 'react'
import Chip from 'material-ui/Chip'
import Snackbar from 'material-ui/Snackbar'
import { CardActions, CardHeader, CardText } from 'material-ui/Card'

import AddNRevert from './AddNRevert.jsx'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      dialog: false,
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
      ],
      open: false,
      delPackage: null,
    }
    this.handleClose = () => {
      this.setState({
        dialog: false,
        intro: '',
      })
      this.context.router.push('/comment')
    }
    this.handleUpdate = (label, intro) => {
      const chipData = this.state.chipData
      chipData.push({
        key: chipData[chipData.length - 1].key + 1,
        label,
        intro,
      })
      this.setState({
        chipData,
      })
    }
  }
  handleDel(key) {
    this.chipData = this.state.chipData
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key)
    this.chipData.splice(chipToDelete, 1)
    this.setState({
      chipData: this.chipData,
      open: true,
    })
  }
  handleRequestClose() {
    this.setState({
      open: false,
    })
  }
  handleTap(key) {
    // const chipToDisplay = this.state.chipData.map((chip) => chip.key).indexOf(key)
    const display = this.state.chipData[key].label.split('/').reduce((p, c) => (`${p}\\${c}`))
    console.log(display)
    this.context.router.push(`/package/${display}`)
    this.setState({
      intro: this.state.chipData[key].intro,
      dialog: true,
    })
  }
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleDel(data.key)}
        onTouchTap={() => this.handleTap(data.key)}
        ref={data.key}
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
            close: () => this.handleClose(),
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
          <AddNRevert
            chipData={this.state.chipData}
            updateHome={(label, intro) => this.handleUpdate(label, intro)}
          />
        </CardActions>
        {children}
        <Snackbar
          message="包已经被从项目中删除"
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
          open={this.state.open}
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
