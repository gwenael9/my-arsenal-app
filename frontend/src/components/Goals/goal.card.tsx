import { Goal } from "@/types/graphql";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toUpOne } from "@/lib/functions";
import { useEffect, useState } from "react";

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const [domicile, setDomicile] = useState(true);

  // si le stade est spécifié --> extérieur sinon domicile
  useEffect(() => {
    setDomicile(goal.where == "");
  }, [goal.where]);

  return (
    <Card
      className={`${
        domicile ? "bg-primary text-or" : "bg-secondary text-blue"
      }`}
    >
      <CardHeader className="flex flex-col">
        <CardTitle>{goal.player?.name.toUpperCase()}</CardTitle>
        <p>But n°{goal.ordre}.</p>
      </CardHeader>
      <CardContent>
        <p>
          vs{" "}
          <span className="text-xl font-bold">
            {goal.against.toUpperCase()}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 flex-col">
          <Badge variant={domicile ? "or" : "blue"}>
            {toUpOne(goal.where) || "Emirates Stadium"}
          </Badge>
          <Badge variant={domicile ? "or" : "blue"}>{goal.date}</Badge>
        </div>
        <Link href={`/goals/${goal.ordre}`}>
          <Button variant={domicile ? "or" : "blue"}>Voir le but</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
