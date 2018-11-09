import React from 'react';
import classnames from 'classnames';


const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return(
        <div className="form-group">
            <input type={type} 
            className={classnames('form-control form-control-lg', {
                'is-invalid' : error
            })}
            disabled={disabled}
            
            placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            
            {error && (<small className="from-text text-muted">{info}</small>)}

            {error && (<div className="invalid-feedback">{error}</div>)}

        </div>
    );
};


export default TextFieldGroup;