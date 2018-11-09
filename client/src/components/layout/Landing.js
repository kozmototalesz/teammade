import React from 'react';
import {Link} from 'react-router-dom';


const footer = () => {
    return(
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4 title"> teammade
                    </h1>
                    <p className="lead phrase"> well done </p>
                    <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                </div>
                </div>
            </div>
            </div>
        </div> 
    )
}

export default footer;