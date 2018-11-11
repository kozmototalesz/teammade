import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class Project extends Component {
  render() {
      console.log(this.props);
    /*   const project=this.props.project.map(pro =>(
        <tr key={pro._id}>
            <td>{pro.name}</td>
            <td>{pro.end}</td>
            <td><button className="btn btn-danger">Delete</button></td>
        </tr>
      )); */
    return (
      <div>
        <h4 className="mb-4">Project details</h4>
        <table className="table">
            <th>
                Name
            </th>
            <th>
                End
            </th>
            <th>

            </th>
            <tbody>

            </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null)(withRouter(Project));