import React, { Component } from 'react'
import { searchPost, changeScorePost, deletePost } from './postsActions'
import { searchComments } from '../posts/comments/commentsActions'
import PageHeader from '../template/pageHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '../template/grid'
import Comments from '../posts/comments/comments'
import Modal from 'react-modal'
import PostEdit from './postEdit'
import _ from '../../node_modules/lodash'
import { Link } from 'react-router'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      modalEditIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  
  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  componentDidMount() {
    this.props.searchPost(this.props.params.postId)
    this.props.searchComments(this.props.params.postId)
  }

  printDate(timestamp) {
    const d = new Date(timestamp)
    return d.toUTCString().split(" ").slice(0,4).join(" ")
  }
 
  render() {
    let post = this.props.post
    let data = this.printDate(post.timestamp)
    return(
      <div>
        {_.isEmpty(this.props.post) === true && (
          <div>
            <div>
              <h1>Error 404 - Post not found </h1>
            </div>
            <Link to="/posts"><button className="btn btn-primary center">Retrun initial page</button></Link>
          </div>  
        )}
        {_.isEmpty(this.props.post) === false && (
        <div>
          <PageHeader name="Post" small="Detail" />
          <h2>{post.title} <i className="fa fa-pencil icon-comments" onClick={this.openModal}></i></h2>
          <p>By <b>{post.author}</b> under 
            <font color="red"><b> {post.category} </b></font>
              on <font color="green"><b> {data}</b></font>
          </p>
          <div className="row">
            <Grid cols="10">
              <div className="jumbotron">
                {post.body}
              </div>
            </Grid>
            <Grid cols="2"> 
              <h3> <i className="fa fa-star-half-o"> Score : {post.voteScore} </i></h3>
              <div>
                <button className="btn btn-warning" onClick={() => this.props.changeScorePost(post.id, false)}>
                  <i className="fa fa-minus"></i>
                </button>
                <button className="btn btn-success" onClick={() => this.props.changeScorePost(post.id, true)}>
                  <i className="fa fa-plus"></i>
                </button>
                <button className="btn btn-danger" onClick={() => this.props.deletePost(post.id)}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </div>
            </Grid>
          </div>
          <Comments comments={this.props.comments} idPost={post.id}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
          <PostEdit closeModal={this.closeModal} post={post}/>
          </Modal>
        </div>  
        )}
      </div>
    )
  } 
}

const mapStateToProps = state => ({ post: state.posts.post, comments: state.comments.listComments})
const mapDispatchToProps = (dispatch) => ({ 
  searchPost: bindActionCreators(searchPost, dispatch),
  changeScorePost: bindActionCreators(changeScorePost, dispatch),
  deletePost: bindActionCreators(deletePost, dispatch),
  searchComments: bindActionCreators(searchComments, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)


