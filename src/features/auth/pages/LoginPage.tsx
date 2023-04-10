import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { useAppDispatch } from "app/hooks";
import { authAction } from "../authSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow:'row nowrap',
        justifyContent:'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    box: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        padding: theme.spacing(3),
        minHeight:'24vh'
    }
}))

export default function LoginPage() {
    const classes = useStyles();
    const dispatch  = useAppDispatch();

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
                    >Fake Login</Button>
                </Box>
            </Paper>
        </div>
    )
}