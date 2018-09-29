import React, { Component } from 'react'
import PageHeader from '../../template/pageHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeScorePost, deletePost  } from '../postsActions'
import { searchPostsCategories } from './categoriesActions'
import { Link } from 'react-router'
import Grid from '../../template/grid'

class CategoriesListPost extends Component {

  componentWillMount() {
    this.props.searchPostsCategories(this.props.params.category)
  }

  componentDidUpdate() {
    this.props.searchPostsCategories(this.props.params.category)
  }

  renderRows() {
    let list = this.props.list
    let order = this.props.order
    list.sort(function(a, b) {
      if (order === "Date") {
        return (a.timestamp > b.timestamp)
          ? -1
          : 1
      } else if (order === ""){
        return (a.id > b.id)
          ? -1
          : 1
      } else {
        return (a.voteScore > b.voteScore)
        ? -1
        : 1
      }
    })

    return list.map(posts => (
      <div key={posts.id}>
        <Grid cols="12" >
          <Grid cols="10"> 
            <h3> <i className="fa fa-file-text-o"> {posts.title}</i>
              <Link to={`/${posts.category}/${posts.id}`}> <i className="fa fa-arrow-right"></i></Link>
            </h3>
            <p>Author: {posts.author}</p>
            <div>Nº of comments: {posts.commentCount}</div>
          </Grid>
          <Grid cols="2"> 
            <h3> <i className="fa fa-star-half-o"> Score : {posts.voteScore}</i></h3>
            <div>
              <button className="btn btn-warning" onClick={ () => this.props.changeScorePost(posts.id, false)}>
                <i className="fa fa-minus"></i>
              </button>
              <button className="btn btn-success" onClick={ () => this.props.changeScorePost(posts.id, true)}>
                <i className="fa fa-plus"></i>
              </button>
              <button className="btn btn-danger" onClick={ () => this.props.deletePost(posts.id)}>
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    ))
  }

  render() {
    return(
      <div>
        <PageHeader name={`${this.props.params.category} Posts`} small="List" />
        {this.props.list !== [] && (
          this.renderRows()
        )}
        {this.props.list.length === 0  && (
          <h4 className="center">No posts from this category <Link to="/posts">View all posts</Link></h4>
        )}        
      </div>
    )
  } 
}

const mapStateToProps = state => ({ list: state.categories.list, order: state.categories.order})
const mapDispatchToProps = (dispatch) => ({ 
  searchPostsCategories: bindActionCreators(searchPostsCategories, dispatch),
  changeScorePost: bindActionCreators(changeScorePost, dispatch),
  deletePost: bindActionCreators(deletePost, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListPost)

