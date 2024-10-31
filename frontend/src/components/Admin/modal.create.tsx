import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ModalConfirmProps {
  onConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
  isOpen: boolean;
  onChange: () => void;
}

export default function ModalCreate({ onConfirm, isOpen, onChange }: ModalConfirmProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onConfirm(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button variant="black" className="flex gap-2 items-center" onClick={onChange}>
          Ajouter <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="flex-col">
          <DialogTitle className="font-semibold text-xl">
            Ajouter un joueur
          </DialogTitle>
          <DialogDescription>
            Veuillez remplir ce formulaire afin d'ajouter un nouveau joueur.
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-6">
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
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="success" type="submit">
                Confirmer
              </Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  );
}
