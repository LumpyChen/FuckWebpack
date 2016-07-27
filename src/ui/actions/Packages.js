export const addPackage = (data) => ({
  type: 'ADD_PACKAGE',
  data,
})

export const delPackage = (id) => ({
  type: 'DEL_PACKAGE',
  id,
})

export const revertMovement = () => ({
  type: 'REVERT_MOVEMENT',
})
