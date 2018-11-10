import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';

 class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            handle:'',
            status:'',
            skills:'',
            organization:'',
            workinghours:'',
            projects:''
        }
    }

  render() {
    return (
      <div className="create-profle">
        <div className="containter">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit you profile</h1>
                    <p className="lead text-center">
                        Please add your missing informations
                    </p>
                    
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors:state.errors

})

export default connect(null)(CreateProfile);