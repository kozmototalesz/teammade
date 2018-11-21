import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMyProjects,deleteProject} from '../../actions/projectActions';

import Moment from 'react-moment';
import {Link} from 'react-router-dom';

import '../../App.css';



class AllProject extends Component {

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
                    <td>
                        {pro.name}
                    </td>
                    <td>
                        <Moment format="YYYY/MM/DD">{pro.end}</Moment>
                    </td>
                    <td >
                        <input placeholder="6 hours" style={{width:"50%",float:"right"}} className="form-control form-control-lg" ></input>
                    </td>
                    <td >
                        <Link to={{ pathname: '/edit-project', state: { id: pro._id } }}>

                        <button style={{marginLeft:5}} className="btn btn-info">Check it</button></Link>
                    </td>
 
                 </tr>
               )))
               this.setState({tableContent:tableContent});
         }
    }

    render() {
    return (
      <div className="col-lg-6">
        <h4 className="mb-4">Today</h4>
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

export default connect(mapStateToProps,{getMyProjects,deleteProject})(AllProject);
