import { GoalCardProps } from "@/types/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { formaterDate, getName } from "@/lib/functions";
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
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant={"filtre"}>Infos <Info size={20} /></Button>
      </DialogTrigger>
      <DialogContent
        className={`p-2 sm:p-4 border-2 overflow-hidden sm:max-w-[450px] w-full max-w-[90%] mx-auto max-h-[180px] ${
          domicile ? "border-primary" : "border-secondary"
        }`}
      >
        <DialogHeader>
          <DialogTitle>
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
            vs<span className="text-xl sm:text-3xl ml-1">{modifNameTeam(goal.against)}</span>
          </div>
          <div className="flex flex-col justify-end">
            <p className="flex items-center gap-1">
              <Calendar size={16} /> {formaterDate(goal.date)}
            </p>
            <p className="flex items-center gap-1">
              <Trophy size={16} /> {goal.competition}
            </p>
            <p className="flex items-center gap-1">
              <MapPin size={16} /> {goal.where}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
