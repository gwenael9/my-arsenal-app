import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { filters } from "@/pages/goals/index";

interface FormProps {
  handleSelectChange: (value: string, filter: string) => void;
  handleChangeValue: (value: string) => string | undefined;
  renderSelectOptions: (filter: string) => React.ReactNode;
  selectedButeurId: string;
  selectPasseurId: string;
  selectStade: string;
  selectCompetition: string;
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
  handleMaj,
}: FormProps) {
  return (
    <form className="grid grid-cols-2 gap-2 sm:gap-4 sm:flex sm:flex-row w-full max-w-[900px]">
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
      <div className="flex sm:hidden">
        {!selectedButeurId &&
          !selectPasseurId &&
          !selectStade &&
          !selectCompetition && (
            <Button onClick={handleMaj}>
              <Undo2 />
            </Button>
          )}
      </div>
    </form>
  );
}
