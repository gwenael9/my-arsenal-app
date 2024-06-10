import React, { useState } from "react";
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
  const domicile = goal.where == "" || goal.where == "Emirates Stadium";

  const modifNameTeam = (item: string) => {
    if (item.includes("Manchester United")) {
      return "Man. United";
    } else if (item.includes("Manchester City")) {
      return "Man. City";
    }
    return item;
  };

  // l'angle du fond de la modal
  const [randomAngle, setRandomAngle] = useState<number>(
    Math.floor(Math.random() * 360)
  );

  // a chaque click sur info, un nouvel angle est défini
  const handleRandomAngle = () => {
    setRandomAngle(Math.floor(Math.random() * 360));
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
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleRandomAngle}
          className="flex gap-1"
          variant={"filtre"}
        >
          Infos <Info size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 p-4 border-2 overflow-hidden sm:max-w-[450px] w-full max-w-[90%] h-[180px]">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute w-full h-full">
            <div
              className={`h-full w-[500px] bg-gradient-to-r ${
                domicile ? "from-primary" : "from-secondary"
              } to-transparent`}
              style={{ transform: `rotate(${randomAngle}deg)`, opacity: 0.8 }}
            ></div>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img
              src={`https://flagcdn.com/${flagCountry(goal.buteur.country)}.svg`}
              alt={goal.buteur.country}
              className="w-5"
            />
            {getName(goal.buteur, "buteur")}
            {goal.passeur && (
              <span className="text-sm text-muted-foreground">
                {" "}
                ({getName(goal.passeur)})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between">
          <div className="flex items-end">
            vs
            <span className="text-2xl sm:text-3xl ml-1">
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
