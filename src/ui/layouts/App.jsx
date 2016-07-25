import React, { Component } from 'react'

class App extends Component {
  foo() {
    console.log(1)
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node,
}

export default App
