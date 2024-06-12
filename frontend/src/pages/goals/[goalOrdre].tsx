import { useGetGoalByOrdreQuery, useGoalsQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Erreur from "@/components/Erreur";
import { useEffect, useState } from "react";
import ModalGoalInfo from "@/components/Goals/goal.modal.info";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  const getCopyright = (item: number) => {
    if (item == 8 || item == 9 || item == 51 || item == 25 || item == 23 || item == 39) {
      return ["https://www.youtube.com/@gunnerzcomps", "GunnerzComps"];
    } else if (item == 20 || item == 21 || item == 108) {
      return ["https://www.youtube.com/@AFCBournemouth", "AFC Bournemouth"];
    } 
    return ["https://www.youtube.com/@arsenal", "Arsenal"];
  }

  return (
    <Layout title={`But n°${goalOrdre}`}>
      {goal ? (
        <div>
          <div className="flex justify-end pt-4 pr-4">
            <ModalGoalInfo goal={goal} />
          </div>

          <div
            className="flex pt-4 sm:pt-0 items-center flex-col gap-4"
            style={{ height: "calc(100vh - 136px)" }}
          >
            <div className="flex items-center gap-4">
              {typeof goalOrdre === "string" &&
              firstGoal !== parseInt(goalOrdre) ? (
                <Button onClick={() => changeGoal("last")} variant={"carousel"}>
                  <ChevronLeft />
                </Button>
              ) : (
                <div className="w-14"></div>
              )}

              <h2 className="text-3xl font-bold">But n°{goalOrdre}</h2>

              {typeof goalOrdre === "string" &&
              lastGoal !== parseInt(goalOrdre) ? (
                <Button onClick={() => changeGoal("next")} variant={"carousel"}>
                  <ChevronRight />
                </Button>
              ) : (
                <div className="w-14"></div>
              )}
            </div>
            <Link
              className="text-xs flex gap-2 border rounded-sm p-2"
              href={getCopyright(goal.ordre)[0]}
              target="_blank"
            >
              <span>© {getCopyright(goal.ordre)[1]}</span>
              <Image src={"/youtube.svg"} width={24} height={0} alt="youtube" />
            </Link>

            <div className="flex justify-center w-full px-4">
              <div className="overflow-hidden rounded-xl w-full max-w-4xl ">
                <div className="relative pb-[56.25%] ">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`${goal?.link}&amp;autoplay=1`}
                    data-gtm-yt-inspected-12="true"
                    title={goal.buteur.lastname}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        showError && <Erreur item={`But n°${goalOrdre} inconnu.`} />
      )}
    </Layout>
  );
};

export default GoalCarouselPage;
