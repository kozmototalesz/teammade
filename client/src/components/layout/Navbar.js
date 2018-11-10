import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearProfile} from '../../actions/profileActions';


class Navbar extends Component{

    onLogoutClick(event){
        event.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
    }


    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks=(

            <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
                <div onClick={this.onLogoutClick.bind(this)} className="nav-link">
                <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px', marginRight:'5px'}}></img>
                Logout
                </div>
            </li>
            </ul>
        );

        const guestLinks=(
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/login" >Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register" >Sign up
                </Link>
            </li>
            </ul>

        );

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                    <a className="navbar-brand" href="/">teammade</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}


const mapStateToProps  = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps,{logoutUser,clearProfile})(Navbar);