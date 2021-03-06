import React from 'react'

export const StepOne = () => (
  <p>
    在开始开发应用之前，开发者需计划应用所需要的各种技术栈——
    不同的技术栈需要部署相应模块依赖，同时规划全面而有效的开发工具，
    提供项目构建，代码检查，单元测试等功能。
  </p>
)

export const StepTwo = () => (
  <p>
    在确定了技术栈和开发工具之后，开发者需要配置相应开发环境，
    并应用包管理工具将应用依赖的模块配备齐全，
    此后在开发工具的配置选项中填入最满足开发需求的选项，合理分配项目的目录——
    分开源码和分布代码，分清客户端和服务端代码，分离逻辑层和界面层代码等。
  </p>
)

export const StepThree = () => (
  <p>
    开始正式编写应用之后，需要将项目的阶段用版本进行分隔——
    每个提交的版本都代表着一个具体的错误修复/新功能/重构等，
    在此之上，版本交替而渐进地开发，令应用的开发更具规划性。
  </p>
)
