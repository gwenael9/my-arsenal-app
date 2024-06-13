import { Goal, Player } from "@/types/graphql";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface EtiquettesProps {
  handleDelete: (item: string) => void;
  // a revoir 
  player?: Player | any;
  goal?: Goal;
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
        onClick={() => handleDelete(player ? player.id : goal ? goal.id : "")}
      >
        <X size={16} />
      </Button>
    </div>
  );
}
