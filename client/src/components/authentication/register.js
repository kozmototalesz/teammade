import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
    constructor(){
        super();
        this.state={
            name: '',
            email:'',
            password:'',
            password2:'',
            errors:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e){
        console.log(e.target.name);
        this.setState(
            {[e.target.name]:e.target.value
            }
        )
    }


    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault(); 

       const newUser={
        name:this.state.name,
        email: this.state.email,
        password:this.state.password,
        password2: this.state.password2
       }

       this.props.registerUser(newUser,this.props.history); 
    }

  render() {
    
        const errors = this.state.errors;
   
    return (
        <div>
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">create your job account</p>
                    <form noValidate onSubmit={this.onSubmit}>
                        <TextFieldGroup placeholder="Name"
                            name="name"
                            type="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            errors={errors.name}
                        />

                         <TextFieldGroup placeholder="Email address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            errors={errors.email}
                        />

                         <TextFieldGroup placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            errors={errors.password}
                        />

                         <TextFieldGroup placeholder="Confirm Password"
                            name="password2"
                            type="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                            errors={errors.password2}
                        />

                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors

});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
 