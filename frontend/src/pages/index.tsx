import GoalCard from "@/components/Goals/goal.card";
import Layout from "@/components/Layout/Layout";
import { useGoalsQuery } from "@/types/graphql";
import { useEffect, useState } from "react";

const Goals: React.FC = () => {
  const { data } = useGoalsQuery();
  const goals = data?.goals || [];
  const [displayGoal, setDisplayGoal] = useState(0);
  const [isFirst, setIsFirst] = useState(true); // croissant par défaut

  // animation pour le nombre de buts
  useEffect(() => {
    const interval = setInterval(() => {
      // incrémentation progressive jusqu'à la valeur finale
      if (displayGoal < goals.length) {
        setDisplayGoal(displayGoal + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [goals.length, displayGoal]);

  const triGoals = () => {
    setIsFirst(!isFirst);
  };

  // trier dans l'ordre decroissant
  const goalsFiltre = goals.slice().sort((a, b) => {
    if (isFirst) {
      return b.ordre - a.ordre;
    } else {
      return a.ordre - b.ordre;
    }
  });

  return (
    <Layout title="Accueil">
      <div className="flex justify-between p-4">
        <h2 className="font-bold text-xl">{displayGoal} BUTS</h2>
        <button
          className="p-4 bg-tertiary rounded text-white font-bold"
          onClick={triGoals}
        >
          {isFirst ? (
            <span className="material-symbols-outlined">arrow_downward</span>
          ) : (
            <span className="material-symbols-outlined">arrow_upward</span>
          )}
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {goalsFiltre.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
