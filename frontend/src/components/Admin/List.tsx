import { Button } from "@/components/ui/button";
import Layout from "@/components/Admin/Layout";
import Etiquettes from "@/components/Admin/Etiquettes";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

interface AdminListProps {
  title: string;
  itemType: string;
  items: any[];
  onCreateComponent: React.ReactNode;
  onDelete: (id: string) => void;
  getItemName: (item: any) => string;
  redirectPath: string;
}

export default function AdminList({ title, itemType, items, onCreateComponent, onDelete, getItemName, redirectPath }: AdminListProps)  {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: `${itemType} supprimé avec succès`,
    });
    router.reload();
  };

  return (
    <Layout title={`Configuration - ${title}`}>
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-xl sm:text-2xl">
          Nombre de {itemType} : {items.length}
        </h2>
        <Button variant={"filtre"} onClick={() => router.push(redirectPath)}>
          {redirectPath.includes('goals') ? 'Buts' : 'Joueurs'}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex justify-center">
          {onCreateComponent}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-0">
            {items.map((item) => (
              <Etiquettes key={item.id} {...{ [itemType]: item, handleDelete }} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
