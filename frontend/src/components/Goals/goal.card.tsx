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
import { getName, toUpOne } from "@/lib/functions";
import { useEffect, useState } from "react";
import { GoalCardProps } from "@/types/interface";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export default function GoalCard({ goal }: GoalCardProps) {
  const router = useRouter();
  const [domicile, setDomicile] = useState(true);
  // effet quand on click sur la fleche
  const [arrowAnimated, setArrowAnimated] = useState(false);
  // effet quand on survole la fleche
  const [arrowHovered, setArrowHovered] = useState(false); 

  const stade = "Emirates Stadium";

  // si le stade est spécifié --> extérieur sinon domicile
  useEffect(() => {
    setDomicile(goal.where == "" || goal.where == stade);
  }, [goal.where]);

  const handleArrowClick = () => {
    setArrowAnimated(true); 
    setTimeout(() => {
      router.push(`/goals/${goal.ordre}`); 
    }, 200); 
  };

  return (
    <Card className="border relative overflow-hidden border-tertiary/20">
      <div
        className={`absolute flex justify-center w-[100px] top-0 -right-8 text-xs p-2 transform font-bold  ${
          domicile ? "bg-primary text-white" : "bg-secondary"
        }`}
        style={{ transform: "rotate(45deg)" }}
      >
        n°{goal.ordre}
      </div>
      <CardHeader className="flex flex-col">
        <CardTitle>{getName(goal.buteur, "buteur").toUpperCase()}</CardTitle>
        <CardDescription>
          {goal.passeur != null ? (
            getName(goal.passeur, "passeur")
          ) : (
            <div className="h-5"></div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          vs.{" "}
          <span className="text-xl font-bold">
            {goal.against.toUpperCase()}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 flex-col">
          <Badge variant="black">{toUpOne(goal.where) || stade}</Badge>
          <Badge variant="test">{goal.competition}</Badge>
        </div>
        <Button
          variant="arrowCard"
          onClick={handleArrowClick}
          onMouseEnter={() => setArrowHovered(true)} 
          onMouseLeave={() => setArrowHovered(false)} 
        >
          <ArrowRight className={`${arrowAnimated ? "translate-x-1/2" : ""} ${arrowHovered ? "-translate-x-1/2 " : "translate-x-0"} duration-500`} />
        </Button>
      </CardFooter>
    </Card>
  );
};