import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled,
    errors
}) => {
    return(
        <div className="form-group">
            <textarea type={type} 
            className={classnames('form-control form-control-lg', {
                'is-invalid' : error
            })}
            disabled={disabled}
            placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            {info && (<small className="from-text text-muted">{info}</small>)}
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    );
};


export default TextAreaFieldGroup;