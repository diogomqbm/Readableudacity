import React from 'react'
import { Router, Route, Redirect, browserHistory, IndexRedirect } from 'react-router'

import Main from './main/main'
import Posts from './posts/posts'
import About from './about/about'
import PostDetail from './posts/postDetail'
import CategoriesListPost from './posts/categories/categoriesListPost'

export default props => (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/posts" />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:category" component={CategoriesListPost}/>
      <Route exact path="/:category/:postId" component={PostDetail}/>
      <Redirect from="*" to="/posts" />
    </Route>
  </Router>
)