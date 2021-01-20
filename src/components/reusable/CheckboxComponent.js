import { Checkbox } from '@material-ui/core';
import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';

function CheckboxComponent({checked,handleChange,name}) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                            name={name}
                            onChange={($event) => handleChange($event)}
                            value={checked}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />        
            }
            label={name}
      />
        
    )
}

export default CheckboxComponent;
