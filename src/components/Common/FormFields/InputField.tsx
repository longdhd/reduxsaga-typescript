import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    control: Control<any>,
    label: string
}

export default function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    })
    return (
        <TextField
            fullWidth
            margin='normal'
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            variant="standard"
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
}
