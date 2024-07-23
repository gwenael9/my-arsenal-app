import { useGoalsQuery } from "@/types/graphql";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getRatioGoalByMatch } from "@/lib/functions";

interface CardStatsProps {
  nbGoal: number | undefined;
  item: "passe" | "but";
}

export default function CardStats({ nbGoal, item }: CardStatsProps) {
  const { data: goalsData } = useGoalsQuery();
  const goals = goalsData?.goals || [];

  const goalToDisplay = nbGoal == undefined ? 0 : nbGoal;

  return (
    <Card className="p-4 border">
      <CardHeader className="p-0">
        <CardTitle>
          {nbGoal} {item == "but" ? "buts" : "passes décisives"}
        </CardTitle>
      </CardHeader>
      <CardDescription className="italic">
        Soit {getRatioGoalByMatch(goalToDisplay, goals.length, true)}% des buts d'Arsenal.
      </CardDescription>
    </Card>
  );
}
