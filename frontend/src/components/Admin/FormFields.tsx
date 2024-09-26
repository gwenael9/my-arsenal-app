import { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionType {
  value: string;
  label: string;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; 
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[] | OptionType[];
  onChange: (name: string, value: string) => void; 
}

export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputFieldProps) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={name}>{label}</Label>
    <Input
      type={type}
      name={name}
      id={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={name}>{label}</Label>
    <Select name={name} value={value} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger>
        <SelectValue placeholder={`Choisi un(e) ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt, index) =>
            typeof opt === "string" ? (
              <SelectItem key={index} value={opt}>
                {opt}
              </SelectItem>
            ) : (
              <SelectItem key={index} value={opt.value}>
                {opt.label}
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);
