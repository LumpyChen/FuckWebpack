import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { push, replace } from 'react-router-redux'
import { delPackage } from '../actions/ChipData.js'
import { toggleSnackRm, toggleSnackRv, toggleSnackAdd } from '../actions/Snack'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import Chip from 'material-ui/Chip'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import { CardActions, CardHeader, CardText } from 'material-ui/Card'
import AVAdd from 'material-ui/svg-icons/av/playlist-add'
import AVRevert from 'material-ui/svg-icons/av/replay'

const mapStateToProps = ({ chipData, snack }, { location }) => ({
  chipData: chipData.present,
  snack,
  path: location.pathname,
  canUndo: chipData.past.length > 0,
})

const mapDispatchToProps = dispatch => ({
  push: url => dispatch(push(url)),
  replaceState: url => dispatch(replace(url)),
  delPackage: key => dispatch(delPackage(key)),
  toggleSnackRm: () => dispatch(toggleSnackRm()),
  toggleSnackAdd: () => dispatch(toggleSnackAdd()),
  toggleSnackRv: () => dispatch(toggleSnackRv()),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
})

class Home extends Component {
  handleDel(key) {
    this.props.delPackage(key)
    this.props.toggleSnackRm()
  }
  handleTap(key) {
    const display = this.props.chipData.filter((ele) => (
      ele.key === key
    ))[0].label.split('/').reduce((p, c) => (`${p}\\${c}`))
    console.log(`/packages/${display}`)
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
          <FlatButton
            label="撤销修改"
            disabled={!this.props.canUndo}
            onTouchTap={() => this.props.push('/revert')}
            icon={<AVRevert />}
            primary
          />
        </CardActions>
        {this.props.children}
        <Snackbar
          message="包已经被从项目中删除"
          autoHideDuration={2000}
          action="撤销"
          onRequestClose={() => this.props.toggleSnackRm()}
          onActionTouchTap={() => this.props.onUndo()}
          open={this.props.snack.snackRm}
        />
        <Snackbar
          message="包已被添加到项目中"
          autoHideDuration={2000}
          action="撤销"
          onRequestClose={() => this.props.toggleSnackAdd()}
          onActionTouchTap={() => this.props.onUndo()}
          open={this.props.snack.snackAdd}
        />
        <Snackbar
          message="已撤销上次操作"
          autoHideDuration={2000}
          action="恢复"
          onRequestClose={() => this.props.toggleSnackRv()}
          onActionTouchTap={() => this.props.onRedo()}
          open={this.props.snack.snackRv}
        />
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

Home.propTypes = {
  canUndo: React.PropTypes.bool,
  children: React.PropTypes.node,
  chipData: React.PropTypes.array,
  snack: React.PropTypes.object,
  path: React.PropTypes.string,
  replaceState: React.PropTypes.func,
  delPackage: React.PropTypes.func,
  toggleSnackRm: React.PropTypes.func,
  toggleSnackRv: React.PropTypes.func,
  toggleSnackAdd: React.PropTypes.func,
  push: React.PropTypes.func,
  onUndo: React.PropTypes.func,
  onRedo: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
