const SEARCHED_COMMENTS = 'SEARCHED_COMMENTS'

const INITIAL_STATE = {
  listComments: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SEARCHED_COMMENTS:
      return { ...state, listComments: action.payload }
    default:
      return state
  }
}