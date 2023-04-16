import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
    label: string,
    value: string | number
}

export interface SelectFieldProps {
    name: string,
    control: Control<any>,
    label: string,
    disabled?: boolean,
    options: SelectOptions[]
}

export default function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control
    })
    return (
        <FormControl variant="outlined" size="small" margin='normal' fullWidth disabled={disabled} error={invalid}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                value={value}
                label="Sort by"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}

            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
