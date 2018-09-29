import axios from 'axios'

const URL = 'http://localhost:3001'

const config = {
  headers: {
    'Authorization': 'whatever-you-want',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

export const searchCategories = () => {
  return(dispatch) => {
    return axios.get(`${URL}/categories`,  config )
      .then(resp => dispatch({type: 'SEARCHED_CATEGORY', payload: resp.data}))
  }
}

export const searchPostsCategories = (category) => {
  return(dispatch) => {
    return axios.get(`${URL}/${category}/posts`,  config )
      .then(resp => dispatch({type: 'SEARCHED_CATEGORY_POSTS', payload: resp.data}))
  }
}

export const sortBy = (event) => {
  return(dispatch) => {
    let order = dispatch({type: 'ORDER_BY', order:event})
      return order
  }
}