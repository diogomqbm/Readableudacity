import React, { Component } from 'react'
import Grid from '../../template/grid'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteComments, changeScoreComment } from './commentsActions'
import Modal from 'react-modal'
import CommentsCreate from './commentsCreate'
import CommentEdit from './commentEdit'

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

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalEditIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    //Modal.setAppElement('#root');
  }
  
  openModal() {
    this.setState({modalIsOpen: true})
  }
  
  editComment(comment) {
    this.setState({ comment: comment })
    this.openEditModal()
  }

  openEditModal() {
    this.setState({modalEditIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
    this.setState({modalEditIsOpen: false})
  }

  printDate(timestamp) {
    const d = new Date(timestamp)
    return d.toUTCString().split(" ").slice(0,4).join(" ")
  }

  render() {
    let comments = this.props.comments
    let idPost = this.props.idPost
    return(
      <div>
        <div className="panel panel-default"> 
          <div className="panel-heading">
            <h4>Comments ({comments.length}) <button onClick={this.openModal} className="btn btn-primary btn-xs">Add comment</button></h4>
          </div>      
            <div className="panel-body">
              {comments.length === 0 && (
                <h4>No comments from this post</h4>
              )}
              {comments.map(comment => (
                <div key={comment.id}>
                  <Grid  cols="12">
                    <section className="comment">
                      <p><b>{comment.author}</b> on <font color="green"><b>{this.printDate(comment.timestamp)}</b></font></p>
                      <p>{comment.body}</p>
                      <p>Score: <b>{comment.voteScore}</b></p>
                      <span>
                        <font color="green">
                          <i className="fa fa-thumbs-up icon-comments" onClick={() => this.props.changeScoreComment(comment.id, idPost, true)}></i></font>
                        <font color="orange">
                          <i className="fa fa-thumbs-down icon-comments" onClick={() => this.props.changeScoreComment(comment.id, idPost, false)}></i></font>
                        <font color="black">
                          <i className="fa fa-pencil icon-comments" onClick={() => this.editComment(comment)}></i></font>
                        <font color="red">
                          <i className="fa fa-times icon-comments" onClick={() => this.props.deleteComments(comment.id, idPost)}></i></font>
                      </span>
                    </section>
                  </Grid>
                </div>             
              ))}
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <CommentsCreate closeModal={this.closeModal} id={idPost}/>
        </Modal>
        <Modal
          isOpen={this.state.modalEditIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <CommentEdit closeModal={this.closeModal} comment={this.state.comment}/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = null 
const mapDispatchToProps = (dispatch) => ({ 
  deleteComments: bindActionCreators(deleteComments, dispatch),
  changeScoreComment: bindActionCreators(changeScoreComment, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Comments)
