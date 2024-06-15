import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Layout from "@/components/Layout/Layout";
import GoalCard from "@/components/Goals/goal.card";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { PLAYER_BY_ID } from "@/requetes/queries/playerById.queries";
import { ArrowDown, ArrowUp, SlidersHorizontal, Undo2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ReponseFiltres from "@/components/Filtres/Reponse";
import { getName, toUpOne } from "@/lib/functions";
import FormFilters from "@/components/Filtres/Form";
import Image from "next/image";
import { competitions, teams } from "@/utils/teams";

const stade = "Emirates Stadium";

export const filters = {
  Buteur: "Buteur",
  Passeur: "Passeur",
  Stade: "Stade",
  Competition: "Competition",
  Adversaire: "Adversaire",
};

const lieuOptions = [stade, "Extérieur"];

export default function Home() {
  const { toast } = useToast();

  // tout nos buts
  const { data: goalsData } = useGoalsQuery();
  // tout nos joueurs
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players;

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
  // equipe sélectionné dans les filtres
  const [selectTeam, setSelectTeam] = useState("");

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
    setSelectTeam("");
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
    } else if (filter === filters.Adversaire) {
      setSelectTeam(value === "Tout" ? "" : value);
    }
  };

  // tout nos joueurs sans csc
  const playersWithoutCsc = players?.filter((player) => {
    return player.lastname !== "csc";
  });

  // contenu de nos selects
  const renderSelectOptions = (filter: string) => {
    switch (filter) {
      case filters.Buteur:
        return (
          <>
            <SelectItem value={filters.Buteur}>Tous les joueurs</SelectItem>
            {players?.map((p, index) => {
              if (selectPasseurId && p.id == selectPasseurId) {
                return null;
              }
              return (
                <SelectItem key={index} value={p.id}>
                  {getName(p)}
                </SelectItem>
              );
            })}
          </>
        );
      case filters.Passeur:
        return (
          <>
            <SelectItem value={filters.Passeur}>Tous les joueurs</SelectItem>
            {playersWithoutCsc?.map((p, index) => {
              if (selectedButeurId && p.id == selectedButeurId) {
                return null;
              }
              return (
                <SelectItem key={index} value={p.id}>
                  {getName(p)}
                </SelectItem>
              );
            })}
          </>
        );
      case filters.Stade:
        return (
          <>
            <SelectItem value="Tout">Tout</SelectItem>
            {lieuOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                <div className="flex gap-2">{option}</div>
              </SelectItem>
            ))}
          </>
        );
      case filters.Competition:
        return (
          <>
            <SelectItem value="Tout">Tout</SelectItem>
            {competitions.map((option, index) => (
              <SelectItem key={index} value={option}>
                <div className="flex gap-2">
                  <Image
                    src={`${option}.svg`}
                    height={0}
                    width={option == "FA Cup" ? 24 : 16}
                    alt={option}
                    className={option == "FA Cup" ? "-m-1" : ""}
                  />
                  {option}
                </div>
              </SelectItem>
            ))}
          </>
        );
      case filters.Adversaire:
        return (
          <>
            <SelectItem value="Tout">Tout</SelectItem>
            {teams.map((option, index) => (
              <SelectItem key={index} value={option.name}>
                <div className="flex gap-2 items-center">
                <Image
                    src={`club/${option.code}.svg`}
                    height={16}
                    width={16}
                    alt={option.name}
                  />
                  {option.name}
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
      // on filtre par l'adversaire si un adversaire est sélectionnée
      const adversaireMatch = !selectTeam || goal.against == selectTeam;
      return (
        buteurMatch &&
        passeurMatch &&
        stadeMatch &&
        competitionMatch &&
        adversaireMatch
      );
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
    } else if (value === filters.Adversaire) {
      return selectTeam;
    }
  };

  return (
    <Layout title="Accueil">
      <div className="px-6 sm:px-8 py-8 sm:py-12 flex flex-col border-b bg-quadrille">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-4xl sm:text-5xl uppercase italic">
              <span className="sm:hidden">{`${displayGoal} ${
                goalsFiltre.length < 2 ? "but" : "buts"
              }`}</span>
              <span className="hidden sm:block">{`${displayGoal} ${
                goalsFiltre.length < 2 ? "but" : "buts"
              } cette saison`}</span>
            </h2>
            {goalsFiltre.length > 1 && (
              <Button variant="filtre" onClick={() => setIsFirst(!isFirst)}>
                {isFirst ? <ArrowUp /> : <ArrowDown />}
              </Button>
            )}
          </div>

          <div className="flex sm:hidden">
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
                selectTeam={selectTeam}
              />
            )}
          </div>

          <div className="hidden sm:flex">
            <FormFilters
              handleSelectChange={handleSelectChange}
              handleChangeValue={handleChangeValue}
              renderSelectOptions={renderSelectOptions}
              selectCompetition={selectCompetition}
              selectPasseurId={selectPasseurId}
              selectStade={selectStade}
              selectedButeurId={selectedButeurId}
              selectTeam={selectTeam}
              handleMaj={handleMaj}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
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
            {selectTeam && (
              <ReponseFiltres
                data={selectTeam}
                onClick={() => setSelectTeam("")}
              />
            )}
          </div>
          {(selectStade ||
            selectedButeurId ||
            selectPasseurId ||
            selectCompetition ||
            selectTeam) && (
            <Button onClick={() => handleMaj("toast")}>
              <X />
            </Button>
          )}
        </div>
      </div>

      <div className="my-4 mx-3 sm:mx-12">
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
