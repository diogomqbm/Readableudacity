import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../template/custom.css'

import React, { Component } from 'react'
import Menu from '../template/menu'

class Main extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Menu />
        {children}
      </div>
    )
  }
}

export default Main;