import { Box, Button, Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import { Student } from 'models';
import * as React from 'react';
import { capitalizeString, setMarkColor } from 'utils/common';

interface StudentTableProps {
    studentList: Student[],
    onEdit?: (student: Student) => void,
    onRemove?: (studentId: string | undefined) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            // minWidth: 260
        },

        edit: {
            marginRight: "12px !important"
        }
    })
)

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {studentList.map((student) => (
                        <TableRow
                            key={student.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="left">
                                {student.id}
                            </TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{capitalizeString(student.gender)}</TableCell>
                            <TableCell>
                                <Box color={setMarkColor(student.mark)} fontWeight={'bold'}>
                                    {student.mark}
                                </Box>
                            </TableCell>
                            <TableCell>{capitalizeString(student.city)}</TableCell>
                            <TableCell align='right'>
                                <Button
                                    className={classes.edit}
                                    variant='outlined' color="primary"
                                    onClick={() => onEdit?.(student)}
                                >Edit</Button>
                                <Button
                                    variant='outlined' color="warning"
                                    onClick={() => onRemove?.(student.id)}
                                >Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}