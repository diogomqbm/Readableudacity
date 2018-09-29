import { combineReducers } from 'redux'
import postsReducer from './posts/postsReducer'
import categoriesReducer from './posts/categories/categoriesReducer'
import commentsReducer from './posts/comments/commentsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  comments: commentsReducer
})

export default rootReducer