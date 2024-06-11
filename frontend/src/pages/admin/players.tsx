import AdminList from "@/components/Admin/List";
import CardCreatePlayer from "@/components/Admin/Create/CardCreatePlayer";
import { useDeletePlayerMutation, usePlayersQuery } from "@/types/graphql";

export default function AdminPlayers() {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];
  const [deletePlayer] = useDeletePlayerMutation();

  const handleDelete = (id: string) => {
    deletePlayer({
      variables: {
        deletePlayerId: id,
      },
      onCompleted: () => {},
    });
  };

  return (
    <AdminList
      title="Joueurs"
      itemType="player"
      items={players}
      onCreateComponent={<CardCreatePlayer />}
      onDelete={handleDelete}
      getItemName={(player) => player.name}
      redirectPath="/admin/goals"
    />
  );
}
