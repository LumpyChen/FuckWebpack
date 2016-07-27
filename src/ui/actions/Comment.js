export const switchStep = (index) => ({
  type: 'SWITCH_STEP',
  index,
})

export const nextStep = () => ({
  type: 'NEXT_STEP',
})

export const prevStep = () => ({
  type: 'PREV_STEP',
})

export const toggleView = () => ({
  type: 'TOGGLE_VIEW',
})
