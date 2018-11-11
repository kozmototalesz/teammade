import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom';

import {getCurrentProfile} from '../../actions/profileActions';
import ProfileActions from './ProfileActions';

import Project from './Project'


import Spinner from '../common/Spinner';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getCurrentProfile(); 
    }
    
    render(){
        const {user} = this.props.auth;
        const {profile} = this.props.profile;

        let dashboardContent;

        if(profile===null || profile.loading){
            dashboardContent = <Spinner/>
        } else {
            //Check logged user has profile:
            if(Object.keys(profile).length>0){
                dashboardContent=(
                    <div>
                        <p className="lead text-muted">Welcome {user.name} </p>
                        <ProfileActions></ProfileActions>
                        <Project project={profile.experience}></Project>

                    </div>
                )
            } else {
                dashboardContent=(
                    <div>
                        <p className="lead text-muted"> Hey {user.name},</p>
                        <p>You still some have missing data, please add some info.</p>
                        <Link to="/edit-profile" className="btn btn-lg btn-info">Add Profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard"> 
                <div className="container"> 
                    <div className="row"> 
                        <div className="col-md-12"> 
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);