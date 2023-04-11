import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect } from "react"
import { dashboardAction, selectHighestMarkList, selectLoading, selectLowestMarkList, selectRankingByCity, selectStats } from "./dashboardSlice";

export function Dashboard() {
  const dispatch = useAppDispatch();
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
    
  },[])
  return (
    <div>
        Dashboard
    </div>
  )
}