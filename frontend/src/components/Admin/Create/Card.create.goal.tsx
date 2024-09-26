import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CREATE_GOAL } from "@/requetes/mutations/create.goal.mutation";
import {
  CreateGoalMutation,
  CreateGoalMutationVariables,
  InputCreateGoal,
  usePlayersQuery,
  useSaisonsQuery,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { DatePicker } from "./SelectDate";
import { format } from "date-fns";
import { LIST_GOALS } from "@/requetes/queries/goal.queries";
import { getName } from "@/lib/functions";
import { competitions } from "@/utils/teams";
import CardLayout from "./CardLayout";
import { InputField, SelectField } from "../FormFields";

interface CardCreateGoalProps {
  nbGoals: number;
}

export default function CardCreateGoal({nbGoals}: CardCreateGoalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const { data: saisonData } = useSaisonsQuery();
  const saisons = saisonData?.saisons.filter((saison) => saison.name !== "all") || [];

  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedCompetition: "Premier League",
    selectedSaison: "2024/2025",
    selectedButeur: "",
    selectedPasseur: "",
    ordre: nbGoals + 1,
  });

  const handleClick = (item: number, dismiss: () => void) => {
    dismiss();
    router.push(`/goals/${item}`);
  };

  const [createGoal] = useMutation<CreateGoalMutation, CreateGoalMutationVariables>(CREATE_GOAL, {
    refetchQueries: [{ query: LIST_GOALS }],
    onCompleted: (data) => {
      const { dismiss } = toast({
        title: "But crée avec succès !",
        action: (
          <Button
            variant="success"
            onClick={() => handleClick(data.createGoal.ordre, dismiss)}
          >
            Voir
          </Button>
        ),
      });
      formRef.current?.reset();
      setFormData({ ...formData, selectedButeur: "", selectedPasseur: "" });
    },
    onError(error) {
      toast({
        title: error.message,
      });
    },
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as unknown as InputCreateGoal;

    if (!data.link.startsWith("https://")) {
      toast({
        title: "Le lien est invalide !",
        variant: "destructive",
      });
      return;
    }
    if (data.against && formData.selectedDate && data.link && data.ordre && formData.selectedButeur) {
      createGoal({
        variables: {
          infos: {
            against: data.against,
            date: formData.selectedDate,
            link: data.link,
            ordre: parseFloat(data.ordre as unknown as string),
            where: data.where || "Emirates Stadium",
            buteurId: formData.selectedButeur,
            passeurId: formData.selectedPasseur || null,
            competition: formData.selectedCompetition,
            saison: formData.selectedSaison,
          },
        },
      });
    } else {
      toast({
        title: "Champ incomplet !",
        variant: "destructive",
      });
    }
  };

  const handleDateChange = (date: Date) => {
    handleInputChange("selectedDate", format(date, "dd/MM/yyyy"));
  };

  return (
    <CardLayout title="Ajouter un but">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="sm:flex sm:gap-10">
          <div className="flex gap-2 flex-col">
            <InputField
              label="But n°"
              name="ordre"
              type="number"
              placeholder="1"
              value={formData.ordre}
              onChange={(e) => handleInputChange("ordre", e.target.value)}
            />
            <Label>Date</Label>
            <DatePicker selectedDate={formData.selectedDate} onDateChange={handleDateChange} />
            <SelectField
              label="Compétition"
              name="selectedCompetition"
              value={formData.selectedCompetition}
              options={competitions}
              onChange={handleInputChange}
            />
            <InputField label="Adversaire" name="against" placeholder="Nottingham Forest" />
            <InputField label="Stade" name="where" placeholder="Emirates Stadium" />
          </div>
          <div className="flex gap-2 flex-col">
            <SelectField
              label="Saison"
              name="selectedSaison"
              value={formData.selectedSaison}
              options={saisons.map((saison) => saison.name)}
              onChange={handleInputChange}
            />
            <SelectField
              label="Buteur"
              name="selectedButeur"
              value={formData.selectedButeur}
              options={players.map((p) => ({ value: p.id, label: getName(p) }))}
              onChange={handleInputChange}
            />
            <SelectField
              label="Passeur"
              name="selectedPasseur"
              value={formData.selectedPasseur}
              options={players.map((p) => ({ value: p.id, label: getName(p) }))}
              onChange={handleInputChange}
            />
            <InputField label="Lien" name="link" placeholder="https://youtube.com" />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="success" type="submit">
            Confirmer
          </Button>
        </div>
      </form>
    </CardLayout>
  );
}