import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Layout from "@/components/Layout/Layout";
import GoalCard from "@/components/Goals/goal.card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Player, useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { PLAYER_BY_ID } from "@/requetes/queries/playerById.queries";
import { SlidersHorizontal, Undo2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ReponseFiltres from "@/components/Filtres/Reponse";
import { toUpOne } from "@/lib/functions";

const stade = "Emirates Stadium";

const filters = {
  Buteur: "Buteur",
  Passeur: "Passeur",
  Stade: "Stade",
};

const lieuOptions = [stade, "Extérieur"];

export default function Home() {
  const { toast } = useToast();

  // tout nos buts
  const { data: goalsData } = useGoalsQuery();
  // tout nos joueurs
  const { data: playersData } = usePlayersQuery();

  // effet sur le nbr de buts
  const [displayGoal, setDisplayGoal] = useState(0);
  // ordre des buts, décroissant par défaut
  const [isFirst, setIsFirst] = useState(true);

  // player sélectionné dans les filtres
  const [selectedButeurId, setSelectedButeurId] = useState("");
  // stade sélectionné dans les filtres
  const [selectStade, setSelectStade] = useState("");
  // passeur sélectionné dans les filtres
  const [selectPasseurId, setSelectedPasseurId] = useState("");

  // button filtre
  const [buttonFiltre, setButtonFiltre] = useState(true);

  // query qui recup le joueur selon son id
  const {
    data: buteurData,
  } = useQuery(PLAYER_BY_ID, {
    variables: { playerId: selectedButeurId },
  });

  const {
    data: passeurData,
  } = useQuery(PLAYER_BY_ID, {
    variables: { playerId: selectPasseurId },
  });

  // reset les filtres
  const handleMaj = () => {
    setSelectedButeurId("");
    setSelectStade("");
    setSelectedPasseurId("");
    setButtonFiltre(true);
    toast({
      title: "Filtre(s) supprimé(s).",
    });
  };

  // nous permet de changer de joueur/stade et l'afficher directement
  const handleSelectChange = (value: string, filter: string) => {
    if (filter === filters.Buteur) {
      console.log(value, filters.Buteur);
      setSelectedButeurId(value === filters.Buteur ? "" : value);
    } else if (filter === filters.Passeur) {
      setSelectedPasseurId(value === filters.Passeur ? "" : value);
    } else if (filter === filters.Stade) {
      setSelectStade(value === "Tout" ? "" : value);
    }
  };

  const getName = (item: Player | any) => {
    return `${item?.firstname} ${item?.lastname}`;
  };

  // contenu de nos selects
  const renderSelectOptions = (filter: string) => {
    switch (filter) {
      case filters.Buteur:
        return (
          <>
            <SelectItem value={filters.Buteur}>Tous les joueurs</SelectItem>
            {playersData?.players.map((p, index) => (
              <SelectItem key={index} value={p.id}>
                {toUpOne(getName(p))}
              </SelectItem>
            ))}
          </>
        );
      case filters.Passeur:
        return (
          <>
            <SelectItem value={filters.Passeur}>Tous les joueurs</SelectItem>
            {playersData?.players.map((p, index) => (
              <SelectItem key={index} value={p.id}>
                {toUpOne(getName(p))}
              </SelectItem>
            ))}
          </>
        );
      case filters.Stade:
        return (
          <>
            <SelectItem value="Tout">Tout</SelectItem>
            {lieuOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  // filtrer les buts en fonction des joueurs et/ou du stade sélectionnés
  const filteredGoals =
    goalsData?.goals.filter((goal) => {
      // on filtre par le joueur si un joueur est sélectionné
      const buteurMatch =
        !selectedButeurId || goal.buteur?.id === selectedButeurId;
      // on filtre par le joueur si un joueur est sélectionné
      const passeurMatch =
        !selectPasseurId || goal.passeur?.id === selectPasseurId;
      // on filtre par le stade si un stade est sélectionné
      const stadeMatch =
        !selectStade ||
        (selectStade === stade && goal.where === stade) ||
        (selectStade === "Extérieur" && goal.where !== stade);
      return buteurMatch && passeurMatch && stadeMatch;
    }) || [];

  // trier dans l'ordre décroissant/croissant
  const goalsFiltre = filteredGoals
    .slice()
    .sort((a, b) => (isFirst ? b.ordre - a.ordre : a.ordre - b.ordre));

  // animation pour le nb de but
  useEffect(() => {
    const interval = setInterval(() => {
      if (displayGoal < goalsFiltre.length) {
        setDisplayGoal(displayGoal + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [goalsFiltre.length, displayGoal]);

  // la valeur du select
  const handleChangeValue = (value: string) => {
    if (value === filters.Buteur) {
      return selectedButeurId;
    } else if (value === filters.Passeur) {
      return selectPasseurId;
    } else if (value === filters.Stade) {
      return selectStade;
    }
  };

  return (
    <Layout title="Accueil">
      <div className="bg-tertiary/20 px-4 flex flex-col">
        <div className="flex p-2 justify-between items-center">
          <h2 className="font-bold text-2xl">{displayGoal} BUTS</h2>
          {goalsFiltre.length > 1 && (
            <Button variant="filtre" onClick={() => setIsFirst(!isFirst)}>
              {isFirst ? (
                <span className="material-symbols-outlined">arrow_upward</span>
              ) : (
                <span className="material-symbols-outlined">
                  arrow_downward
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="p-3 flex">
          {buttonFiltre ? (
            <div className="flex justify-start">
              <Button
                className="flex gap-1"
                variant="filtre"
                onClick={() => setButtonFiltre(false)}
              >
                <SlidersHorizontal width={16} />
                Filtres
              </Button>
            </div>
          ) : (
            <form className="flex justify-between gap-4 flex-col md:flex-row">
              {Object.values(filters).map((filter, index) => (
                <Select
                  key={index}
                  name={filter}
                  onValueChange={(value) => handleSelectChange(value, filter)}
                  value={handleChangeValue(filter)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={filter} />
                  </SelectTrigger>
                  <SelectContent>{renderSelectOptions(filter)}</SelectContent>
                </Select>
              ))}
              <div className="flex">
                {!selectedButeurId && !selectPasseurId && !selectStade && (
                  <Button variant="destructive" onClick={handleMaj}>
                    <Undo2 />
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="flex justify-between items-center p-2">
          <div className="flex gap-1">
            {selectedButeurId && (
              <ReponseFiltres
                data={toUpOne(getName(buteurData?.getPlayerById))}
                onClick={() => setSelectedButeurId("")}
              />
            )}
            {selectPasseurId && (
              <ReponseFiltres
                data={toUpOne(getName(passeurData?.getPlayerById))}
                onClick={() => setSelectedPasseurId("")}
              />
            )}
            {selectStade && (
              <ReponseFiltres
                data={selectStade}
                onClick={() => setSelectStade("")}
              />
            )}
          </div>
          {(selectStade || selectedButeurId || selectPasseurId) && (
            <Button onClick={handleMaj}>
              <X />
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-center my-6">
        {goalsFiltre.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {goalsFiltre.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <div>Aucun but pour le moment...</div>
        )}
      </div>
    </Layout>
  );
}
