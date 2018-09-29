import React, { Component } from 'react'
import { createComments  } from './commentsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import serializeForm from 'form-serialize'

class CommentsCreate extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  handleSubmit(e) {
    e.preventDefault()
    const values = serializeForm(e.target, { hash:true })
    values['id'] = this.randomString(20)
    values['timestamp'] = new Date().valueOf()
    values['parentId'] = this.props.id
    if(this.props.createComments) {
      this.props.createComments(values, this.props.id)
      document.getElementById("form").reset();
    }
  }

  render() {
    return(
      <div>
        <div className="col-md-11">
          <h3>New comment</h3> 
        </div>
        <div className="col-md-1">
          <i onClick={() => this.props.closeModal()} className="fa fa-times-circle fa-2x element-icon-close-style"></i>
        </div>
        <form onSubmit={this.handleSubmit} id="form" className="form-inline">
          <div className="form-group">
            <input className="form-control" type="text" name="author" placeholder="Author"/>
            <input className="form-control" type="textarea" name="body" placeholder="Description"/>
            <button className="btn btn-success">Add comment</button>
          </div>
        </form>
      </div>
    )
  } 
}

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({ 
  createComments: bindActionCreators(createComments, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentsCreate)