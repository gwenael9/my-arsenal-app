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
import { useToast } from "@/components/ui/use-toast";
import { CREATE_PLAYER } from "@/requetes/mutations/create.player.mutation";
import {
  CreatePlayerMutation,
  CreatePlayerMutationVariables,
  InputCreatePlayer,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export default function CardCreatePlayer() {
  const { toast } = useToast();
  const router = useRouter();
  const [createPlayer] = useMutation<
    CreatePlayerMutation,
    CreatePlayerMutationVariables
  >(CREATE_PLAYER, {
    onCompleted: () => {
      toast({
        title: "Joueur créé avec succès !",
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
    const data = Object.fromEntries(formData) as InputCreatePlayer;
    if (data.name && data.country) {
      createPlayer({
        variables: { infos: { name: data.name, country: data.country } },
      });
    } else {
      toast({
        title: "Champ incomplet !",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ajouter un joueur</CardTitle>
        <CardDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Bukayo Saka" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="country">Pays</Label>
              <Input name="country" id="country" placeholder="Angleterre" />
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
