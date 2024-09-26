import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSaisonsQuery, useUpdateSaisonMatchMutation } from "@/types/graphql";
import { FormEvent, useEffect, useMemo, useState } from "react";
import CardLayout from "./CardLayout";
import { InputField, SelectField } from "../FormFields";

export default function CardSaison() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    idSaison: "",
    matchSaison: 0
  })

  const { data } = useSaisonsQuery();
  const saisons = data?.saisons || [];

  const triSaisons = useMemo(() => 
    saisons.filter((saison) => saison.name !== "all"),
    [saisons]
  );

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
    const selectedSaison = saisons.find((saison) => saison.id === formData.idSaison);
    if (selectedSaison) {
      setFormData((prev) => ({
        ...prev,
        matchSaison: selectedSaison.match || 0,
      }));
    }
  }, [formData.idSaison, saisons]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { idSaison, matchSaison } = formData;
    
    if (idSaison && matchSaison > 0) {
      updateSaisonMatch({
        variables: {
          saisonId: idSaison,
          newMatch: matchSaison,
        },
      });
    } else {
      toast({
        title: "Veuillez entrer un nombre de matchs valide.",
        variant: "destructive",
      });
    }
  };

  return (
    <CardLayout title="Modifier le nombre de matchs d'une saison">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SelectField
            label="Saison"
            name="idSaison"
            value={formData.idSaison}
            options={triSaisons.map((saison) => ({
              value: saison.id,
              label: saison.name,
            }))}
            onChange={handleInputChange}
          />
          <InputField
            label="Nb de matchs"
            name="matchSaison"
            type="number"
            value={formData.matchSaison}
            onChange={(e) => handleInputChange("matchSaison", parseInt(e.target.value))}
            placeholder="52"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="success">
            Mettre à jour
          </Button>
        </div>
      </form>
    </CardLayout>
  );
}
