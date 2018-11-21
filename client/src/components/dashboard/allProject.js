import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMyProjects,deleteProject} from '../../actions/projectActions';

import Moment from 'react-moment';
import {Link} from 'react-router-dom';

import '../../App.css';



class AllProject extends Component {

    constructor(props){
        super(props);
        this.state={
            tasks:'',
            jobdone:
            {
                projid:'',
                hours:''
            }

        };

        this.onChange=this.onChange.bind(this);
    }

    onDelete(id){
       this.props.deleteProject(id);
    }

    onSubmit(e){
        e.preventDefault();
        const profileData={
            handle:this.state.handle,
            status:this.state.status,
            skills:this.state.skills,
            organization:this.state.organization,
            workinghours:this.state.workinghours,
        }
        this.props.addWorkingHours(profileData,this.props.history);
    }

    onChange(e){
        e.preventDefault();
        console.log(e.target.value + e.target.name);
        this.setState({
            jobdone:{
                hours: e.target.value,
                projid: e.target.key,
            }
        });
    }

    componentDidMount(){
        this.props.getMyProjects(); 
        this.setState({});

    }

    componentWillReceiveProps(nextProps){
        let result;

        if(nextProps.projects.projects){
            result=nextProps.projects.projects.map(proj =>
            {
                if(proj.members){
                    let filtered=proj.members.filter(members => {
                        return members._id===this.props.auth.user.id;
                    });

                    if (filtered.length!=0)
                    {
                        return proj;
                    } 
                }

            });

            result = result.filter((i) => i);
            this.setState({tasks: result});
        }
    
    }

    render() {
        let result = this.state.tasks;
        let taskContent;

        if(result){
            if (result.length>0){
            taskContent=(result.map(pro => (
                                                <tr key={pro._id}>
                                                    <td>
                                                        {pro.name}
                                                    </td>
                                                    <td>
                                                        <Moment format="YYYY/MM/DD">{pro.end}</Moment>
                                                    </td>
                                                    <td >
                                                        <input key={pro._id} placeholder="6 hours" onChange={this.onChange} type="number" value={this.state.jobdone.hours} style={{width:"80%",float:"right"}} className="form-control form-control-lg" ></input>
                                                    </td>
                                                    <td >
                                                        <Link to={{ pathname: '/edit-project', state: { id: pro._id } }}>

                                                        <button style={{marginLeft:5}} className="btn btn-info">Check it</button></Link>
                                                    </td>
                                                </tr>
                                            )
                                    )
                        )
            } else {
            taskContent=(
                <tr>
                    <td>you are free man.</td>    
                </tr>
            )

            }
        }


        
    return (
      <div className="col-lg-6">
        <h4 className="mb-4">Today</h4>
        <table className="table">
        <thead>
            <tr><th>Name</th><th>End</th><th></th><th></th></tr>
        </thead>
            <tbody>


        {taskContent}
        

            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    projects: state.projects,
    auth: state.auth
})

export default connect(mapStateToProps,{getMyProjects,deleteProject})(AllProject);
