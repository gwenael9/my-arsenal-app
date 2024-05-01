import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CardCreateGoal() {
  const { toast } = useToast();
  const router = useRouter();

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const [createGoal] = useMutation<
    CreateGoalMutation,
    CreateGoalMutationVariables
  >(CREATE_GOAL, {
    onCompleted: () => {
      toast({
        title: "But créé avec succès !",
      });
      router.reload();
    },
    onError(error) {
      toast({
        title: error.message,
      });

      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as InputCreateGoal;
    if (
      data.against &&
      data.date &&
      data.link &&
      data.ordre &&
      data.playerId &&
      data.where
    ) {
      createGoal({
        variables: {
          infos: {
            against: data.against,
            date: data.date,
            link: data.link,
            ordre: parseFloat(data.ordre as unknown as string),
            where: data.where,
            playerId: data.playerId,
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

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Ajouter un but</CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ordre">But n°</Label>
              <Input type="number" name="ordre" id="ordre" placeholder="1" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input name="date" id="date" placeholder="12/08/2023" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="against">Contre</Label>
              <Input
                name="against"
                id="against"
                placeholder="Nottingham Forest"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="where">Stade</Label>
              <Input name="where" id="where" placeholder="Emirates Stadium" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="playerId">Buteur</Label>
              <Select name="playerId">
                <SelectTrigger>
                  <SelectValue placeholder="Select a player" />
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="link">Lien</Label>
              <Input name="link" id="link" placeholder="https://youtube.com" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="success" className="" type="submit">
              Confirmer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
