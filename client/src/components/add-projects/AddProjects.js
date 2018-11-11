import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addProject} from '../../actions/profileActions'

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
            errors:{}
        }
        this.onChange=this.onChange.bind(this);
        //this.onCheck=this.onCheck.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

      
    }

    onSubmit(e){
      e.preventDefault();
      const prData={
        handle:this.state.handle,
        name:this.state.name,
        status:this.state.status,
        description:this.state.description,
        end:this.state.end
      }

      this.props.addProject(prData, this.props.history);

    }

    onChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    componentWillReceiveProps(nextProps){
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
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create your Project</h1>
                    <p className="lead text-center">
                        Please add the details of your project
                    </p>
                   
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
            </div>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps=state=>({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps,{addProject})(withRouter(AddProjects));