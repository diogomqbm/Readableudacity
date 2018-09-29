import React, { Component } from 'react'
import Modal from 'react-modal'
import PostCreate from '../posts/postsCreate'
import Categories from '../posts/categories/categories'

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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //Modal.setAppElement('#root');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <header className="page-header">
            <div>
              <h2>{this.props.name} 
                <small> / {this.props.small}</small>
                {this.props.small !== '?' && (
                  <small><button onClick={this.openModal} className="botao-header-add btn btn-primary"><i className="fa fa-plus"></i> Add</button></small>
                )}
              </h2>
            </div>
          </header>
          {this.props.name !== 'About' && this.props.name !== 'Post' && (
            <Categories />
          )}
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <PostCreate closeModal={this.closeModal}/>
        </Modal>
      </div>
    )
  }
}

export default Header