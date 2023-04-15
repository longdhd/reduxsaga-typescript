import { Box, Button, Theme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, setMarkColor } from 'utils/common';
import { Link, useResolvedPath } from 'react-router-dom';


interface StudentTableProps {
    studentList: Student[],
    cityMap: {
        [key: string]: City
    }
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void
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

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();
    const url = useResolvedPath("").pathname;
    const [open, setOpen] = useState(false);
    const [studentToRemove, setStudentToRemove] = useState<Student>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        setStudentToRemove(student);
        setOpen(true);
    }

    const handleRemoveConfirm = (student: Student) => {
        setOpen(false);
        onRemove?.(student);
    }
    return (
        <>
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
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align='right'>
                                    <Link to={`${url}/${student.id}`}>
                                        <Button
                                            className={classes.edit}
                                            variant='outlined' color="primary"
                                            onClick={() => onEdit?.(student)}
                                        >Edit</Button>
                                    </Link>
                                    <Button
                                        variant='outlined' color="warning"
                                        onClick={() => handleRemoveClick(student)}
                                    >Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {`Remove a student names ${studentToRemove?.name}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure, mate? This action&apos;t be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={() => handleRemoveConfirm(studentToRemove as Student)} autoFocus color="warning">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}