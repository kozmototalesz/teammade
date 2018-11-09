import axios from 'axios';


const setAuthToken = token => {
    if(token) {
        //Add to every request
        axios.defaults.headers.common['Authorization'] = token
    } else {
        //Delete Header
        delete axios.defaults.headers.common['Authorization'];

    }

}

export default setAuthToken;