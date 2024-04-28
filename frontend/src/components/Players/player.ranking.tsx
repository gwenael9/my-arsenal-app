import { usePlayersQuery } from "@/types/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toUpOne } from "@/lib/functions";

export default function Ranking() {
  const flags: { [key: string]: string } = {
    Angleterre: "gb-eng",
    France: "fr",
    Norvège: "no",
    Brésil: "br",
    Belgique: "be",
  };

  const flagCountry = (country: string) => flags[country] || "";

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
          {playersFiltre.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold w-10">{index + 1}</TableCell>
              <TableCell className="font-bold flex items-center gap-2 justify-center">
                {flagCountry(player.country) && (
                  <img
                    src={`https://flagcdn.com/${flagCountry(
                      player.country
                    )}.svg`}
                    alt={player.country}
                    className="w-4"
                  />
                )}
                <div>{toUpOne(player.name)}</div>
              </TableCell>
              <TableCell>{player.goals?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
