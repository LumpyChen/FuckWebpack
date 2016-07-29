export const addPackage = (data) => ({
  type: 'ADD_PACKAGE',
  data,
})

export const delPackage = (delkey) => ({
  type: 'DEL_PACKAGE',
  delkey,
})

export const revertMovement = () => ({
  type: 'REVERT_MOVEMENT',
})
