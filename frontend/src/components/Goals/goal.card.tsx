import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getName, toUpOne } from "@/lib/functions";
import { useEffect, useState } from "react";
import { GoalCardProps } from "@/types/interface";
import { ArrowRight } from "lucide-react";

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const [domicile, setDomicile] = useState(true);

  const stade = "Emirates Stadium";

  // si le stade est spécifié --> extérieur sinon domicile
  useEffect(() => {
    setDomicile(goal.where == "" || goal.where == stade);
  }, [goal.where]);

  return (
    <Card className="border relative overflow-hidden border-tertiary/20">
      <div
        className={`absolute w-20 top-0 left-[230px] text-xs p-2 transform ${
          domicile ? "bg-primary" : "bg-secondary"
        }`}
        style={{ transform: "rotate(45deg)" }}
      ></div>
      <CardHeader className="flex flex-col z-10">
        <CardTitle>{getName(goal.buteur, "buteur").toUpperCase()}</CardTitle>
        {goal.passeur != null && (
          <CardDescription>({getName(goal.passeur, "passeur")})</CardDescription>
        )}
        {goal.passeur == null && <div className="h-5"></div>}
        <p>But n°{goal.ordre}.</p>
      </CardHeader>
      <CardContent>
        <p>
          vs.{" "}
          <span className="text-lg font-bold">
            {goal.against.toUpperCase()}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 flex-col">
          <Badge variant="black">{toUpOne(goal.where) || stade}</Badge>
          <Badge variant="test">{goal.competition}</Badge>
        </div>
        <Link href={`/goals/${goal.ordre}`}>
          <Button variant="arrowCard"><ArrowRight /></Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
