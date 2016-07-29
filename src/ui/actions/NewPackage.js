export const changeLabel = (label) => ({
  type: 'CHANGE_LABEL',
  label,
})

export const changeIntro = (intro) => ({
  type: 'CHANGE_INTRO',
  intro,
})

export const verifyLabel = (label, chipData) => ({
  type: 'VERIFY_LABEL',
  label,
  chipData,
})

export const setEmpty = () => ({
  type: 'SET_EMPTY',
})
