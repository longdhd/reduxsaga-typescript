import { Box, Button, LinearProgress, Theme, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { createStyles, makeStyles } from '@mui/styles';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityActions, selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentFilter from '../components/StudentFilter';
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
  const cityList = useAppSelector(selectCityList);
  const cityMap = useAppSelector(selectCityMap);

  useEffect(() => {
    dispatch(cityActions.fetchCity());
    dispatch(studentActions.fetchStudent(filter));
  }, [dispatch, filter])

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  }

  const handleSearchChange = (filter: ListParams) => {
    dispatch(studentActions.setFilterWithDebouce(filter));
  }

  const handleFilterChange = (filter: ListParams) => {
    dispatch(studentActions.setFilter(filter));
  }

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student.id as string);
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log("Fail to remove student ", error);
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to="/admin/students/add">
          <Button variant='contained' color='primary'>Add New Student</Button>
        </Link>
      </Box>
      {isLoading && <LinearProgress className={classes.loading} />}
      <Box mb={3}>
         <StudentFilter filter={filter} cityList={cityList} onChange={handleFilterChange} onSearchChange={handleSearchChange} />
      </Box>
      <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} />
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