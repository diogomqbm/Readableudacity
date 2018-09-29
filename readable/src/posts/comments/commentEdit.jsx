import React, { Component } from 'react'
import { editComment  } from './commentsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import serializeForm from 'form-serialize'

class CommentEdit extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const values = serializeForm(e.target, { hash:true })
    values['timestamp'] = new Date().valueOf()
    if(this.props.editComment) {
      this.props.editComment(values, this.props.comment.id, this.props.comment.parentId)
      document.getElementById("form").reset();
    }
  }

  render() {
    return(
      <div>
        <div className="col-md-11">
          <h3>Edit comment</h3> 
        </div>
        <div className="col-md-1">
          <i onClick={() => this.props.closeModal()} className="fa fa-times-circle fa-2x element-icon-close-style"></i>
        </div>
        <form onSubmit={this.handleSubmit} id="form" className="form-inline">
          <div className="form-group">
            <input className="form-control" type="text" name="author" value={this.props.comment.author} placeholder="Author" disabled/>
            <input className="form-control" type="textarea" name="body" defaultValue={this.props.comment.body} />
            <button className="btn btn-success">Edit comment</button>
          </div>
        </form>
      </div>
    )
  } 
}

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({ 
  editComment: bindActionCreators(editComment, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit)