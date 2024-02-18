import { usePlayersQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toUpOne } from "@/lib/functions";

export default function Ranking() {

    const { data: playersData } = usePlayersQuery();
    const players = playersData?.players || [];

    // ameliorer cette algo pour si nb de buts égaux, mettre dans ordre alphabetique
    const playersFiltre = players.slice().sort((a, b) => {
        return (b.goals?.length || 0) - (a.goals?.length || 0);
    });

    return (
      <div className="rounded-md border">
        <Table className="bg-red-200">
          <TableHeader className="bg-tertiary">
            <TableRow>
              <TableHead>Joueurs</TableHead>
              <TableHead>Buts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playersFiltre.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{toUpOne(player.name)}</TableCell>
                <TableCell>{player.goals?.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  
}