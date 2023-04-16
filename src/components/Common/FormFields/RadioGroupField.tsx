import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
    label: string,
    value: string | number
}

export interface RadioGroupFieldProps {
    name: string,
    control: Control<any>,
    label: string,
    disabled?: boolean,
    options: RadioOption[]
}

export default function RadioGroupField({ name, control, label, options}: RadioGroupFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    })
    return (
        <FormControl>
            <FormLabel sx={{
                fontSize:'0.8rem'
            }}>{label}</FormLabel>
            <RadioGroup
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                row
            >
                {options.map(option => (
                    <FormControlLabel key={option.value} value={option.value} control={<Radio size='small'/>} label={option.label} />
                ))}
            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
