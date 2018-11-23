import React from 'react';
import {Link} from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
            <Link to="/add-project" className="btn btn-light">
              <i className="fas fa-briefcase text-info mr-1"></i>
              Add Project</Link>
            <Link to="/statistics" className="btn btn-light">
              <i className="fab fa-black-tie text-info mr-1"></i>
              Statistics</Link>
    </div>
  )
}

export default ProfileActions;