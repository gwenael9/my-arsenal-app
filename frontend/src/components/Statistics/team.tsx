import { useGetGoalsBySaisonQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import StadeGoals from "./charts.where";
import { NoGoal } from "../NoGoal";
import { useEffect, useState } from "react";
import LoadingBase from "../Loading";

interface TeamProps {
  saison: string;
}

export default function Team({ saison }: TeamProps) {
  const [loading, setLoading] = useState(true);
  const { data, loading: loadingData } = useGetGoalsBySaisonQuery({
    variables: { saison: saison },
  });
  const goals = data?.getGoalsBySaison || [];

  useEffect(() => {
    if (!loadingData) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      setLoading(true);
    }
  }, [loadingData]);

  if (loading) {
    return <LoadingBase />;
  }

  if (goals.length == 0) {
    return <NoGoal />;
  }

  return (
    <>
      <AgainstMostGoalCard saison={saison} />
      <ChartsGoal goals={goals} name={saison} />
      <StadeGoals goals={goals} saison={saison} />
    </>
  );
}
