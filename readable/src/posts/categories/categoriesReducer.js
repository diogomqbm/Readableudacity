const SEARCHED_CATEGORY = 'SEARCHED_CATEGORY'
const SEARCHED_CATEGORY_POSTS = 'SEARCHED_CATEGORY_POSTS'
const ORDER_BY = 'ORDER_BY'

const INITIAL_STATE = {
  categories: [],
  list: [],
  order: ""
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SEARCHED_CATEGORY:
      return { ...state, categories: action.payload.categories }
    case SEARCHED_CATEGORY_POSTS:
      return { ...state, list: action.payload } 
    case ORDER_BY:
      return { ...state, order: action.order }   
    default:
      return state
  }
}