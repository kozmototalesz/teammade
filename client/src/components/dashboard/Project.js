import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getMyProjects,deleteProject} from '../../actions/projectActions';
import Moment from 'react-moment';


class Project extends Component {

    constructor(props){
        super(props);
        this.state={tableContent:''};
        this.onDelete=this.onDelete.bind(this);
    }

    onDelete(id){
        this.props.deleteProject(id);
    }

    componentDidMount(){
        this.props.getMyProjects(); 
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.projects.project){
            let tableContent=(nextProps.projects.project.map(pro =>(
                 <tr key={pro._id}>
                     <td>{pro.name}</td><td><Moment format="YYYY/MM/DD">{pro.end}</Moment></td>
                     <td> <button onClick={this.onDelete(pro._id)} className="btn btn-danger">Delete</button>
                     <button onClick={this.onDelete(pro._id)} className="btn btn-info">Edit</button></td>

                 </tr>
               )))
               this.setState({tableContent:tableContent});
         }
    }

    render() {
    return (
      <div>
        <h4 className="mb-4">Projects</h4>
        <table className="table">
        <thead>
            <tr><th>Name</th><th>End</th><th></th><th></th></tr>
        </thead>
            <tbody>
            {this.state.tableContent}
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    projects: state.projects
})

export default connect(mapStateToProps,{getMyProjects,deleteProject})(Project);
