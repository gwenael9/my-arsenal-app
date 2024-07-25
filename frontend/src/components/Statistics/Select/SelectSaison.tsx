import { useLangue } from "@/components/Layout/LangueContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toUpOne } from "@/lib/functions";
import { Saison } from "@/types/graphql";

interface SelectProps {
  value: string;
  saisons: Saison[];
  action: (value: string) => void;
}

export function SelectSaison({ value, saisons, action }: SelectProps) {
  const { langue } = useLangue();

  // on tri nos saisons dans le select dans l'ordre
  const sortedSaisons = [...saisons].sort((a, b) => {
    if (a.name === "all") return -1;
    if (b.name === "all") return 1;
    return a.name.localeCompare(b.name);
  });

  // si on est en français, on modifie all --> Tout
  const selectName = (item: string) => {
    if (item == "all" && langue) {
      return "Tout";
    }
    return toUpOne(item);
  };

  return (
    <Select onValueChange={action} value={value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortedSaisons.map((saison, index) => (
          <SelectItem key={index} value={saison.name}>
            {selectName(saison.name)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
