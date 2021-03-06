import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }

    onChange(e){
        this.setState(
            {[e.target.name]:e.target.value
            }
        )
    }

    onSubmit(e){
        e.preventDefault(); 

       const userData={
        email: this.state.email,
        password:this.state.password,
       }

       this.props.loginUser(userData)
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push("/dashboard");
        }


        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
    }

  render() {
    const {errors} = this.state;

    return (
        <div>
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log in</h1>
                    <p className="lead text-center">work as never before</p>
                    <div style={{display: 'flex', justifyContent: 'center'}} className="text-center">
                    
                    <form onSubmit={this.onSubmit} style={{width:'40%'}}>

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

                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);
