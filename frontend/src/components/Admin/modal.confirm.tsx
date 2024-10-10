import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface ModalConfirmProps {
  onConfirm: () => void;
}

export default function ModalConfirm({ onConfirm }: ModalConfirmProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="none">
          <Trash2 color="red" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="flex-col">
            <DialogTitle className="font-semibold text-xl">
              Confirmez-vous la suppression ?
            </DialogTitle>
            <DialogDescription>
              Cette action sera irréversible.
            </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <div className="flex gap-4">
            <Button variant="outline">Retour</Button>
            <Button onClick={handleConfirm}>Oui, supprimer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
