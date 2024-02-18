import GoalCard from "@/components/Goals/goal.card";
import { GoalsCarousel } from "@/components/Goals/goal.card.carousel";
import Layout from "@/components/Layout/Layout";
import { useGoalsQuery } from "@/types/graphql";

export default function Home() {
  const { data } = useGoalsQuery();
  const goals = data?.goals || [];

  return (
    <Layout title="Accueil">
      <div className="flex justify-center">
        <GoalsCarousel />
      </div>
    </Layout>
  );
}
