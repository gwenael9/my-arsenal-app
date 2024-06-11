import CardCreateGoal from "@/components/Admin/Create/CardCreateGoal";
import AdminList from "@/components/Admin/List";
import { useDeleteGoalMutation, useGoalsQuery } from "@/types/graphql";


export default function AdminGoals() {
  const { data: goalsData } = useGoalsQuery();
  const goals = goalsData?.goals || [];
  const [deleteGoal] = useDeleteGoalMutation();

  const handleDelete = (id: string) => {
    deleteGoal({
      variables: {
        deleteGoalId: id,
      },
      onCompleted: () => {},
    });
  };

  return (
    <AdminList
      title="Buts"
      itemType="goal"
      items={goals}
      onCreateComponent={<CardCreateGoal />}
      onDelete={handleDelete}
      getItemName={(goal) => goal.name}
      redirectPath="/admin/players"
    />
  );
}
