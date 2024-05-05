import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlayersQuery } from "@/types/graphql";

interface SelectProps {
    name: string;
    placeholder: string;
    label: string;
}

export default function SelectPlayer({name, placeholder, label}: SelectProps) {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  return (
    <div className="flex flex-col space-y-1.5">
    <Label htmlFor={name}>{label}</Label>
    <Select name={name}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {players.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  );
}
