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
import { Calendar, MapPin, Trophy } from "lucide-react";

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
        <Button variant={"filtre"}>Infos</Button>
      </DialogTrigger>
      <DialogContent
        className={`border-2 overflow-hidden max-w-[450px] ${
          domicile ? "border-primary" : "border-secondary"
        } p-2`}
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
        <div className="flex justify-between p-4">
          <div className="flex items-end ">
            vs<span className="text-2xl sm:text-3xl ml-1">{modifNameTeam(goal.against)}</span>
          </div>
          <div className="flex flex-col">
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
