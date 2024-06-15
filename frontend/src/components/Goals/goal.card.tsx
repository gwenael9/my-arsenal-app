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
import { formaterDate, getName, modifNameTeam, toUpOne } from "@/lib/functions";
import { useEffect, useState } from "react";
import { GoalCardProps } from "@/types/interface";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";

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

  // nous renvoie la taille du logo
  const logo = (item: typeof goal) => {
    if (item.competition == "FA Cup") {
      return 45;
    } else if (item.competition == "EFL Cup") {
      return 20;
    } else if (item.competition == "Community Shield") {
      return 36;
    }

    return 30;
  };

  return (
    <Card className="border relative overflow-hidden border-tertiary/20 h-[220px]">
      <div
        className={`absolute flex justify-center w-[120px] top-3 -right-7 text-xs p-2 transform font-bold  ${
          domicile ? "bg-primary text-white" : "bg-secondary"
        }`}
        style={{ transform: "rotate(45deg)" }}
      >
        n°{goal.ordre}
      </div>
      <CardHeader className="flex flex-col">
        <CardTitle>{getName(goal.buteur, "buteur")}</CardTitle>
        <CardDescription>
          {goal.passeur != null ? getName(goal.passeur, "passeur") : "-"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2 pb-5">
        <div className="flex items-center gap-1">
          vs.{" "}
          <span className="text-xl font-bold">
            {goal.against.toUpperCase()}
          </span>
        </div>
        <Image
          src={`${goal.competition}.svg`}
          height={0}
          width={Number(logo(goal))}
          alt={goal.competition}
        />
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 flex-col">
          <Badge variant="black">{toUpOne(goal.where) || stade}</Badge>
          <Badge variant="test">{formaterDate(goal.date)}</Badge>
        </div>
        <Button
          variant="arrowCard"
          onClick={handleArrowClick}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
          aria-label={`Voir la vidéo du but n°${goal.ordre}`}
        >
          <ArrowRight
            className={`${arrowAnimated ? "translate-x-1/2" : ""} ${
              arrowHovered ? "-translate-x-1/2 " : "translate-x-0"
            } duration-500`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
