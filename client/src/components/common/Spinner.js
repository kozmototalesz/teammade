import React from 'react';
import Spinner from './spinner.gif';

export default function spinner() {
  return (
    <div>
        <img src={Spinner} alt="Loading..." style={{width:'150px', margin:'auto',display:'block'}}></img>
    </div>
  )
}
