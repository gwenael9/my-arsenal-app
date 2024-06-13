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
  usePlayersQuery,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { DatePicker } from "./SelectDate";
import { format } from "date-fns";
import { LIST_GOALS } from "@/requetes/queries/goal.queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getName } from "@/lib/functions";

export default function CardCreateGoal() {
  const { toast } = useToast();

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [selectedButeur, setSelectedButeur] = useState<string>("");
  const [selectedPasseur, setSelectedPasseur] = useState<string>("");

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
      setSelectedCompetition("");
      setSelectedButeur("");
      setSelectedPasseur("");
      setSelectedDate("");
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
      selectedButeur &&
      selectedCompetition
    ) {
      const passeurId = selectedPasseur !== "" ? selectedPasseur : null;
      const whereDefault = data.where !== "" ? data.where : "Emirates Stadium";
      console.log(passeurId);
      createGoal({
        variables: {
          infos: {
            against: data.against,
            date: selectedDate,
            link: data.link,
            ordre: parseFloat(data.ordre as unknown as string),
            where: whereDefault,
            buteurId: selectedButeur,
            passeurId: passeurId,
            competition: selectedCompetition,
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

  const competitionTable = [
    "Premier League",
    "FA Cup",
    "EFL Cup",
    "Champions League",
    "Community Shield",
  ];

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
                <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                <Input type="hidden" name="date" value={selectedDate} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="competition">Competition</Label>
                <Select
                  name="competition"
                  value={selectedCompetition}
                  onValueChange={setSelectedCompetition}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisi une competition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {competitionTable.map((compet, index) => (
                        <SelectItem key={index} value={compet}>
                          {compet}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="buteurId">Buteur</Label>
                <Select
                  name="buteurId"
                  value={selectedButeur}
                  onValueChange={setSelectedButeur}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisi un buteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {players.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {getName(p)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passeurId">Passeur</Label>
                <Select
                  name="passeurId"
                  value={selectedPasseur}
                  onValueChange={setSelectedPasseur}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisi un passeur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {players.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {getName(p)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
            <Button variant="success" type="submit">
              Confirmer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
