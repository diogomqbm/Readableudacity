import React from 'react'
import { Link } from 'react-router'

export default props => (
  <nav className="navbar navbar-inverse bg-inverse">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/posts">
          <i className="fa fa-book" aria-hidden="true"> Redeable</i>
        </Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
  </nav>
)