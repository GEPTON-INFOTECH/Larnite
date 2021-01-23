import React from 'react'
import { TextField } from '@material-ui/core';

function TextFieldComponent({name,type,label,placeholder,className,handleChange,value}) {
    return (
        <TextField 
            required
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            className={className}
            onInput={handleChange}
            value={value}
            required
            variant="outlined" 
            color="primary"
            >
        </TextField>
    )
}

export default TextFieldComponent
