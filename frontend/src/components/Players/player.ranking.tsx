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
    Ukraine: "ua",
    Allemagne: "de",
    Egypte: "eg",
    Ghana: "gh",
    Italie: "it",
    Japon: "jp",
    Pologne: "pl",
    Portugal: "pt",
  };

  const flagCountry = (country: string) => flags[country] || "";

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const playersFiltre = players.slice().sort((a, b) => {
    // Si le nombre de buts est différent, trie par ordre décroissant
    if (b.goals?.length !== a.goals?.length) {
      return (b.goals?.length || 0) - (a.goals?.length || 0);
    } else {
      // Sinon, trie par le nombre de passes si le nombre de buts est égal
      return (b.passes?.length || 0) - (a.passes?.length || 0);
    }
  });

  // on affiche pas les joueurs avec 0 b/p 
  const playersFiltreAgain = playersFiltre.filter((player) => {
    const nbGoals = player.goals?.length || 0;
    const nbPasses = player.passes?.length || 0;
    return nbGoals > 0 || nbPasses > 0;
  })

  return (
    <Table className="bg-tertiary/90 text-white">
      <TableHeader className="bg-tertiary">
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Joueurs</TableHead>
          <TableHead>Buts</TableHead>
          <TableHead>Passes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playersFiltreAgain.map((player, index) => (
          <TableRow key={index}>
            <TableCell className="font-bold w-10">{index + 1}.</TableCell>
            <TableCell className="font-bold flex items-center gap-2 justify-center">
              {flagCountry(player.country) && (
                <img
                  src={`https://flagcdn.com/${flagCountry(player.country)}.svg`}
                  alt={player.country}
                  className="w-4"
                />
              )}
              <div>{toUpOne(player.name)}</div>
            </TableCell>
            <TableCell>{player.goals?.length}</TableCell>
            <TableCell>{player.passes?.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
