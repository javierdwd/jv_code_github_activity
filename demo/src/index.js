import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

import './demo_styles.css'

class Demo extends Component {
  render() {
    return <div>
      <h1>jv_code_github_activity_component Demo</h1>

      <Example login="javierdwd" />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
