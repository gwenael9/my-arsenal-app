import CardCreateGoal from "@/components/Admin/Create/Card.create.goal";
import Layout from "@/components/Admin/Layout";
import ModalCreate from "@/components/Admin/modal.create";
import TableAdmin from "@/components/Admin/table.admin";
import { toast } from "@/components/ui/use-toast";
import { CREATE_PLAYER } from "@/requetes/mutations/create.player.mutation";
import { LIST_PLAYERS } from "@/requetes/queries/player.queries";
import {
  CreatePlayerMutation,
  CreatePlayerMutationVariables,
  InputCreatePlayer,
  usePlayersQuery,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Config() {
  const router = useRouter();
  const config = router.query.config;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const [createPlayer] = useMutation<
    CreatePlayerMutation,
    CreatePlayerMutationVariables
  >(CREATE_PLAYER, {
    refetchQueries: [{ query: LIST_PLAYERS }],
    onCompleted: () => {
      toast({
        title: "Joueur créé avec succès !",
      });
      setIsModalOpen(false);
    },
    onError(error) {
      toast({
        title: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputCreatePlayer;
    if (data.lastname) {
      createPlayer({
        variables: {
          infos: {
            firstname: data.firstname,
            lastname: data.lastname,
            country: data.country,
          },
        },
      });
    } else {
      toast({
        title: "Champ incomplet !",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout title={`Configuration - ${config}`}>
      <div className="flex justify-between">
        <div>
          <h2 className="uppercase font-bold text-xl sm:text-2xl">
            Configuration - {config}
          </h2>
          <p>
            Nombres de {config} : {players.length}
          </p>
        </div>
        <ModalCreate
          onConfirm={handleSubmit}
          isOpen={isModalOpen}
          onChange={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
      <div className="mt-4 flex justify-center">
        {config === "joueurs" ? <TableAdmin data={players} /> : <CardCreateGoal nbGoals={136} />}
      </div>
    </Layout>
  );
}
