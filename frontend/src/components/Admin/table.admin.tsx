import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player, useDeletePlayerMutation } from "@/types/graphql";
import { getName } from "@/lib/functions";
import { LIST_PLAYERS } from "@/requetes/queries/player.queries";
import { useToast } from "../ui/use-toast";
import ModalConfirm from "./modal.confirm";

interface TableProps {
  data: Player[];
}

export default function TableAdmin({ data }: TableProps) {
  const { toast } = useToast();
  const [deletePlayer] = useDeletePlayerMutation();

  const handleDeletePlayer = (id: string) => {
    deletePlayer({
      variables: {
        deletePlayerId: id,
      },
      refetchQueries: [{ query: LIST_PLAYERS }],
      onCompleted: () => {
        toast({
          title: "Joueur supprimée avec succès !",
        });
      },
    });
  };

  return (
    <Table className="max-w-[800px]">
      <TableHeader className="border-b">
        <TableRow>
          <TableHead className="text-left">Nom</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((player) => (
          <TableRow key={player.id}>
            <TableCell className="text-left font-semibold">
              {getName(player)}
            </TableCell>
            <TableCell className="text-right">
              <ModalConfirm onConfirm={() => handleDeletePlayer(player.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
