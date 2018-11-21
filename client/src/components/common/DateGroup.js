import React from 'react';
import classnames from 'classnames';


const DateGroup = ({
    name,
    placeholder,
    value,
    label,
    errors,
    info,
    type,
    onChange,
    disabled
}) => {
    return(
        <div className="form-group">
            <input type={type} 
            className={classnames('form-control form-control-lg', {
                'is-invalid' : errors
            })}
            disabled={disabled}
            
            placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            
            { info && (<small className="from-text text-muted">{info}</small>)}

            {(<div className="invalid-feedback">{errors}</div>)}

        </div>
    );
};


export default DateGroup;