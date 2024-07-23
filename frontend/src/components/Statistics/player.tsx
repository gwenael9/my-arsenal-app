import { PLAYER_BY_ID } from "@/requetes/queries/playerById.queries";
import { Player, useGetGoalsBySaisonAndPlayerIdQuery } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import AgainstMostGoalCard from "./Team/against.card";
import { getName } from "@/lib/functions";
import ChartsGoal from "./Team/charts.goals";
import { useLangue } from "../Layout/LangueContext";

interface PlayerStatisticsPros {
  playerId: string;
  saison: string;
}

export default function PlayerStatistics({
  playerId,
  saison,
}: PlayerStatisticsPros) {

  const { langue } = useLangue();

  // query qui recup le joueur selon son id
  const { data: playerData } = useQuery(PLAYER_BY_ID, {
    variables: { playerId: playerId },
  });
  const player: Player = playerData?.getPlayerById;

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
    return <div className="text-center mt-4">{langue ? "Aucun but pour le moment..." : "No goal yet..."}</div>;
  }

  return (
    <>
      <AgainstMostGoalCard
        playerId={playerId}
        name={getName(player)}
        saison={saison}
      />
      <ChartsGoal goals={goals} item="buteur" saison={saison} />
      <ChartsGoal goals={passes} item="passeur" saison={saison} />
    </>
  );
}
