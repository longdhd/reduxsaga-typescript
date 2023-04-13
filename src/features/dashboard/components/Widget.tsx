import { Box, Paper, Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import React from 'react'

interface WidgetProps {
    title: string,
    children: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '16px',
            border: '1px solid rgba(0, 0, 0, 0.16)'

        }
    })
)

export default function Widget({ title, children }: WidgetProps) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography variant='button' textAlign="center">{title}</Typography>

            <Box mt={2}>
                {children}
            </Box>
        </Paper>
    )
}