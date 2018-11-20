import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import ChooseMembers from '../add-projects/ChooseMembers';
import {addMember} from '../../actions/projectActions';

import {addProject} from '../../actions/profileActions';

import {connect} from 'react-redux';


class EditProject extends Component {
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
            profiles:'',
            choosen:{}
        }
        this.onChange=this.onChange.bind(this);
        //this.onCheck=this.onCheck.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

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
      console.log(prData);

        this.props.addProject(prData, this.props.history);

    }

    onChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    componentDidMount(){
        const {id} = this.props.location.state

        console.log(this.props.projects.projects);
        //this.props.getProject(id);
        if(this.props.projects.projects){
            var result = this.props.projects.projects.filter(obj => {
                return obj._id == id
            })
            
            this.setState(result[0]);
           
        }
    }

    componentWillReceiveProps(nextProps){

      if(nextProps.errors){
          this.setState({
            errors:nextProps.errors
          });
      }

      this.setState({members:nextProps.projects.temporaryMembers});
    }


  render() {
    const {errors}=this.state;

    console.log("KISLÓFASZ");
    console.log(this.state);
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
            
                <div className="col-md-6" style={{display: 'flex',justifyContent:'flex-end'}}>
                    <form onSubmit={this.onSubmit} style={{flex:0.5}}>
                    
                        <div className="col-lg-12">
                        <TextFieldGroup 
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        >
                        </TextFieldGroup>
                        </div>
                        <div className="col-lg-12">
                        <TextFieldGroup 
                            placeholder="Project Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                        >
                        </TextFieldGroup>
                        </div>
                        <div className="col-lg-12">
                        <TextAreaFieldGroup
                            placeholder="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                        >
                        </TextAreaFieldGroup>
                        </div>
                        <div className="col-lg-12">
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
                    
                        <div className="col-lg-12">
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>  
                       
                        </div>

                    </form>
                    

                </div>
                <div className="col-lg-6">
                      <div className="row">
                      <div className="col-lg-6">
                      
                      {/* <SelectListGroup
                        placeholder="status"
                        name="teammates"
                        type="name"
                        value={this.state.teammate}
                        onChange={this.getTeamList}
                        error={errors.teammate}
                        teammates={this.props.profile.profiles}
                        info="Choose your teammates"
                      >
                      </SelectListGroup> */}

                       <ChooseMembers value={this.state.members} ></ChooseMembers>


                      </div>
                      </div>
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
    projects: state.projects
})

export default connect(mapStateToProps,{addProject,addMember})(withRouter(EditProject));