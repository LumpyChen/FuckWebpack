import React, { Component } from 'react'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

export default class Comment extends Component {
  constructor() {
    super()
    this.state = {
      stepIndex: 0,
    }
  }
  handleNext() {
    const { stepIndex } = this.state
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  }
  handlePrev() {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }
  renderStepActions(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        {step < 2 && (<RaisedButton
          label="下一步"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={() => this.handleNext()}
          style={{ marginRight: 12 }}
        />)}
        {step > 0 && (
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
    const { stepIndex } = this.state
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto', paddingBottom: 50 }}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
              选取并安装包依赖
            </StepButton>
            <StepContent>
              <p>
                在开始开发应用之前，开发者需计划应用所需要的各种技术栈——
                不同的技术栈需要部署相应模块依赖，同时规划全面而有效的开发工具，
                提供项目构建，代码检查，单元测试等功能。
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
              配置环境及开发工具
            </StepButton>
            <StepContent>
              <p>
                在确定了技术栈和开发工具之后，开发者需要配置相应开发环境，
                并应用包管理工具将应用依赖的模块配备齐全，
                此后在开发工具的配置选项中填入最满足开发需求的选项，合理分配项目的目录——
                分开源码和分布代码，分清客户端和服务端代码，分离逻辑层和界面层代码等。
              </p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              onTouchTap={() => this.setState({ stepIndex: 2 })}
            >
              版本式开发
            </StepButton>
            <StepContent>
              <p>
                开始正式编写应用之后，需要将项目的阶段用版本进行分隔——
                每个提交的版本都代表着一个具体的错误修复/新功能/重构等，
                在此之上，渐进开发，可以令应用的开发更具规划性。
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    )
  }
}
