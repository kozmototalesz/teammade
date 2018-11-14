import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import {addProject,getTeamMates} from '../../actions/profileActions'



import {connect} from 'react-redux';


class AddProjects extends Component {
    constructor(props){
        super(props);
        this.state={
            handle:'',
            name:'',
            status:'',
            description:'',
            end:'',
            errors:'',
            members:'',
            profiles:''
        }
        this.onChange=this.onChange.bind(this);
        //this.onCheck=this.onCheck.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.getTeamList=this.getTeamList.bind(this);

    }

    onSubmit(e){
      e.preventDefault();

      const milestones={};

      const prData={
        handle:this.state.handle,
        name:this.state.name,
        status:this.state.status,
        description:this.state.description,
        end:this.state.end,
        members:this.state.members
      }

      this.props.addProject(prData, this.props.history);

    }

    onChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    getTeamList(e){

      const filterData={
        name: e.target.value
       }
      this.props.getTeamMates(filterData);

    }

    componentWillReceiveProps(nextProps){

      if(nextProps.profile.profiles){

      this.setState();

      }
      if(nextProps.errors){
          this.setState({
            errors:nextProps.errors
          });
      }
    }


  render() {
    const {errors}=this.state;

    return (
      <div className="add-project">
        <div className="containter">
            <div className="row">
              <div className="col-lg-12">
              <h1 className="display-4 text-center">Create your Project</h1>
                          <p className="lead text-center">
                              Please add the details of your project
                          </p>
              </div>
            </div>
            <div className="row">
            
                <div className="col-md-6">
                    <form onSubmit={this.onSubmit}>
                    <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Project Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                        >
                        </TextFieldGroup>
                        </div>
                        <div className="col-md-6 m-auto">
                        <TextFieldGroup 
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        >
                        </TextFieldGroup>
                        </div>
                        <div className="col-md-6 m-auto">
                        <TextAreaFieldGroup
                            placeholder="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                        >
                        </TextAreaFieldGroup>
                        </div>
                        <div className="col-md-6 m-auto">
                        <TextFieldGroup
                            placeholder="Project ending: YYYY/MM/DD"
                            name="end"
                            type="date"
                            value={this.state.end}
                            onChange={this.onChange}
                            error={errors.end}
                        >
                        </TextFieldGroup>
                        </div>

                        <div className="col-md-6 m-auto">

                        <SelectListGroup
                           placeholder="status"
                           name="teammates"
                           type="name"
                           value={this.state.teammate}
                           onChange={this.getTeamList}
                           error={errors.teammate}
                           teammates={this.props.profile.profiles}
                           info="Choose your teammates"
                        >
                        </SelectListGroup>
                        </div>
                        
                      {/*   <div classNem="form-check mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="current"
                            value={this.state.status}     
                            checked={this.state.status}
                            onChange={this.onChange}
                            id="status"
                            />                   
                        
                        </div> */}
                    
                        <div className="col-md-6 m-auto">
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>   
                        </div>

                    </form>
                    

                </div>
                <div className="col-md-6">
                      
                </div>

            </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps=state=>({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProps,{addProject,getTeamMates})(withRouter(AddProjects));