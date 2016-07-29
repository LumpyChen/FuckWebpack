import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Card from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import Toggle from 'material-ui/svg-icons/av/loop'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const mapStateToProps = (obj, { location }) => ({
  path: location.pathname,
})

const mapDispatchToProps = (dispatch) => ({
  push: url => dispatch(push(url)),
})


class App extends Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    }
  }
  handleTap() {
    this.props.push(this.props.path === '/packages' ? '/comment' : '/packages')
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
  path: React.PropTypes.string,
  push: React.PropTypes.func,
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
