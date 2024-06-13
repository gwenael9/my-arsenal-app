import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getName, toUpOne } from "@/lib/functions";
import { usePlayersQuery } from "@/types/graphql";

interface SelectProps {
  name: string;
  placeholder: string;
  label: string;
  setSelectedId?: (id: string) => void;
  excludeId?: string;
  selectedValue?: string;
}

export default function SelectItemGoal({
  name,
  placeholder,
  label,
  setSelectedId,
  excludeId,
  selectedValue
}: SelectProps) {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const competitionTable = [
    "Premier League",
    "FA Cup",
    "EFL Cup",
    "Champions League",
    "Community Shield",
  ];

  const handleChange = (value: string) => {
    if (setSelectedId) {
      setSelectedId(value);
    }
  };

  const filteredPlayers = players.filter(p => p.id !== excludeId);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{toUpOne(label)}</Label>
      <Select name={name} onValueChange={handleChange} value={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {name === "competition"
              ? competitionTable.map((compet, index) => (
                  <SelectItem key={index} value={compet}>
                    {compet}
                  </SelectItem>
                ))
              : filteredPlayers.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {getName(p)}
                  </SelectItem>
                ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
