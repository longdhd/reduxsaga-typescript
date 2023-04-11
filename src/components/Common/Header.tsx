import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { authAction } from "features/auth/authSlice";

export function Header() {
    const dispatch = useAppDispatch();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
                        Student Management
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => dispatch(authAction.logout())}
                    >Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}