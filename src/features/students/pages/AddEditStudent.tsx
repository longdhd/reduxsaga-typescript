import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const useStyles = makeStyles(() =>
  createStyles({
    backButtonContainer: {
      display: 'flex',
      alignItems: 'center'
    }
  })
)

export default function AddEditStudent() {
  const { studentId } = useParams();
  const onEdit = Boolean(studentId);
  const classes = useStyles();
  const [student, setStudent] = useState<Student>();
  console.log(student)
  useEffect(() => {
    if (!studentId) return;

    (async () => {
      const response: Student = await studentApi.getById(studentId);
      setStudent(response);
    })()
  }, [studentId])

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleFormSubmit = (formValue: Student) => {

  }

  return (
    <>

      <Box>
        <NavLink to="/admin/students">
          <Typography className={classes.backButtonContainer}><ChevronLeft /> Back to Student List</Typography>
        </NavLink>
      </Box>

      <Typography variant='h4' mt={1}>{onEdit ? `Update student info` : `Add new student`}</Typography>
      <Box>
        {(!onEdit || Boolean(student)) && (<StudentForm initialValue={initialValue} onSubmit={handleFormSubmit} />)}
      </Box>
    </>

  );
}
