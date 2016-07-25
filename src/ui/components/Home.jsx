import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import Close from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

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
    }
    this.handleClose = () => {
      this.setState({
        dialog: false,
        intro: '',
      })
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
    this.setState({ chipData: this.chipData })
  }
  handleTap(key) {
    const chipToDisplay = this.state.chipData.map((chip) => chip.key).indexOf(key)
    this.setState({
      intro: this.state.chipData[chipToDisplay].intro,
      dialog: true,
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
    const expand = true
    return (<div>
      <Card>
        <AppBar
          title="这是Lumpy的脚手架，一个简单的模板"
          iconElementLeft={<IconButton><ActionBuild /></IconButton>}
          iconElementRight={<FlatButton label="其他" />}
          zDepth={0}
        />
        <CardHeader
          title="查看本应用采用了那些包："
          actAsExpander
          showExpandableButton={expand}
        />
        <CardText
          expandable={expand}
        >
          {this.state.chipData.map(this.renderChip, this)}
        </CardText>
        <CardActions>
          <AddNRevert
            chipData={this.state.chipData}
            updateHome={(label, intro) => this.handleUpdate(label, intro)}
          />
        </CardActions>
      </Card>
      <Dialog
        title={this.state.intro}
        model={false}
        open={this.state.dialog}
        actions={
          <FlatButton
            label="关闭"
            onTouchTap={this.handleClose}
            icon={<Close />}
            primary
          />
        }
      />
    </div>
    )
  }
}

export default Home
