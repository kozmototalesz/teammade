import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextFieldGroup';
import {withRouter} from 'react-router-dom';
import {createnewProfile} from '../../actions/profileActions';


 class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            handle:'',
            status:'',
            skills:'',
            organization:'',
            workinghours:'',
            projects:{},
            errors:{}
        }

        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        const profileData={
            handle:this.state.handle,
            status:this.state.status,
            skills:this.state.skills,
            organization:this.state.organization,
            workinghours:this.state.workinghours
            
        }

        this.props.createnewProfile(profileData,this.props.history);
    }


    onChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }


  render() {
    const errors = this.state.errors;

    return (
      <div className="create-profle">
        <div className="containter">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create your profile</h1>
                    <p className="lead text-center">
                        Please add your missing informations
                    </p>
                    <div style={{display: 'flex', justifyContent: 'center'}} className="text-center">


                    <form onSubmit={this.onSubmit} style={{width:'80%'}}>
                    <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                        >
                        </TextFieldGroup>
                        </div>


                          <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            error={errors.status}
                        >
                        </TextFieldGroup>
                        </div>


                          <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                        >
                        </TextFieldGroup>
                        </div>

                          <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Organization"
                            name="organization"
                            value={this.state.organization}
                            onChange={this.onChange}
                            error={errors.organization}
                        >
                        </TextFieldGroup>
                        </div>

                          <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Working hours"
                            name="workinghours"
                            value={this.state.workinghours}
                            onChange={this.onChange}
                            error={errors.workinghours}
                        >
                        </TextFieldGroup>
                        </div>
                        <div className="col-md-6 m-auto">
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>   
                        </div>

                    </form>
                    
                    </div>

                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors

})

export default connect(mapStateToProps,{createnewProfile})(withRouter(CreateProfile));