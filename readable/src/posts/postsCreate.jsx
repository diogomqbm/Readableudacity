import React, { Component } from 'react'
import { createPost  } from './postsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import serializeForm from 'form-serialize'

class PostCreate extends Component {
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
    if(this.props.createPost) {
      this.props.createPost(values)
      document.getElementById("form").reset();
    }
  }

  render() {
    let categories = this.props.categories
    return(
      <div>
        <div className="col-md-11">
          <h3>New post</h3> 
        </div>
        <div className="col-md-1">
          <i onClick={() => this.props.closeModal()} className="fa fa-times-circle fa-2x element-icon-close-style"></i>
        </div>
        <form onSubmit={this.handleSubmit} id="form" className="form-inline">
          <div className="form-group">
            <input className="form-control" type="text" name="author" placeholder="Author"/>
            <input className="form-control" type="text" name="title" placeholder="Title"/>
            <input className="form-control" type="text" name="body" placeholder="Description"/>
            <select className="form-control" name="category">
              {categories.map((category) => (<option key={category.path} value={category.name}>{category.name}</option>))}
            </select>
            <button className="btn btn-success">Add post</button>
          </div>
        </form>
      </div>
    )
  } 
}

const mapStateToProps = state => ({ categories: state.categories.categories})
const mapDispatchToProps = (dispatch) => ({ 
  createPost: bindActionCreators(createPost, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)