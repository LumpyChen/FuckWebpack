import React, { Component } from 'react'
import Card from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import Toggle from 'material-ui/svg-icons/av/loop'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tabIndex: '/',
    }
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    }
  }
  componentWillMount() {
    this.setState({
      tabIndex: this.getSelectedIndex(),
    })
  }
  componentWillReceiveProps() {
    this.setState({
      tabIndex: this.getSelectedIndex(),
    })
  }
  getSelectedIndex() {
    return this.context.router.isActive('/', true) ? '/' : 'comment'
  }
  handleTap() {
    this.context.router.push(this.context.router.isActive('/', true) ? 'comment' : '/')
    this.setState({
      tabIndex: this.getSelectedIndex(),
    })
  }
  render() {
    return (
      <Card>
        <AppBar
          title="这是Lumpy的脚手架，一个简单的模板"
          iconElementLeft={<IconButton><ActionBuild /></IconButton>}
          iconElementRight={
            <FlatButton
              primary
              icon={<Toggle />}
              label="翻面"
              onTouchTap={() => this.handleTap()}
            />
          }
          zDepth={0}
        />
        {this.props.children}
      </Card>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node,
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default App
