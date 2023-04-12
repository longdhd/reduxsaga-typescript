import { Theme } from '@emotion/react'
import { Box, Paper, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import React, { ReactElement } from 'react'

type StatItemProps = {
  icon: ReactElement,
  label: string,
  value: string | number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'flow nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      padding: '8px 16px',
      border: '1px solid rgba(0, 0, 0, 0.16)'
    }
  })
)

export default function StatItem({ icon, label, value }: StatItemProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant='h5' align='right'>{value}</Typography>
        <Typography variant='caption'>{label}</Typography>
      </Box>
    </Paper>
  )
}