import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLangue } from "../Layout/LangueContext";

interface FormProps {
  handleSelectChange: (value: string, filter: string) => void;
  handleChangeValue: (value: string) => string | undefined;
  renderSelectOptions: (filter: string) => React.ReactNode;
  selectedButeurId: string;
  selectPasseurId: string;
  selectStade: string;
  selectCompetition: string;
  selectTeam: string;
  handleMaj: () => void;
}

export default function FormFilters({
  handleSelectChange,
  handleChangeValue,
  renderSelectOptions,
  selectCompetition,
  selectedButeurId,
  selectPasseurId,
  selectStade,
  selectTeam,
  handleMaj,
}: FormProps) {
  const { langue } = useLangue();

  const filters = {
    Buteur: langue ? "Buteur" : "Striker",
    Passeur: langue ? "Passeur" : "Assist",
    Stade: langue ? "Stade" : "Stadium",
    Competition: langue ? "Compétition" : "Competition",
    Adversaire: langue ? "Adversaire" : "Against",
  };

  return (
    <form className="w-full max-w-[900px]">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 sm:flex sm:flex-row">
        {Object.values(filters).map((filter, index) => (
          <Select
            key={index}
            name={filter}
            onValueChange={(value) => handleSelectChange(value, filter)}
            value={handleChangeValue(filter)}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter} />
            </SelectTrigger>
            <SelectContent>{renderSelectOptions(filter)}</SelectContent>
          </Select>
        ))}
      </div>
      <div className="flex sm:hidden justify-end">
        {!selectedButeurId &&
          !selectPasseurId &&
          !selectStade &&
          !selectCompetition &&
          !selectTeam && (
            <Button onClick={handleMaj}>
              <Undo2 />
            </Button>
          )}
      </div>
    </form>
  );
}
