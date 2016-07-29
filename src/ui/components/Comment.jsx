import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const mapStateToProps = (obj, { location }) => ({
  stepIndex: parseInt(location.pathname.substr(-1, 1), 10),
})

const mapDispatchToProps = (dispatch) => ({
  push: url => dispatch(push(url)),
})

class Comment extends Component {
  handleNext() {
    const { stepIndex } = this.props
    if (stepIndex < 3) {
      this.props.push(`/comment/${stepIndex + 1}`)
    }
  }
  handlePrev() {
    const { stepIndex } = this.props
    if (stepIndex > 1) {
      this.props.push(`/comment/${stepIndex - 1}`)
    }
  }
  handleTap(key) {
    this.props.push(`/comment/${key}`)
  }
  renderStepActions(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        {step < 3 && (<RaisedButton
          label="下一步"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={() => this.handleNext()}
          style={{ marginRight: 12 }}
        />)}
        {step > 1 && (
          <FlatButton
            label="上一步"
            disableTouchRipple
            disableFocusRipple
            onTouchTap={() => this.handlePrev()}
          />
        )}
      </div>
    )
  }
  render() {
    const { stepIndex } = this.props
    const { one, two, three } = this.props
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto', paddingBottom: 50 }}>
        <Stepper
          activeStep={stepIndex - 1}
          linear
          orientation="vertical"
        >
          <Step>
            <StepButton onTouchTap={() => this.handleTap(1)}>
              选取并安装包依赖
            </StepButton>
            <StepContent>
              {
                stepIndex === 1 &&
                  <div>
                    {one}
                  </div>
              }
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.handleTap(2)}>
              配置环境及开发工具
            </StepButton>
            <StepContent>
              {
                stepIndex === 2 &&
                  <div>
                    {two}
                  </div>
              }
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              onTouchTap={() => this.handleTap(3)}
            >
              版本式开发
            </StepButton>
            <StepContent>
              {
                stepIndex === 3 &&
                  <div>
                    {three}
                  </div>
              }
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    )
  }
}

Comment.propTypes = {
  one: React.PropTypes.node,
  two: React.PropTypes.node,
  three: React.PropTypes.node,
  stepIndex: React.PropTypes.number,
  push: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
