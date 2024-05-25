import { flagCountry, formaterDate, getName, toUpOne } from "@/lib/functions";
import { GoalCardProps } from "@/types/interface";
import { Calendar, MapPin } from "lucide-react";

export default function GoalInfo({ goal }: GoalCardProps) {
  const domicile = goal.where == "" || goal.where == "Emirates Stadium";

  return (
    <div
      className={`border-2 rounded ${
        domicile ? "border-primary" : "border-secondary"
      } p-2`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <img
            src={`https://flagcdn.com/${flagCountry(goal.buteur.country)}.svg`}
            alt={goal.buteur.country}
            className="w-8 mr-2"
          />
          <h2 className="text-xl font-semibold">
            {getName(goal.buteur, "buteur")}{" "}
            {goal.passeur && (
              <span className="text-sm text-muted-foreground">
                ({getName(goal.passeur, "passeur")})
              </span>
            )}
          </h2>
        </div>
        <p>
          vs {goal.against} <span>({goal.competition})</span>
        </p>
        <div className="flex justify-between">
          <p className="flex items-center gap-1">
            <Calendar size={16} /> {formaterDate(goal.date)}
          </p>
          <p className="flex items-center gap-1">
            <MapPin size={16} /> {goal.where}
          </p>
        </div>
      </div>
    </div>
  );
}
