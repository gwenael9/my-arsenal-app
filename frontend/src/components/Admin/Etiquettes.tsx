import { Goal, Player, useGoalsQuery, usePlayersQuery } from "@/types/graphql";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface EtiquettesProps {
  handleDelete: (item: string) => void;
  player?: Player | any;
  goal?: Goal | any;
}

export default function Etiquettes({
  handleDelete,
  player,
  goal,
}: EtiquettesProps) {
  return (
    <div
      key={player ? player.id : goal?.id}
      className="py-0 px-2 text-xs border border-tertiary/20 rounded-md flex items-center justify-between bg-background"
    >
      <p className="uppercase">{player ? player.lastname : goal?.ordre}</p>
      <Button
        size={"arrow"}
        variant={"arrow"}
        onClick={() => handleDelete(player ? player.id : goal ? goal?.id : "")}
      >
        <X size={16} />
      </Button>
    </div>
  );
}
