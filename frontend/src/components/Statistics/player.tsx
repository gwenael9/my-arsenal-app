import { useGetGoalsBySaisonAndPlayerIdQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import { NoGoal } from "../NoGoal";

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

  const { data: goalsByPlayerId } = useGetGoalsBySaisonAndPlayerIdQuery({
    variables: {
      type: "buteur",
      playerId: playerId,
      saison: saison,
    },
  });
  const goals = goalsByPlayerId?.getGoalsBySaisonAndPlayerId || [];

  const { data: passesByPlayerId } = useGetGoalsBySaisonAndPlayerIdQuery({
    variables: {
      playerId: playerId,
      type: "passeur",
      saison: saison,
    },
  });
  const passes = passesByPlayerId?.getGoalsBySaisonAndPlayerId || [];

  if (goals.length == 0 && passes.length == 0) {
    return <NoGoal />;
  }

  return (
    <>
      <AgainstMostGoalCard playerId={playerId} name={name} saison={saison} />
      <ChartsGoal goals={goals} item="buteur" name={saison} />
      <ChartsGoal goals={passes} item="passeur" name={saison} />
    </>
  );
}
