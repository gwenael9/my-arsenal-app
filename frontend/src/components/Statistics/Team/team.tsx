import { useGetGoalsBySaisonQuery, useGoalsQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import { useLangue } from "@/components/Layout/LangueContext";

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
    return <div className="text-center mt-4">{langue ? "Aucun but pour le moment..." : "No goal yet..."}</div>;
  }

  return (
    <div className="sm:px-12 mt-4 flex gap-4 justify-center flex-wrap">
      <div>
        <AgainstMostGoalCard saison={saison} />
      </div>

      <div>
        <ChartsGoal goals={goals} saison={saison} />
      </div>
    </div>
  );
}
