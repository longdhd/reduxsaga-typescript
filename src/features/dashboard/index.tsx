import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect } from "react"
import StatItem from "./components/StatItem";
import { dashboardAction, selectHighestMarkList, selectLoading, selectLowestMarkList, selectRankingByCity, selectStats } from "./dashboardSlice";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import Widget from "./components/Widget";
import RankingList from "./components/RankingList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      paddingTop: '8px'
    },

    loading: {
      position: 'absolute',
      top: '-8px',
      width: '100%',
    }
  })
)

export function Dashboard() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const loading = useAppSelector(selectLoading);
  const stats = useAppSelector(selectStats);
  const highestMarkList = useAppSelector(selectHighestMarkList);
  const lowestMarkList = useAppSelector(selectLowestMarkList);
  const rankingByCity = useAppSelector(selectRankingByCity);
  console.log({
    loading,
    stats,
    highestMarkList,
    lowestMarkList,
    rankingByCity
  })

  useEffect(() => {
    dispatch(dashboardAction.fetchData());

  }, [dispatch])

  return (
    <Box className={classes.root}>

      {loading && <LinearProgress className={classes.loading} />}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <StatItem
            icon={<ManIcon fontSize="large" color="primary" />}
            label="Male"
            value={stats.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatItem
            icon={<WomanIcon fontSize="large" color="primary" />}
            label="Female"
            value={stats.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatItem
            label="Mark >= 8"
            icon={<ArrowUpwardIcon fontSize="large" color="primary" />}
            value={stats.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatItem
            icon={<ArrowDownwardIcon fontSize="large" color="primary" />}
            label="Mark <= 5"
            value={stats.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4" textAlign={'center'}>All Students</Typography>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={6}>
            <Widget title="Highest marked Students">
              <RankingList studentList={highestMarkList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6}>
            <Widget title="Lowest marked Students">
              <RankingList studentList={lowestMarkList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" textAlign={'center'}>Rankings by City</Typography>
        <Grid container spacing={3} mt={1}>
          {rankingByCity.map(ranking => (
            <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
              <Widget title={ranking.cityName}>
                <RankingList studentList={ranking.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}