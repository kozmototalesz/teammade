import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMyProjects,deleteProject} from '../../actions/projectActions';

import Moment from 'react-moment';
import {Link} from 'react-router-dom';

import '../../App.css';


class myProject extends Component {

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
                     <td className="rows">{pro.name}</td><td><Moment format="YYYY/MM/DD">{pro.end}</Moment></td>
                     <td style={{textAlign:'right'}}> <button onClick={this.onDelete.bind(this,pro._id)} className="btn btn-danger">Delete</button>
                     <Link to={{ pathname: '/edit-project', state: { id: pro._id } }}>
                     <button style={{marginLeft:5}}className="btn btn-info">Edit</button></Link>
                    </td>
 
                 </tr>
               )))
               this.setState({tableContent:tableContent});
         }
    }

    render() {
    return (
      <div className="col-lg-6">
        <h4 className="mb-4">Your projects</h4>
        <table className="table " >
        <thead>
            <tr><th>Name</th><th>End</th><th></th></tr>
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

export default connect(mapStateToProps,{getMyProjects,deleteProject})(myProject);
