const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};
    data.handle=!isEmpty(data.handle) ? data.handle : '';
    data.status=!isEmpty(data.status) ? data.status : '';
    data.skills=!isEmpty(data.skills) ? data.skills : '';

    console.log(data);

    if(!Validator.isLength(data.handle,{min:2,max:40})){
        errors.handle = 'Handle needs to be between 2';
    }
  
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)){ 
        errors.status = 'Status field is required.';
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)  
    }
}