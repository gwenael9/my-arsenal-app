import { useLangue } from "@/components/Layout/LangueContext";
import Layout from "@/components/Layout/Layout";
import LayoutRankStat from "@/components/Layout/LayoutRankingStats";
import Ranking from "@/components/Players/player.ranking";
import { SelectSaison } from "@/components/Statistics/Select/SelectSaison";
import { useSaisonsQuery } from "@/types/graphql";
import { useState } from "react";

export default function Classement() {
  const { langue } = useLangue();
  const [selectSaison, setSelectedSaison] = useState("all");

  // nos saisons + all
  const { data: saisonData } = useSaisonsQuery();
  const saisons = saisonData?.saisons || [];

  const handleChangeSaison = (value: string) => setSelectedSaison(value);

  const itemSaison =
    selectSaison === "all"
      ? "toutes saisons confondues"
      : `saison ${selectSaison}`;
  const itemSaisonEn =
    selectSaison === "all" ? "All-season" : `${selectSaison} season`;

  const title = langue ? `Classement ${itemSaison}` : `${itemSaisonEn} ranking`;

  return (
    <Layout title="Classement">
      <LayoutRankStat title={title}>
        <div className="flex w-[200px] max-w-[200px] gap-2">
          <SelectSaison
            value={selectSaison}
            saisons={saisons}
            action={(value) => handleChangeSaison(value)}
          />
        </div>
      </LayoutRankStat>
      <div className="flex justify-center">
        <Ranking saison={selectSaison} />
      </div>
    </Layout>
  );
}
