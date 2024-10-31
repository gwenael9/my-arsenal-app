import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CREATE_PLAYER } from "@/requetes/mutations/create.player.mutation";
import { LIST_PLAYERS } from "@/requetes/queries/player.queries";
import {
  CreatePlayerMutation,
  CreatePlayerMutationVariables,
  InputCreatePlayer,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import CardLayout from "./CardLayout";

export default function CardCreatePlayer() {
  const { toast } = useToast();
  const [createPlayer] = useMutation<
    CreatePlayerMutation,
    CreatePlayerMutationVariables
  >(CREATE_PLAYER, {
    refetchQueries: [{ query: LIST_PLAYERS }],
    onCompleted: () => {
      toast({
        title: "Joueur créé avec succès !",
      });
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
    const data = Object.fromEntries(formData) as InputCreatePlayer;
    if (data.lastname) {
      createPlayer({
        variables: {
          infos: {
            firstname: data.firstname,
            lastname: data.lastname,
            country: data.country,
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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="firstname">Firstname</Label>
          <Input name="firstname" id="firstname" placeholder="Bukayo" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastname">Lastname</Label>
          <Input name="lastname" id="lastname" placeholder="Saka" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="country">Pays</Label>
          <Input name="country" id="country" placeholder="Angleterre" />
        </div>
        <div className="flex items-end">
          <Button variant="success" type="submit">
            Confirmer
          </Button>
        </div>
      </div>
    </form>
  );
}
