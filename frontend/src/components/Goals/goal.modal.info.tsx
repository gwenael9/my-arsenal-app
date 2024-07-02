import { GoalCardProps } from "@/types/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  flagCountry,
  formaterDate,
  getName,
  modifNameTeam,
} from "@/lib/functions";
import { Calendar, Info, MapPin, Trophy } from "lucide-react";
import { teams } from "@/utils/teams";

export default function ModalGoalInfo({ goal }: GoalCardProps) {
  const itemDescriptionTable = [
    {
      icon: <Calendar size={16} />,
      item: formaterDate(goal.date),
    },
    {
      icon: <Trophy size={16} />,
      item: goal.competition,
    },
    {
      icon: <MapPin size={16} />,
      item: goal.where,
      stade: goal.where,
    },
  ];

  // Recherche du code de l'équipe dans la liste `teams`
  const team = teams.find((team) => team.name === goal.against);
  const teamCode = team ? team.code : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant={"filtre"}>
          Infos <Info size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed border-tertiary top-1/2 left-1/2 p-4 border overflow-hidden sm:max-w-[450px] w-full max-w-[90%] h-[180px]">
        <DialogHeader>
          <DialogTitle>
            <p className="flex items-center gap-2">
              {getName(goal.buteur, "buteur")}
              <img
                src={`https://flagcdn.com/${flagCountry(
                  goal.buteur.country
                )}.svg`}
                alt={goal.buteur.country}
                className="w-5"
              />
            </p>
            {goal.passeur && (
              <p className="text-sm text-muted-foreground mt-1">
                {getName(goal.passeur)}
              </p>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-end justify-between">
          <div className="flex gap-1">
            <span className="flex items-end">vs. </span>
            <span className="text-xl sm:text-3xl">
              {modifNameTeam(goal.against)}
            </span>
          </div>
          <div className="flex flex-col">
            {itemDescriptionTable.map((item, index) => (
              <p key={index} className="flex items-center gap-1">
                {item.icon} {item.item}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
