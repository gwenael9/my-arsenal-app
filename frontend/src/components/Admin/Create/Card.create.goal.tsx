import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CREATE_GOAL } from "@/requetes/mutations/create.goal.mutation";
import {
  CreateGoalMutation,
  CreateGoalMutationVariables,
  InputCreateGoal,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import SelectItemGoal from "./SelectItemGoal";
import { DatePicker } from "./SelectDate";
import { format } from "date-fns";
import { LIST_GOALS } from "@/requetes/queries/goal.queries";

export default function CardCreateGoal() {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [resetDate, setResetDate] = useState<boolean>(false);
  const [competition, setCompetition] = useState<string>("");
  const [buteurId, setButeurId] = useState<string>("");
  const [passeurId, setPasseurId] = useState<string>("");

  const handleClick = (item: number, dismiss: () => void) => {
    dismiss();
    router.push(`/goals/${item}`);
  };

  const [createGoal] = useMutation<
    CreateGoalMutation,
    CreateGoalMutationVariables
  >(CREATE_GOAL, {
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
      setSelectedDate("");
      setCompetition("");
      setResetDate(true);
      setButeurId("");
      setPasseurId("");
      setTimeout(() => setResetDate(false), 0);
    },
    onError(error) {
      toast({
        title: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as InputCreateGoal;

    if (!data.link.startsWith("https://")) {
      toast({
        title: "Le lien est invalide !",
        variant: "destructive",
      });
      return;
    }
    if (
      data.against &&
      selectedDate &&
      data.link &&
      data.ordre &&
      data.buteurId &&
      data.competition
    ) {
      const passeurId = data.passeurId !== "" ? data.passeurId : null;
      const whereDefault = data.where !== "" ? data.where : "Emirates Stadium";
      createGoal({
        variables: {
          infos: {
            against: data.against,
            date: selectedDate,
            link: data.link,
            ordre: parseFloat(data.ordre as unknown as string),
            where: whereDefault,
            buteurId: data.buteurId,
            passeurId: passeurId,
            competition: data.competition,
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
    setSelectedDate(format(date, "dd/MM/yyyy"));
  };

  return (
    <Card className="w-full border rounded border-tertiary/20">
      <CardHeader>
        <CardTitle>Ajouter un but</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="sm:flex sm:gap-10">
            <div className="w-[200px] flex gap-2 flex-col">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ordre">But n°</Label>
                <Input type="number" name="ordre" id="ordre" placeholder="1" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <DatePicker onDateChange={handleDateChange} resetDate={resetDate} />
                <Input type="hidden" name="date" value={selectedDate} />
              </div>
              <SelectItemGoal
                name="competition"
                placeholder="Choisi la compétition"
                label="competition"
                selectedValue={competition}
                setSelectedId={setCompetition}
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="against">Adversaire</Label>
                <Input
                  name="against"
                  id="against"
                  placeholder="Nottingham Forest"
                />
              </div>
            </div>
            <div className="w-[200px] flex gap-2 flex-col">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="where">Stade</Label>
                <Input name="where" id="where" placeholder="Emirates Stadium" />
              </div>
              <SelectItemGoal
                name="buteurId"
                placeholder="Choisi un buteur"
                label="Buteur"
                selectedValue={buteurId}
                setSelectedId={setButeurId}
                excludeId={passeurId}
              />
              <SelectItemGoal
                name="passeurId"
                placeholder="Choisi un passeur"
                label="Passeur"
                selectedValue={passeurId}
                setSelectedId={setPasseurId}
                excludeId={buteurId}
              />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="link">Lien</Label>
                <Input
                  name="link"
                  id="link"
                  placeholder="https://youtube.com"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="success" className="" type="submit">
              Confirmer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
