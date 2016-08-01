import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'

import Close from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

const mapStateToProps = ({ chipData }, { params }) => ({
  path: params,
  chipData: chipData.present.toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  push: url => dispatch(push(url)),
})

class PackageIntro extends Component {
  getIntro() {
    const chip = this.props.chipData.filter((ele) => (
      ele.label.split('/').reduce((p, c) => (`${p}\\${c}`)) === this.props.path.label
    ))[0]
    return chip.intro || '没有对此包进行相关描述。'
  }
  render() {
    return (
      <Dialog
        title={this.getIntro()}
        model
        open
        actions={
          <Link to="/packages">
            <FlatButton
              label="关闭"
              icon={<Close />}
              primary
            />
          </Link>
        }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageIntro)

PackageIntro.propTypes = {
  path: React.PropTypes.object,
  push: React.PropTypes.func,
  chipData: React.PropTypes.array,
}
