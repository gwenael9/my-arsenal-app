import GoalCard from "@/components/Goals/goal.card";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Goal, useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { SlidersHorizontal, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  // tout nos buts
  const { data } = useGoalsQuery();
  const goals = data?.goals || [];
  // va nous permettre d'ajouter un effet sur le nbr de buts
  const [displayGoal, setDisplayGoal] = useState(0);
  // ordre des buts, décroissant par défaut
  const [isFirst, setIsFirst] = useState(true);

  // player sélectionné dans les filtres
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  // buts du player sélectionné
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);

  // button filtre
  const [buttonFiltre, setButtonFiltre] = useState(true);

  const { toast } = useToast();

  // tout nos joueurs
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const triGoals = () => {
    setIsFirst(!isFirst);
  };

  useEffect(() => {
    if (selectedPlayerId) {
      const goalOfPlayer = goals.filter(
        (goal) => goal.player?.id === selectedPlayerId
      );
      setFilteredGoals(goalOfPlayer);
    } else {
      setFilteredGoals(goals);
    }
  }, [selectedPlayerId, goals]);

  // trier dans l'ordre decroissant/croissant
  const goalsFiltre = filteredGoals.slice().sort((a, b) => {
    return isFirst ? b.ordre - a.ordre : a.ordre - b.ordre;
  });

  const filters = [
    { name: "Joueurs", value: "" },
    // { name: "Lieu", value: "Domicile" },
  ];

  // reinitialiser les filtres
  const handleMaj = () => {
    setSelectedPlayerId("");
    setButtonFiltre(true);
    toast({
      title: "Filtre supprimé.",
      variant: "success",
    });
  };

  // animation pour le nombre de buts
  useEffect(() => {
    const interval = setInterval(() => {
      // incrémentation progressive jusqu'à la valeur finale
      if (displayGoal < goalsFiltre.length) {
        setDisplayGoal(displayGoal + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [goalsFiltre.length, displayGoal]);

  const handlePlayerselect = (value: string) => {
    if (value !== "Joueurs") {
      setSelectedPlayerId(value);
    } else {
      setSelectedPlayerId("");
    }
  };

  return (
    <Layout title="Accueil">
      <div className="bg-tertiary/20 px-4">
        {/* si ona au moins 1 but */}
        {goalsFiltre.length > 0 ? (
          <div className="flex justify-between p-3 items-center">
            <h2 className="font-bold text-2xl">
              {/* si on a un joueur filtré */}
              {selectedPlayerId
                ? // et qu'il a plus d'un but
                  goalsFiltre.length > 1
                  ? "Les " + goalsFiltre.length + " buts de " + goalsFiltre[0].player?.name
                  : // ou seulement 1 but
                    "Le but de " + goalsFiltre[0].player?.name
                : // si on a aucun joueur filtré, page de base
                  "Les " +
                  goalsFiltre.length +
                  " buts d'Arsenal cette saison !"}
            </h2>
          </div>
        ) : (
          // si on aucun but pour le joueur filtré
          <div className="p-3"></div>
        )}

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
            <form className="flex justify-between gap-4">
              {filters.map((f, index) => (
                <Select
                  key={index}
                  name={f.name}
                  onValueChange={handlePlayerselect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={f.name} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={f.name}>{f.name}</SelectItem>
                      {f.name === "Joueurs" &&
                        players.map((p, index) => (
                          <SelectItem key={index} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ))}
              <div className="flex">
                {!selectedPlayerId && (
                  <Button
                    variant="destructive"
                    onClick={() => setButtonFiltre(true)}
                  >
                    <Undo2 />
                  </Button>
                )}
              </div>
            </form>
          )}

          <Button variant="filtre" onClick={triGoals}>
            {isFirst ? (
              <span className="material-symbols-outlined">arrow_upward</span>
            ) : (
              <span className="material-symbols-outlined">arrow_downward</span>
            )}
          </Button>
        </div>
        {selectedPlayerId && goalsFiltre.length > 0 && (
          <div className="flex p-4">
            <div className="py-1 px-3 border rounded flex items-center justify-between bg-background">
              {goalsFiltre[0].player?.name}
              <Button size="arrow" variant="arrow" onClick={handleMaj}>
                <X />
              </Button>
            </div>
          </div>
        )}
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
