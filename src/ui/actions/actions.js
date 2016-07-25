export const addPackage = (data) => ({
  type: 'ADD_PACKAGE',
  data,
})

export const delPackage = (id) => ({
  type: 'DEL_PACKAGE',
  id,
})

export const cancelMovement = () => ({
  type: 'CANCEL_MOVEMENT',
})

export const toggleView = () => ({
  type: 'TOGGLE_VIEW',
})
