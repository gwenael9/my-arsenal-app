import { useGetGoalByOrdreQuery, useGoalsQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Erreur from "@/components/Erreur";
import { useEffect, useState } from "react";
import ModalGoalInfo from "@/components/Goals/goal.modal.info";

const GoalCarouselPage = () => {
  const router = useRouter();
  const { goalOrdre } = router.query;
  const [showError, setShowError] = useState(false);

  // verif si le but est bien valide
  const { data: goalByOrdre, loading } = useGetGoalByOrdreQuery({
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
    ?.reduce((a, b) => Math.min(a, b), 120);

  // dernier but en bdd
  const lastGoal = allGoal
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.max(a, b), 0);

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

  useEffect(() => {
    if (!loading && !goal) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, goal]);

  return (
    <Layout title={`But n°${goalOrdre}`}>
      {goal ? (
        <>
          <div className="absolute right-5 top-24">
            <ModalGoalInfo goal={goal} />
          </div>

          {/* style bidouillage, a revoir */}
          <div className={`flex pt-24 sm:pt-0 sm:justify-center items-center flex-col`} style={{ height: 'calc(100vh - 100px)'}}>
            <div className="flex items-center gap-3">
              {typeof goalOrdre === "string" &&
                firstGoal !== parseInt(goalOrdre) ? (
                  <Button
                    onClick={() => changeGoal("last")}
                    variant={"carousel"}
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </Button>
                ) : (
                  <div className="w-14"></div>
                )}

              <h2 className="text-2xl font-bold">But n°{goalOrdre}</h2>

              {typeof goalOrdre === "string" &&
                lastGoal !== parseInt(goalOrdre) ? (
                  <Button
                    onClick={() => changeGoal("next")}
                    variant={"carousel"}
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </Button>
                ) : (
                  <div className="w-14"></div>
                )}
            </div>

            <div className="flex">
              <div className="my-5 mx-auto overflow-hidden rounded-xl">
                <iframe
                  className="h-[400px] w-[400px] sm:w-[600px] sm:h-[500px] lg:h-[600px] lg:w-[800px] border-none"
                  src={goal?.link}
                  data-gtm-yt-inspected-12="true"
                  title={goal?.buteur.lastname}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </>
      ) : (
        showError && <Erreur item={`But n°${goalOrdre} inconnu.`} />
      )}
    </Layout>
  );
};

export default GoalCarouselPage;
