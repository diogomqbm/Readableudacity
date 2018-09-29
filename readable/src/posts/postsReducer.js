const SEARCHED = 'SEARCHED'
const POST_SEARCHED = 'POST_SEARCHED'

const INITIAL_STATE = {
  list: [],
  post: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SEARCHED:
      return { ...state, list: action.payload }
    case POST_SEARCHED:
      return { ...state, post: action.payload }  
    default:
      return state
  }
}