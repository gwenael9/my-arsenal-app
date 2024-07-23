import { useGetGoalsBySaisonQuery, useGoalsQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import { useLangue } from "@/components/Layout/LangueContext";
import StadeGoals from "./charts.where";

interface TeamProps {
  saison: string;
}

export default function Team({ saison }: TeamProps) {
  const { langue } = useLangue();

  const { data } = useGetGoalsBySaisonQuery({
    variables: {
      saison: saison,
    },
  });
  const goals = data?.getGoalsBySaison || [];

  if (goals.length == 0) {
    return (
      <div className="text-center mt-4">
        {langue ? "Aucun but pour le moment..." : "No goal yet..."}
      </div>
    );
  }

  return (
    <>
      <AgainstMostGoalCard saison={saison} />
      <ChartsGoal goals={goals} saison={saison} />
      <StadeGoals goals={goals} saison={saison} />
    </>
  );
}
