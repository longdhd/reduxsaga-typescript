import { Box, Theme } from "@mui/material";
import { createStyles, makeStyles } from '@mui/styles';
import { Header, Sidebar } from "components/Common";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '240px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,
      minHeight: '100vh'
    },
    header: {
      gridArea: 'header',
    },

    sidebar: {
      gridArea: 'sidebar',
      borderRight: `1px solid grey`
    },
    main: {
      gridArea: 'main',
      padding: '16px 24px'
    }
  })
)

export function AdminLayout() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  )
}