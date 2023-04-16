import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import InputField from 'components/Common/FormFields/InputField';
import RadioGroupField, { RadioOption } from 'components/Common/FormFields/RadioGroupField';
import SelectField from 'components/Common/FormFields/SelectField';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
export interface StudentFormProps {
    initialValue?: Student,
    onSubmit?: (formValues: Student) => void,
}

const schema = yup
    .object()
    .shape({
        name: yup.string().required().test("two-words", "Please enter first and last name with a space between", (value) => {
            if (!value) return true;

            const parts = value.split(' ');
            return parts.filter(x => Boolean(x)).length >= 2;
        }),
        age: yup.number().positive().integer().required().typeError("Please enter a valid number"),
        mark: yup.number().min(0).max(10).required().typeError("Please enter a valid number"),
        gender: yup.string().oneOf(['male', 'female']).required(),
        city: yup.string().required()
    })
    .required();

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const [error, setError] = useState<string>("");
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<Student>({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = async (formValues: Student) => {
        try {
            setError("");
            await onSubmit?.(formValues);
        } catch (error) {
            console.log("Fail to add/edit a student", error);
            if (error instanceof Error)
                setError(error.message);
        }
    }

    const genderOptions: RadioOption[] = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];

    return (
        <Box maxWidth={'360px'}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label='Full name' />
                <InputField name="age" control={control} label='Age' type="number" />
                <InputField name="mark" control={control} label='Mark' type="number" />
                <RadioGroupField name="gender" control={control} label="Gender" options={genderOptions} />
                {(Array.isArray(cityOptions) && cityOptions.length > 0) && <SelectField name="city" control={control} label="City" options={cityOptions} />}
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} />}&nbsp; Save
                    </Button>
                </Box>
                {error && <Alert severity='error'>{error}</Alert>}
            </form>
        </Box>
    );
}
