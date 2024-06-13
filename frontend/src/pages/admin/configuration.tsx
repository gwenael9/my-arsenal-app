import CardCreateGoal from "@/components/Admin/Create/Card.create.goal";
import CardCreatePlayer from "@/components/Admin/Create/Card.create.player";
import Etiquettes from "@/components/Admin/Etiquettes";
import Layout from "@/components/Admin/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LIST_GOALS } from "@/requetes/queries/goal.queries";
import { LIST_PLAYERS } from "@/requetes/queries/player.queries";
import {
  useDeleteGoalMutation,
  useDeletePlayerMutation,
  useGoalsQuery,
  usePlayersQuery,
} from "@/types/graphql";
import { useState } from "react";

export default function AdminGoals() {
  // par défaut goals
  const [isGoalOrPlayer, setIsGoalOrPlayer] = useState(true);

  const { toast } = useToast();

  const handleSwith = () => {
    setIsGoalOrPlayer(!isGoalOrPlayer);
  };

  const { data: goalsData } = useGoalsQuery();
  const goals = goalsData?.goals || [];
  const [deleteGoal] = useDeleteGoalMutation();

  const handleDeleteGoal = (id: string) => {
    deleteGoal({
      variables: {
        deleteGoalId: id,
      },
      refetchQueries: [{ query: LIST_GOALS}],
      onCompleted: () => {
        toast({
          title: "But supprimée avec succès !",
        });
      },
    });
  };

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];
  const [deletePlayer] = useDeletePlayerMutation();

  const handleDeletePlayer = (id: string) => {
    deletePlayer({
      variables: {
        deletePlayerId: id,
      },
      refetchQueries: [{ query: LIST_PLAYERS}],
      onCompleted: () => {
        toast({
          title: "Joueur supprimée avec succès !",
        })
      },
    });
  };

  return (
    <Layout title="Configuration">
      <div className="flex justify-end sm:justify-between items-center py-4">
        <h2 className="font-bold text-xl sm:text-2xl hidden sm:block">
          Nombres de {isGoalOrPlayer ? `buts : ${goals.length}` : `joueurs : ${players.length-1}`} 
        </h2>
        <Button variant={"filtre"} onClick={handleSwith}>
          {isGoalOrPlayer ? "Joueurs" : "Buts"}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex justify-center">
          {isGoalOrPlayer ? <CardCreateGoal /> : <CardCreatePlayer />}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-0">
            {isGoalOrPlayer ? (
              goals.map((goal, index) => (
                <Etiquettes key={index} handleDelete={handleDeleteGoal} goal={goal} />
              ))
            ) : (
              players.map((player, index) => (
                <Etiquettes key={index} handleDelete={handleDeletePlayer} player={player} />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
