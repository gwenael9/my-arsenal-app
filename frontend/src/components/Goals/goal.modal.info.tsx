import { GoalCardProps } from "@/types/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { flagCountry, formaterDate, getName } from "@/lib/functions";
import { Calendar, Info, MapPin, Trophy } from "lucide-react";

export default function ModalGoalInfo({ goal }: GoalCardProps) {
  const modifNameTeam = (item: string) => {
    if (item.includes("Manchester United")) {
      return "Man. United";
    } else if (item.includes("Manchester City")) {
      return "Man. City";
    }
    return item;
  };

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
              <p>
                {goal.passeur && (
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    ({getName(goal.passeur)})
                  </span>
                )}
              </p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between">
          <div className="flex items-end">
            vs
            <span className="text-xl sm:text-3xl ml-1">
              {modifNameTeam(goal.against)}
            </span>
          </div>
          <div className="flex flex-col justify-end">
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
