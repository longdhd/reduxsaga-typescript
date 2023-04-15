import { Box, Button } from '@mui/material';
import InputField from 'components/Common/FormFields/InputField';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
export interface StudentFormProps {
    initialValue?: Student,
    onSubmit?: (formValues: Student) => void,
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
    const {
        control,
        handleSubmit
    } = useForm<Student>({
        defaultValues: initialValue
    });

    const handleFormSubmit = (formValues: Student) => {
        console.log(formValues);
    }
    return (
        <Box maxWidth={'360px'}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label='Full name' />
                <InputField name="age" control={control} label='Age' />
                <InputField name="mark" control={control} label='Mark' />
                <InputField name="gender" control={control} label='Gender' />
                <InputField name="city" control={control} label='City' />

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}