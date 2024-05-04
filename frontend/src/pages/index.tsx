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
import { useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { PLAYER_BY_ID } from "@/requetes/queries/playerById.queries";
import { SlidersHorizontal, Undo2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const stade = "Emirates Stadium";

const filters = {
Joueurs: "Joueurs",
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
    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    // stade sélectionné dans les filtres
    const [selectStade, setSelectStade] = useState("");

    // button filtre
    const [buttonFiltre, setButtonFiltre] = useState(true);

    // query qui recup le joueur selon son id
    const { loading, error, data: playerData} = useQuery(PLAYER_BY_ID, {
        variables: { playerId: selectedPlayerId },
    });

    // reset les filtres
    const handleMaj = () => {
        setSelectedPlayerId("");
        setSelectStade("");
        setButtonFiltre(true);
        toast({
            title: "Filtre(s) supprimé(s).",
        })
    };

    // nous permet de changer de joueur/stade et l'afficher directement
    const handleSelectChange = (value: string, filter: string) => {
        if (filter === filters.Joueurs) {
        setSelectedPlayerId(value === filters.Joueurs ? "" : value);
        } else if (filter === filters.Stade) {
        setSelectStade(value === "Tout" ? "" : value);
        }
    };

    // contenu de nos selects
    const renderSelectOptions = (filter: string) => {
        switch (filter) {
        case filters.Joueurs:
            return (
            <>
                <SelectItem value={filters.Joueurs}>Tous les joueurs</SelectItem>
                {playersData?.players.map((p, index) => (
                <SelectItem key={index} value={p.id}>
                    {p.name}
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
    const filteredGoals = goalsData?.goals.filter((goal) => {
        // on filtre par le joueur si un joueur est sélectionné
        const playerMatch = !selectedPlayerId || goal.player?.id === selectedPlayerId;
        // on filtre par le stade si un stade est sélectionné
        const stadeMatch = !selectStade || (selectStade === stade && goal.where === stade) || (selectStade === "Extérieur" && goal.where !== stade);
        return playerMatch && stadeMatch;
        }) || [];

    // trier dans l'ordre décroissant/croissant
    const goalsFiltre = filteredGoals.slice().sort((a, b) => (isFirst ? b.ordre - a.ordre : a.ordre - b.ordre));

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

    return (
        <Layout title="Accueil">
        <div className="bg-tertiary/20 px-4 flex flex-col">
            <div className="flex p-2">
            <h2 className="font-bold text-2xl">{displayGoal} BUTS</h2>
            </div>

            <div className="p-3 flex justify-between">
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
                <form className="flex justify-between gap-4 flex-col sm:flex-row">
                {Object.values(filters).map((filter, index) => (
                    <Select
                    key={index}
                    name={filter}
                    onValueChange={(value) => handleSelectChange(value, filter)}
                    value={
                        filter === filters.Joueurs ? selectedPlayerId : selectStade
                    }
                    >
                    <SelectTrigger>
                        <SelectValue placeholder={filter} />
                    </SelectTrigger>
                    <SelectContent>{renderSelectOptions(filter)}</SelectContent>
                    </Select>
                ))}
                <div className="flex">
                    {!selectedPlayerId && !selectStade && (
                    <Button variant="destructive" onClick={handleMaj}>
                        <Undo2 />
                    </Button>
                    )}
                </div>
                </form>
            )}

            <Button variant="filtre" onClick={() => setIsFirst(!isFirst)}>
                {isFirst ? (
                <span className="material-symbols-outlined">arrow_upward</span>
                ) : (
                <span className="material-symbols-outlined">arrow_downward</span>
                )}
            </Button>
            </div>

            <div className="flex justify-between items-center">
            <div className="flex">
                {selectedPlayerId && (
                <div className="flex p-4">
                    <div className="py-1 px-3 border rounded flex items-center justify-between bg-background">
                    {loading
                        ? "Chargement..."
                        : error
                        ? `Erreur: ${error.message}`
                        : playerData?.getPlayerById?.name}
                    <Button
                        size="arrow"
                        variant="arrow"
                        onClick={() => setSelectedPlayerId("")}
                    >
                        <X />
                    </Button>
                    </div>
                </div>
                )}
                {selectStade && (
                <div className="flex p-4">
                    <div className="py-1 px-3 border rounded flex items-center justify-between bg-background">
                    {selectStade}
                    <Button
                        size="arrow"
                        variant="arrow"
                        onClick={() => setSelectStade("")}
                    >
                        <X />
                    </Button>
                    </div>
                </div>
                )}
            </div>
            {(selectStade || selectedPlayerId) && (
                <Button onClick={handleMaj}>Réinitialiser</Button>
            )}
            </div>
        </div>

        <div className="flex justify-center mt-2">
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