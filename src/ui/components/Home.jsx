import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'
import { delPackage } from '../actions/ChipData.js'
import { toggleSnackRm, toggleSnackRv, toggleSnackAdd } from '../actions/Snack.js'

import Chip from 'material-ui/Chip'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import { CardActions, CardHeader, CardText } from 'material-ui/Card'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVRevert from 'material-ui/svg-icons/av/replay'

const mapStateToProps = ({ chipData, snack }, { location }) => ({
  chipData,
  snack,
  path: location.pathname,
})

const mapDispatchToProps = dispatch => ({
  push: url => dispatch(push(url)),
  delPackage: key => dispatch(delPackage(key)),
  toggleSnackRm: () => dispatch(toggleSnackRm()),
  toggleSnackAdd: () => dispatch(toggleSnackAdd()),
  toggleSnackRv: () => dispatch(toggleSnackRv()),
})

class Home extends Component {
  handleDel(key) {
    this.props.delPackage(key)
    this.props.toggleSnackRm()
  }
  handleTap(key) {
    const display = this.props.chipData[key].label.split('/').reduce((p, c) => (`${p}\\${c}`))
    this.props.push(`/packages/${display}`)
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
    return (
      <div>
        <CardHeader
          title="查看本应用采用了那些包："
        />
        <CardText>
          {this.props.chipData.map(this.renderChip, this)}
        </CardText>
        <CardActions>
          <Link to="/new">
            <FlatButton
              label="添加包"
              icon={<AVAdd />}
              primary
            />
          </Link>
          <Link to="/revert">
            <FlatButton
              label="撤销修改"
              icon={<AVRevert />}
              primary
            />
          </Link>
        </CardActions>
        {this.props.children}
        <Snackbar
          message="包已经被从项目中删除"
          autoHideDuration={2000}
          onRequestClose={() => this.props.toggleSnackRm()}
          open={this.props.snack.snackRm}
        />
        <Snackbar
          message="包已被添加到项目中"
          autoHideDuration={2000}
          onRequestClose={() => this.props.toggleSnackAdd()}
          open={this.props.snack.snackAdd}
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
  chipData: React.PropTypes.array,
  snack: React.PropTypes.object,
  delPackage: React.PropTypes.func,
  toggleSnackRm: React.PropTypes.func,
  toggleSnackRv: React.PropTypes.func,
  toggleSnackAdd: React.PropTypes.func,
  push: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
