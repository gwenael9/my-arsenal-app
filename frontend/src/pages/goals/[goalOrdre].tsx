import { useGetGoalByOrdreQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";

const GoalCarouselPage = () => {
  const router = useRouter();
  const { goalOrdre } = router.query;

  console.log(router.query);

  // verif si le but est bien valide
  const { data } = useGetGoalByOrdreQuery({
    variables: {
      goalOrdre: typeof goalOrdre === "string" ? parseInt(goalOrdre, 10) : 0,
    },
    skip: typeof goalOrdre === "undefined",
  });

  const goal = data?.getGoalByOrdre;
  console.log(goal);

  return (
    <Layout title="test">
      {typeof goal === "undefined" ? (
        <div className="flex items-center justify-center bg-green-200">
          <div className="bg-red-200 w-64 h-64 flex items-center justify-center">
            <p>But non répertorié</p>
          </div>
        </div>
      ) : (
        <div>
          <p>{goal?.player?.name}</p>
          <p>{goal.link}</p>
        </div>
      )}
    </Layout>
  );
};

export default GoalCarouselPage;
