import { useGetGoalByOrdreQuery, useGoalsQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const GoalCarouselPage = () => {
  const router = useRouter();
  const { goalOrdre } = router.query;

  // verif si le but est bien valide
  const { data: goalByOrdre } = useGetGoalByOrdreQuery({
    variables: {
      goalOrdre: typeof goalOrdre === "string" ? parseInt(goalOrdre, 10) : 0,
    },
    skip: typeof goalOrdre === "undefined",
  });

  const goal = goalByOrdre?.getGoalByOrdre;

  // tout nos buts
  const { data: allGoalData } = useGoalsQuery();
  const allGoal = allGoalData?.goals;

  // premier but en bdd
  const firstGoal = allGoal
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.min(a, b), Infinity);

  // dernier but en bdd
  const lastGoal = allGoal
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.max(a, b), -Infinity);

  const changeGoal = (direction: "next" | "last") => {
    if (typeof goalOrdre === "string") {
      const currentOrdre = parseInt(goalOrdre, 10);
      const isNext = direction === "next";
      const filteredGoals = allGoal
        ?.map((g) => g.ordre)
        ?.filter((ordre) =>
          isNext ? ordre > currentOrdre : ordre < currentOrdre
        )
        ?.sort((a, b) => (isNext ? a - b : b - a));

      const nextOrPrevGoal = filteredGoals ? filteredGoals[0] : undefined;

      if (nextOrPrevGoal !== undefined) {
        router.push(`/goals/${nextOrPrevGoal}`);
      } else {
        console.log("Aucun but trouvé");
      }
    }
  };

  return (
    <Layout title={`But n°${goalOrdre}`}>
      <div className="flex items-center flex-col mt-5">
        <div className="flex items-center gap-3">
          {typeof goalOrdre === "string" &&
            firstGoal !== parseInt(goalOrdre) && (
              <Button onClick={() => changeGoal("last")} variant={"carousel"}>
                <span className="material-symbols-outlined">chevron_left</span>
              </Button>
            )}

          <h2 className="text-2xl font-bold">But n°{goalOrdre}</h2>

          {typeof goalOrdre === "string" &&
            lastGoal !== parseInt(goalOrdre) && (
              <Button onClick={() => changeGoal("next")} variant={"carousel"}>
                <span className="material-symbols-outlined">chevron_right</span>
              </Button>
            )}
        </div>

        <div className="flex">
          <div className="my-5 mx-auto overflow-hidden rounded-xl">
            <iframe
              className="h-[400px] w-[400px] sm:w-[500px] sm:h-[500px] lg:w-[800px] border-none"
              src={goal?.link}
              data-gtm-yt-inspected-12="true"
              title={goal?.buteur?.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalCarouselPage;
