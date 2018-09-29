import axios from 'axios'

const URL = 'http://localhost:3001'

const config = {
  headers: {
    'Authorization': 'whatever-you-want',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

export const search = () => {
  return(dispatch) => {
    return axios.get(`${URL}/posts`,  config )
      .then(resp => dispatch({type: 'SEARCHED', payload: resp.data}))
  }
}

export const deletePost = (idPost) => {
  return dispatch => {
    return axios.delete(`${URL}/posts/${idPost}`, config)
    .then(resp => dispatch(search()))
    .then(resp => dispatch(searchPost(idPost)))
  }
} 

export const createPost = (body) => {
  return dispatch => {
    return axios.post(`${URL}/posts`, JSON.stringify(body) , config)
    .then(resp => dispatch(search()))
    .then(() => (alert("Post created")))
  }
}

export const searchPost = (idPost) => {
  return dispatch => {
    return axios.get(`${URL}/posts/${idPost}`, config)
    .then(resp => dispatch({type: 'POST_SEARCHED', payload: resp.data}))
  }
}

export const editPost = (body, idPost) => {
  return dispatch => {
    return axios.put(`${URL}/posts/${idPost}`, JSON.stringify(body) , config)
    .then(resp => dispatch(searchPost(idPost)))
    .then(() => (alert("Post edited")))
  }
}

export const changeScorePost = (idPost, isUpVote) => {
  return dispatch => {
    return axios.post(`${URL}/posts/${idPost}`, { 'option' : isUpVote ? 'upVote' : 'downVote' }, config)
      .then(resp => dispatch(search()))
      .then(resp => dispatch(searchPost(idPost)))
  }
}


  