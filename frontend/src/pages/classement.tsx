import { useLangue } from "@/components/Layout/LangueContext";
import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saisons } from "@/utils/teams";
import { useState } from "react";

export default function Classement() {
  const { langue } = useLangue();
  const [selectSaison, setSelectedSaison] = useState("all");

  const handleChangeSaison = (value: string) => setSelectedSaison(value);

  const itemSaison =
    selectSaison === "all"
      ? "toutes saisons confondues"
      : `saison ${selectSaison}`;
  const itemSaisonEn = selectSaison === "all" ? "All-season" : `${selectSaison} season`;

  const title = langue ? `Classement ${itemSaison}` : `${itemSaisonEn} ranking`;

  return (
    <Layout title="Classement">
      <div className="bg-quadrille flex flex-col md:flex-row md:justify-between md:items-center px-6 sm:px-8 py-8 sm:py-12 gap-4">
        <div className="font-bold text-2xl sm:text-4xl uppercase italic">
          <h2>{title}</h2>
        </div>
        <div className="flex w-[200px] max-w-[200px] gap-2">
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
      <div className="flex justify-center">
        <Ranking saison={selectSaison} />
      </div>
    </Layout>
  );
}
