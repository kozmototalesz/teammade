
import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import {withRouter} from 'react-router-dom';
import {createnewProfile, getCurrentProfile,getJobHours} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import {Link} from 'react-router-dom';
import Jobsdone from './Jobsdone';



 class Statistics extends Component {
    constructor(props){
        super(props);
        this.state={
            statistics:[],
            handle:''
        }
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.profile.profile){
            this.setState({handle:nextProps.profile.profile.handle});
        }
    }



  render() {
    let content;
    if(this.state.handle.length>0) { content=(<Jobsdone profileid={this.state.handle}></Jobsdone>)
    } else {content=(<div>asddas</div>)}
    

    return (
      <div className="create-profle">
        
                        {content}
        
      </div>
    )
 }
}


const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{getJobHours,getCurrentProfile})(Statistics);