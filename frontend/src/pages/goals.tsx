import GoalCard from "@/components/Goals/goal.card";
import Layout from "@/components/Layout/Layout";
import { useGoalsQuery } from "@/types/graphql";

const Goals: React.FC = () => {

    const { data } = useGoalsQuery();
    const goals = data?.goals || [];

    return (
        <Layout title="Les buts">
            <h2 className="font-bold text-xl">{goals.length} BUTS</h2>

            <div className="flex justify-center">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                    {goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} />
                    ))}
                </div>
            </div>

            

        </Layout>
    )
};

export default Goals;