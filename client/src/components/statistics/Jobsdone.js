
import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import {withRouter} from 'react-router-dom';
import {createnewProfile, getCurrentProfile,getJobHours} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import {Link} from 'react-router-dom';


 class Jobsdone extends Component {
    constructor(props){
        super(props);
        this.state={
            statistics:[],
            handle:''
        }
    }

    componentDidMount(){
        this.props.getJobHours(this.props.profileid);
    }

    componentWillReceiveProps(nextProps){
        this.setState({statistics:nextProps.profile.workinghours});
    }

  render() {
    let statistics = this.state.statistics;
    let content;
    if(statistics){
        if(statistics.length>0){
                content=(this.state.statistics.map(job => <div key={job._id}> <h1>{job.date}</h1>
                <div>
                    {job.jobdone.map(project=>
                    <div key={project._id}> 
                        <div>
                            {project.name} : {project.hours} hours
                        </div>   
                    </div>
                    )}

                </div>

            </div>
            ));
        }
    }

    return (
      <div className="create-profle">
        <div className="containter">
            <div className="row">
                <div className="col-lg-12">
                    <Link to="/dashboard" className="btn btn-light"> &lt;	 back</Link>
                </div>
                <div className="col-md-8 m-auto">

                    <h1 className="display-4 text-center">You've worked since you are here.</h1>
                    <p className="lead text-center">yes you are right, this is ugly.</p>
                    
                    <div style={{display: 'flex', ajustifyContent: 'center'}} className="text-center">
                        {content}
                    </div>

                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{getJobHours,getCurrentProfile})(Jobsdone);