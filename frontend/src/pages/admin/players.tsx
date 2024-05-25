import CardCreatePlayer from "@/components/Admin/Create/CardCreatePlayer";
import Layout from "@/components/Admin/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeletePlayerMutation,
  usePlayersQuery,
} from "@/types/graphql";
import { useRouter } from "next/router";

export default function AdminPlayers() {
  const { toast } = useToast();

  const router = useRouter();

  const [deletePlayer] = useDeletePlayerMutation();

  const handleDelete = (id: string) => {
    deletePlayer({
      variables: {
        deletePlayerId: id,
      },
      onCompleted: (data) => {
        if (data.deletePlayer.success) {
          router.reload();
          toast({
            title: data.deletePlayer.message,
          });
        }
      },
    });
  };

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  return (
    <Layout title="Configuration - Joueurs">
      <div className="flex justify-end">
        <Button onClick={() => router.push("/admin/goals")}>Buts</Button>
      </div>

      <div className="flex gap-2">
        <div className="w-1/4">
          <CardCreatePlayer />
        </div>
        <div className="w-3/4">
          <h2>Nombres de joueurs : {players.length}</h2>
          <div className="flex gap-2 w-full">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between p-2 bg-secondary/90 rounded"
              >
                <p>{player.lastname}</p>
                <Button onClick={() => handleDelete(player.id)}>
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
