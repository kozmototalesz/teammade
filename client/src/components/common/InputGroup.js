import React from 'react';
import classnames from 'classnames';


const InputGroup = ({
    name,
    placeholder,
    value,
    label,
    errors,
    icon,
    type,
    onChange,
    disabled
}) => {
    return(
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input type={type} 
            className={classnames('form-control form-control-lg', {
                'is-invalid' : errors
            })}
            disabled={disabled}
            
            placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            
            {(<div className="invalid-feedback">{errors}</div>)}

        </div>
    );
};






export default InputGroup;