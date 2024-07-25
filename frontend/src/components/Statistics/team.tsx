import { useGetGoalsBySaisonQuery } from "@/types/graphql";
import AgainstMostGoalCard from "./against.card";
import ChartsGoal from "./charts.goals";
import StadeGoals from "./charts.where";
import { NoGoal } from "../NoGoal";

interface TeamProps {
  saison: string;
}

export default function Team({ saison }: TeamProps) {
  const { data } = useGetGoalsBySaisonQuery({
    variables: { saison: saison },
  });
  const goals = data?.getGoalsBySaison || [];

  if (goals.length == 0) {
    return <NoGoal />;
  }

  return (
    <>
      <AgainstMostGoalCard saison={saison} />
      <ChartsGoal goals={goals} name={saison} />
      <StadeGoals goals={goals} saison={saison} />
    </>
  );
}
