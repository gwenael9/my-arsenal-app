import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSaisonsQuery, useUpdateSaisonMatchMutation } from "@/types/graphql";
import { FormEvent, useEffect, useState } from "react";

export default function CardSaison() {
  const { toast } = useToast();
  const [idSaison, setIdSaison] = useState("");
  const [matchSaison, setMatchSaison] = useState(0);

  const { data } = useSaisonsQuery();
  const saisons = data?.saisons || [];

  const [updateSaisonMatch] = useUpdateSaisonMatchMutation({
    onCompleted: () => {
      toast({
        title: "Nombre de matchs modifié.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Erreur lors de la modification.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (idSaison) {
      const selectedSaison = saisons.find((saison) => saison.id === idSaison);
      if (selectedSaison) {
        setMatchSaison(selectedSaison.match);
      }
    }
  }, [idSaison, saisons]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matchSaison && idSaison) {
      updateSaisonMatch({
        variables: {
          saisonId: idSaison,
          newMatch: matchSaison,
        },
      });
    }
  };

  const handleMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMatchSaison(parseInt(value));
  };

  return (
    <Card className="border rounded border-tertiary/20 w-full sm:w-1/2">
      <CardHeader>
        <CardTitle>Modifier le nombre de matchs d'une saison</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="idSaison">Saison</Label>
              <Select
                name="idSaison"
                value={idSaison}
                onValueChange={setIdSaison}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {saisons.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="match">Nb de matchs</Label>
              <Input
                name="match"
                id="match"
                placeholder="52"
                type="number"
                value={matchSaison}
                onChange={handleMatchChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="success">
              Mettre à jour
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
