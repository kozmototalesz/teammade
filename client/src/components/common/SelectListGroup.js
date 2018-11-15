import React from 'react';
import classnames from 'classnames';

const SelectListGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled,
    teammates,
    selectMates,
    errors
}) => {

    if(teammates){
    selectMates=teammates.map(mate=>(
        <option key={mate._id} value={mate.value}>
            {mate.name}
        </option>
    ));
    }


    return(
        <div className="form-group col-lg-12">
                    {(<p><small className="from-text text-muted">{info}</small></p>)}
            <div className="row">
            <input list="teammates" value="" class="col-lg-6 custom-select custom-select-sm"

            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            placeholder="John Doe"
            >
            </input>

            <datalist id="teammates">
            {selectMates}
            </datalist>

            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
        </div>
    );
};



export default SelectListGroup;