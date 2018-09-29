import React, { Component } from 'react'
import { searchCategories, sortBy } from './categoriesActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

class Categories extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.searchCategories()
  }

  renderRows() {
    let categories = this.props.category
    return categories.map(category => (
      <div className="col-md-1" key={category.path} >
        <Link to={`/${category.name}`}>
          <button type="button" className="btn btn-info">{category.name}</button>
        </Link>
      </div>
    ))
  }

  render() {
    return(
      <div className="jumbotron element-jumbotron-style">
        { this.renderRows() }
        <div className="col-md-3 col-md-offset-6">
          <select className="form-control" onChange={(event) => this.props.sortBy(event.target.value)}>
            <option value="">Order by ?</option>
            <option value="Score">Order by Score</option>
            <option value="Date">Order by Date</option>
          </select>
        </div>
      </div>
    )
  } 
}

const mapStateToProps = state => ({ category: state.categories.categories})
const mapDispatchToProps = (dispatch) => ({ 
  searchCategories: bindActionCreators(searchCategories, dispatch),
  sortBy: bindActionCreators(sortBy, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
