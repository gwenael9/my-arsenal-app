import { usePlayersQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toUpOne } from "@/lib/functions";
import { useRouter } from "next/router";

export default function Ranking() {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  // ameliorer cette algo pour si nb de buts égaux, mettre dans ordre alphabetique
  const playersFiltre = players.slice().sort((a, b) => {
    return (b.goals?.length || 0) - (a.goals?.length || 0);
  });

  return (
    <div className="rounded">
      <Table className="bg-tertiary text-white">
        <TableHeader className="">
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Joueurs</TableHead>
            <TableHead>Buts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playersFiltre.map((player) => (
            <TableRow key={player.id}>
              <TableCell className="font-bold w-10">
                1
              </TableCell>
              <TableCell className="font-bold">
                {toUpOne(player.name)}
              </TableCell>
              <TableCell>{player.goals?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
