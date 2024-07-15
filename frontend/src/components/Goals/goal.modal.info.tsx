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
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant={"filtre"}>
          Infos <Info size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-tertiary p-4 border overflow-hidden sm:max-w-[450px] w-full max-w-[90%] h-[200px]">
        <DialogHeader>
          <DialogTitle>
            <p className="flex items-center gap-2">
              {getName(goal.buteur, "buteur")}
              {flagCountry(goal.buteur.country) && (
                <span
                  className={`fi fi-${flagCountry(goal.buteur.country)}`}
                  style={{ width: "1rem", height: "1rem" }}
                />
              )}
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
