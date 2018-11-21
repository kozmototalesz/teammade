import React from 'react'

const optionsRender=(
    chosen,
    teammates,
    onChange
) => {

    const selectMates=teammates.map(mate=>(
        <option key={mate._id} value={mate.value}>
            {mate.name}
        </option>
    ));

  return (
    <div>
          <input list="teammates"
                className="col-lg-6 custom-select custom-select-sm"
                onChange={onChange}
                value={this.state.member.name}
                placeholder="John Doe"
                name="member"
            >
            </input>

            <datalist id="teammates">
                {selectMates}
            </datalist>
    </div>
  )
}
export default optionsRender;