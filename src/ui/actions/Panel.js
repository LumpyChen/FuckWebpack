export const displayAddPanel = () => ({
  type: 'DISPLAY_ADD_PANEL',
})

export const displayRevertPanel = () => ({
  type: 'DISPLAY_REVERT_PANEL',
})

export const displayPackage = (key) => ({
  type: 'DISPLAY_PACKAGE',
  key,
})

export const closePanel = () => ({
  type: 'CLOSE_PANEL',
})
