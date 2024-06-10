import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ReponseFiltresPros {
  loading?: any;
  error?: any;
  data: string;
  onClick: any;
}

export default function ReponseFiltres({
  loading,
  error,
  data,
  onClick,
}: ReponseFiltresPros) {
  return (
    <div className="py-1 px-2 text-xs border border-tertiary/20 rounded-md flex items-center justify-between bg-background">
      {loading ? "Chargement..." : error ? `Erreur: ${error.message}` : data}
      <Button size="arrow" variant="arrow" onClick={onClick}>
        <X size={16} />
      </Button>
    </div>
  );
}
