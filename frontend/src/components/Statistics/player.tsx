import { useGetGoalsBySaisonAndPlayerIdQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import { NoGoal } from "../NoGoal";
import { useState, useEffect } from "react";
import LoadingBase from "../Loading";

interface PlayerStatisticsPros {
  playerId: string;
  saison: string;
  name: string;
}

export default function PlayerStatistics({
  playerId,
  saison,
  name,
}: PlayerStatisticsPros) {
  const [loading, setLoading] = useState(true);

  const { data: goalsByPlayerId, loading: goalsLoading } =
    useGetGoalsBySaisonAndPlayerIdQuery({
      variables: {
        type: "buteur",
        playerId: playerId,
        saison: saison,
      },
    });
  const goals = goalsByPlayerId?.getGoalsBySaisonAndPlayerId || [];

  const { data: passesByPlayerId, loading: passesLoading } =
    useGetGoalsBySaisonAndPlayerIdQuery({
      variables: {
        playerId: playerId,
        type: "passeur",
        saison: saison,
      },
    });
  const passes = passesByPlayerId?.getGoalsBySaisonAndPlayerId || [];

  useEffect(() => {
    if (!goalsLoading && !passesLoading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      setLoading(true);
    }
  }, [goalsLoading, passesLoading]);

  if (loading) {
    return <LoadingBase />;
  }

  return (
    <>
      {goals.length > 0 || passes.length > 0 ? (
        <>
          <AgainstMostGoalCard
            playerId={playerId}
            name={name}
            saison={saison}
          />
          <ChartsGoal goals={goals} item="buteur" name={saison} />
          <ChartsGoal goals={passes} item="passeur" name={saison} />
        </>
      ) : (
        <NoGoal />
      )}
    </>
  );
}
