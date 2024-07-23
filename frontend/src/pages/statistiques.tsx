import { useLangue } from "@/components/Layout/LangueContext";
import Layout from "@/components/Layout/Layout";
import PlayerStatistics from "@/components/Statistics/player";
import Team from "@/components/Statistics/team";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getName } from "@/lib/functions";
import { usePlayersQuery } from "@/types/graphql";
import { saisons } from "@/utils/teams";
import { useState } from "react";

export default function Statistiques() {
  // tout nos joueurs
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const { langue } = useLangue();

  // par défaut sur l'équipe
  const [selectPlayerId, setSelectedPlayerId] = useState("all");

  const [selectSaison, setSelectedSaison] = useState("all");

  const handleChangePlayer = (value: string) => {
    setSelectedPlayerId(value);
  };

  const playerToDisplay = players?.filter((player) => {
    return player.id == selectPlayerId;
  });

  const name = playerToDisplay?.map((players) => getName(players));

  // on affiche pas les joueurs avec 0 b/p
  const playersToSelect = players.filter((player) => {
    const nbGoals = player.goals?.length || 0;
    const nbPasses = player.passes?.length || 0;
    return (nbGoals > 0 || nbPasses > 0) && player.lastname !== "csc";
  });

  const handleChangeSaison = (value: string) => {
    setSelectedSaison(value);
  }

  const title = langue 
    ? `Statistiques détaillées ${selectPlayerId !== "all" ? `de ${name}` : ""}`
    : `${selectPlayerId !== "all" ? `${name}` : ""} detailed statistics`;

  return (
    <Layout title="Statistiques">
      <div className="h-[calc(100vh-80px)]">
        <div className="bg-quadrille flex flex-col md:flex-row md:justify-between md:items-center px-6 sm:px-8 py-8 sm:py-12 gap-4">
          <div className="font-bold text-2xl sm:text-4xl uppercase italic">
            <h2>{title}</h2>
          </div>
          <div className="flex max-w-[350px] md:w-[350px] gap-2">
            <Select
              onValueChange={(value) => handleChangePlayer(value)}
              value={selectPlayerId}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{langue ? "L'équipe" : "Team"}</SelectItem>
                {playersToSelect.map((player, index) => (
                  <SelectItem key={index} value={player.id}>
                    {getName(player)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => handleChangeSaison(value)}
              value={selectSaison}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{langue ? "Tout" : "All"}</SelectItem>
                {saisons.map((saison, index) => (
                  <SelectItem key={index} value={saison}>
                    {saison}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="sm:px-12 flex justify-center flex-wrap py-6 gap-4">
          {selectPlayerId == "all" ? (
            <Team saison={selectSaison} />
          ) : (
            <PlayerStatistics playerId={selectPlayerId} saison={selectSaison} />
          )}
        </div>
      </div>
    </Layout>
  );
}
