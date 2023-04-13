import { Box, Button, LinearProgress, Theme, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentFiler, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      paddingTop: 8
    },

    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },

    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24
    },

    loading: {
      position: 'absolute',
      top: -8
    }
  })
)
export default function StudentList() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStudentLoading);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFiler);

  useEffect(() => {
    dispatch(studentActions.fetchStudent(filter));
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    e.preventDefault();
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  }

  console.log("studentList", studentList);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant='contained' color='primary'>Add New Student</Button>
      </Box>
      {isLoading && <LinearProgress className={classes.loading}/>}
      <StudentTable studentList={studentList} />
      <Box className={classes.pagination}>
        <Pagination
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlePageChange}
          color="primary" />
      </Box>
    </Box>
  );
}