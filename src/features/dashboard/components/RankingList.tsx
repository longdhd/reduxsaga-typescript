import { Student } from 'models'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

interface RankingListProps {
    studentList: Student[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        // minWidth: 260
    },
  })
)

export default function RankingList({ studentList }: RankingListProps) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Mark</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {studentList.map((row, idx) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {idx + 1}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{row.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}