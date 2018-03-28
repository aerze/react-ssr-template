const defaultState = {
  userId: 1
}

export default function userReducer (state = defaultState, action) {
  const { type } = action
  switch (type) {
    case 'USER_INC': {
      return {
        ...state,
        userId: state.userId + 1
      }
    }

    default:
      return state
  }
}
