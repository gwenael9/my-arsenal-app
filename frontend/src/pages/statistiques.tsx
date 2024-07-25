import { useLangue } from "@/components/Layout/LangueContext";
import Layout from "@/components/Layout/Layout";
import LayoutRankStat from "@/components/Layout/LayoutRankingStats";
import PlayerStatistics from "@/components/Statistics/player";
import { SelectSaison } from "@/components/Statistics/Select/SelectSaison";
import Team from "@/components/Statistics/team";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getName } from "@/lib/functions";
import { usePlayersQuery, useSaisonsQuery } from "@/types/graphql";
import { useState } from "react";

export default function Statistiques() {
  // tout nos joueurs
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  // nos saisons + all
  const { data: saisonData } = useSaisonsQuery();
  const saisons = saisonData?.saisons || [];

  const { langue } = useLangue();

  // par défaut sur l'équipe
  const [selectPlayerId, setSelectedPlayerId] = useState("all");

  // par défaut sur toutes les saisons
  const [selectSaison, setSelectedSaison] = useState("all");

  const handleChangePlayer = (value: string) => setSelectedPlayerId(value);
  const handleChangeSaison = (value: string) => setSelectedSaison(value);

  // nous renvoie le joueur sélectionné dans le select
  const playerToDisplay = players?.filter((player) => {
    return player.id == selectPlayerId;
  });

  // nom du joueur sélectionné
  const name = playerToDisplay.length > 0 ? getName(playerToDisplay[0]) : "";

  // on affiche pas les joueurs avec 0 b/p
  const playersToSelect = players.filter((player) => {
    const nbGoals = player.goals?.length || 0;
    const nbPasses = player.passes?.length || 0;
    return (nbGoals > 0 || nbPasses > 0) && player.lastname !== "csc";
  });

  // titre de notre page
  const title = langue
    ? `Statistiques détaillées ${selectPlayerId !== "all" ? `de ${name}` : ""}`
    : `${selectPlayerId !== "all" ? `${name}` : ""} detailed statistics`;

  return (
    <Layout title="Statistiques">
      <LayoutRankStat title={title}>
        <div className="flex max-w-[350px] md:w-[350px] gap-2">
          <Select
            onValueChange={(value) => handleChangePlayer(value)}
            value={selectPlayerId}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {langue ? "L'équipe" : "Team"}
              </SelectItem>
              {playersToSelect.map((player, index) => (
                <SelectItem key={index} value={player.id}>
                  {getName(player)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectSaison
            value={selectSaison}
            saisons={saisons}
            action={(value) => handleChangeSaison(value)}
          />
        </div>
      </LayoutRankStat>
      <div className="sm:px-12 flex justify-center flex-wrap py-6 gap-4">
        {selectPlayerId == "all" ? (
          <Team saison={selectSaison} />
        ) : (
          <PlayerStatistics
            playerId={selectPlayerId}
            name={name}
            saison={selectSaison}
          />
        )}
      </div>
    </Layout>
  );
}
