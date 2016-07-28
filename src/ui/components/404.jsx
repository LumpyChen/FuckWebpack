import React from 'react'
import { Link } from 'react-router'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Return from 'material-ui/svg-icons/hardware/keyboard-return'

export default () => (
  <Dialog
    title="页面404"
    actions={
      <Link to="/">
        <FlatButton
          label="返回首页"
          icon={<Return />}
          primary
        />
      </Link>
    }
    modal
    open
  >
    你所查找的页面不存在。
  </Dialog>
)
