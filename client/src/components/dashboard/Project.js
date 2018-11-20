import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMyProjects,deleteProject} from '../../actions/projectActions';

import Moment from 'react-moment';
import {Link} from 'react-router-dom';



class Project extends Component {

    constructor(props){
        super(props);
        this.state={tableContent:''};
    }

    onDelete(id){
       this.props.deleteProject(id);

    }

    componentDidMount(){
        this.props.getMyProjects(); 
        this.setState({});
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.projects.projects){
    
            let tableContent=(nextProps.projects.projects.map(pro =>(
                 <tr key={pro._id}>
                     <td>{pro.name}</td><td><Moment format="YYYY/MM/DD">{pro.end}</Moment></td>
                     <td> <button onClick={this.onDelete.bind(this,pro._id)} className="btn btn-danger">Delete</button>
                     <Link to={{ pathname: '/edit-project', state: { id: pro._id } }}>
                     <button className="btn btn-info">Edit</button></Link>
                    </td>
 
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
