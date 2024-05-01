import CardCreateGoal from "@/components/Admin/Create/CardCreateGoal";
import Layout from "@/components/Admin/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteGoalMutation, useGoalsQuery } from "@/types/graphql";
import { useRouter } from "next/router";

export default function AdminGoals() {

  const { toast } = useToast();
  const router = useRouter();

  const { data: goalsData } = useGoalsQuery();
  const goals = goalsData?.goals || [];

  const [deleteGoal] = useDeleteGoalMutation();

  const handleDelete = (id: string) => {
    deleteGoal({
      variables: {
        deleteGoalId: id,
      },
      onCompleted: (data) => {
        if (data.deleteGoal.success) {
          router.reload();
          toast({
            title: data.deleteGoal.message,
          });
        }
      },
    });
  };

  return (
    <Layout title="Configuration - Buts">
      <div className="flex justify-end">
        <Button onClick={() => router.push("/admin/players")}>Players</Button>
      </div>

      <div className="flex gap-2">
        <div className="w-1/4">
          <CardCreateGoal />
        </div>
        <div className="w-3/4">
          <h2>Nombres de buts : {goals.length}</h2>
          <div className="flex gap-2 w-full">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex justify-between p-2 bg-secondary/90 rounded"
              >
                <p>{goal.ordre}</p>
                <Button onClick={() => handleDelete(goal.id)}>
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
