import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Layout from "@/components/Layout/Layout";
import GoalCard from "@/components/Goals/goal.card";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Player, useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { PLAYER_BY_ID } from "@/requetes/queries/playerById.queries";
import { SlidersHorizontal, Undo2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ReponseFiltres from "@/components/Filtres/Reponse";
import { toUpOne } from "@/lib/functions";
import FormFilters from "@/components/Filtres/Form";
import Image from "next/image";

const stade = "Emirates Stadium";

export const filters = {
  Buteur: "Buteur",
  Passeur: "Passeur",
  Stade: "Stade",
  Competition: "Competition",
};

const lieuOptions = [stade, "Extérieur"];

const Competition = [
  "Premier League",
  "Champions League",
  "FA Cup",
  "EFL Cup",
  "Community Shield",
];

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
  // competition sélectionné dans les filtres
  const [selectCompetition, setSelectedCompetition] = useState("");

  // button filtre
  const [buttonFiltre, setButtonFiltre] = useState(true);

  // query qui recup le joueur selon son id
  const { data: buteurData } = useQuery(PLAYER_BY_ID, {
    variables: { playerId: selectedButeurId },
  });

  const { data: passeurData } = useQuery(PLAYER_BY_ID, {
    variables: { playerId: selectPasseurId },
  });

  // reset les filtres
  const handleMaj = (item?: string) => {
    setSelectedButeurId("");
    setSelectStade("");
    setSelectedPasseurId("");
    setSelectedCompetition("");
    setButtonFiltre(true);
    if (item == "toast") {
      toast({
        title: "Filtre(s) supprimé(s).",
        variant: "delete",
      });
    }
  };

  // nous permet de changer de joueur/stade et l'afficher directement
  const handleSelectChange = (value: string, filter: string) => {
    setDisplayGoal(0);
    if (filter === filters.Buteur) {
      setSelectedButeurId(value === filters.Buteur ? "" : value);
    } else if (filter === filters.Passeur) {
      setSelectedPasseurId(value === filters.Passeur ? "" : value);
    } else if (filter === filters.Stade) {
      setSelectStade(value === "Tout" ? "" : value);
    } else if (filter === filters.Competition) {
      setSelectedCompetition(value === "Tout" ? "" : value);
    }
  };

  const getName = (item: Player | any) => {
    return `${item?.firstname} ${item?.lastname}`;
  };

  // tout nos joueurs sans csc
  const playersWithoutCsc = playersData?.players.filter((player) => {
    return player.lastname !== "csc";
  });

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
            {playersWithoutCsc?.map((p, index) => (
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
                <div className="flex gap-2">
                  {/* <Image
                    src={option == stade ? "home.svg" : "out.svg"}
                    height={0}
                    width={12}
                    alt={option}
                  /> */}
                  {option}
                </div>
              </SelectItem>
            ))}
          </>
        );
      case filters.Competition:
        return (
          <>
            <SelectItem value="Tout">Tout</SelectItem>
            {Competition.map((option, index) => (
              <SelectItem key={index} value={option}>
                <div className="flex gap-2">
                  <Image
                    src={`${option}.svg`}
                    height={0}
                    width={option == "FA Cup" ? 20 : 12}
                    alt={option}
                    className={option == "FA Cup" ? "-m-1" : ""}
                  />
                  {option}
                </div>
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
      // on filtre par la competition si une competition est sélectionnée
      const competitionMatch =
        !selectCompetition || goal.competition == selectCompetition;
      return buteurMatch && passeurMatch && stadeMatch && competitionMatch;
    }) || [];

  // trier dans l'ordre décroissant/croissant
  const goalsFiltre = filteredGoals
    .slice()
    .sort((a, b) => (isFirst ? b.ordre - a.ordre : a.ordre - b.ordre));

  // animation pour le nb de but
  useEffect(() => {
    const interval = setInterval(() => {
      if (displayGoal < goalsFiltre.length) {
        setDisplayGoal((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [goalsFiltre]);

  // la valeur du select
  const handleChangeValue = (value: string) => {
    if (value === filters.Buteur) {
      return selectedButeurId;
    } else if (value === filters.Passeur) {
      return selectPasseurId;
    } else if (value === filters.Stade) {
      return selectStade;
    } else if (value === filters.Competition) {
      return selectCompetition;
    }
  };

  return (
    <Layout title="Accueil">
      <div className="px-4 flex flex-col border-b bg-quadrille">
        <div className="flex p-2 justify-between items-center">
          <h2 className="font-bold text-3xl">
            <span className="text-primary">{displayGoal}</span> BUTS
          </h2>
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

        <div className="p-2 flex sm:hidden">
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
            <FormFilters
              handleSelectChange={handleSelectChange}
              handleChangeValue={handleChangeValue}
              renderSelectOptions={renderSelectOptions}
              selectCompetition={selectCompetition}
              selectPasseurId={selectPasseurId}
              selectStade={selectStade}
              selectedButeurId={selectedButeurId}
              handleMaj={handleMaj}
            />
          )}
        </div>

        <div className="p-2 hidden sm:flex">
          <FormFilters
            handleSelectChange={handleSelectChange}
            handleChangeValue={handleChangeValue}
            renderSelectOptions={renderSelectOptions}
            selectCompetition={selectCompetition}
            selectPasseurId={selectPasseurId}
            selectStade={selectStade}
            selectedButeurId={selectedButeurId}
            handleMaj={handleMaj}
          />
        </div>

        <div className="flex justify-between items-center p-2">
          <div className="flex gap-1 flex-wrap sm:flex-row">
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
            {selectCompetition && (
              <ReponseFiltres
                data={selectCompetition}
                onClick={() => setSelectedCompetition("")}
              />
            )}
          </div>
          {(selectStade ||
            selectedButeurId ||
            selectPasseurId ||
            selectCompetition) && (
            <Button onClick={() => handleMaj("toast")}>
              <X />
            </Button>
          )}
        </div>
      </div>

      <div className="my-6 sm:mx-12">
        {goalsFiltre.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {goalsFiltre.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <div className="text-center">Aucun but pour le moment...</div>
        )}
      </div>
    </Layout>
  );
}
