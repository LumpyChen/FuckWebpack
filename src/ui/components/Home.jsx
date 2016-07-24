import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'


class Home extends Component {
  constructor() {
    super()
    this.state = {
      chipData: [
        { key: 0, label: 'ImmutableJS' },
        { key: 1, label: 'Material-UI' },
        { key: 2, label: 'Radium' },
        { key: 3, label: 'ReactJS' },
        { key: 4, label: 'ReactDOM' },
        { key: 5, label: 'React-Router' },
        { key: 6, label: 'React-Redux/Redux' },
        { key: 7, label: 'React-Router-Redux' },
        { key: 8, label: 'Redux-Saga' },
      ],
    }
  }
  handleDel(key) {
    this.chipData = this.state.chipData
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key)
    this.chipData.splice(chipToDelete, 1)
    this.setState({ chipData: this.chipData })
  }
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleDel(data.key)}
      >
        {data.label}
      </Chip>
    )
  }
  render() {
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
          showExpandableButton
        />
        <CardText expandable>
          {this.state.chipData.map(this.renderChip, this)}
        </CardText>
        <CardActions>
          <FlatButton label="添加包" />
          <FlatButton label="修改包" />
        </CardActions>
      </Card>
    </div>
    )
  }
}

export default Home
