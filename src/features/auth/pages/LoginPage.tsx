import { Box, Button, CircularProgress, Paper, Theme, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authAction } from "../authSlice";
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 36,
        minHeight: '24vh'
    },
  })
)

export default function LoginPage() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging);
    const handleLoginClick = () => {
        dispatch(
            authAction.login({
                username: '',
                password: ''
            })
        )
    }
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">Student Management</Typography>
                <Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                    >Fake Login &nbsp; {isLogging && <CircularProgress size={20} color="secondary" />}</Button>
                </Box>
            </Paper>
        </div>
    )
}