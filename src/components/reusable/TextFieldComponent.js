import React from 'react'
import { TextField } from '@material-ui/core';

function TextFieldComponent(
    {   name,
        type,
        label,
        placeholder,
        className,
        handleChange,
        value,disabled = false}) {
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
            disabled={disabled}
            variant="outlined" 
            color="primary"
            >
        </TextField>
    )
}

export default TextFieldComponent
