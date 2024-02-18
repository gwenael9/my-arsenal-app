import Layout from "@/components/Layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { toUpOne } from "@/lib/functions";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  // ameliorer cette algo pour si nb de buts égaux, mettre dans ordre alphabetique
  const playersFiltre = players.slice().sort((a, b) => {
    return (b.goals?.length || 0) - (a.goals?.length || 0);
  })

  return (
    <Layout title="Statistique">
      <h2 className="font-bold text-xl my-4">Classement des meilleurs buteurs</h2>
      <Ranking />
    </Layout>
  );
}

