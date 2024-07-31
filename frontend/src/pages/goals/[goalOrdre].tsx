import { useGetGoalByOrdreQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Erreur from "@/components/Erreur";
import { useEffect, useState } from "react";
import ModalGoalInfo from "@/components/Goals/goal.modal.info";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLangue } from "@/components/Layout/LangueContext";
import { useQuery } from "@apollo/client";
import { NUMBER_GOALS } from "@/requetes/queries/nbGoals.queries";

const GoalCarouselPage = () => {
  const router = useRouter();
  const { langue } = useLangue();
  const { goalOrdre } = router.query;
  const [showError, setShowError] = useState(false);

  // vérifie si le but est valide en récupérant les données associées
  const { data: goalByOrdre, loading } = useGetGoalByOrdreQuery({
    variables: {
      goalOrdre: typeof goalOrdre === "string" ? parseInt(goalOrdre, 10) : 0,
    },
    skip: typeof goalOrdre === "undefined",
  });

  const goal = goalByOrdre?.getGoalByOrdre;

  const { data: nbGoalsData } = useQuery(NUMBER_GOALS);
  const nbGoals = nbGoalsData.nbGoals || [];

  // premier et dernier but
  const firstGoal = nbGoals[0];
  const lastGoal = nbGoals[nbGoals.length - 1];

  // changer de goal
  const changeGoal = (direction: "next" | "last") => {
    if (typeof goalOrdre === "string") {
      const currentOrdre = parseInt(goalOrdre, 10);
      const currentIndex = nbGoals.indexOf(currentOrdre);
      const isNext = direction === "next";

      if (currentIndex !== -1) {
        const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;

        // vérifie si le nouvel index est valide avant de naviguer
        if (newIndex >= 0 && newIndex < nbGoals.length) {
          const nextOrPrevGoal = nbGoals[newIndex];
          router.push(`/goals/${nextOrPrevGoal}`);
        }
      }
    }
  };

  // affichage de l'erreur si le but n'est pas trouvé
  useEffect(() => {
    if (!loading && !goal) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, goal]);

  // obtenir les crédits appropriés pour chaque goal
  const getCopyright = (item: number) => {
    if ([8, 9, 51, 25, 23, 39].includes(item)) {
      return ["https://www.youtube.com/@gunnerzcomps", "GunnerzComps"];
    } else if ([20, 21, 108].includes(item)) {
      return ["https://www.youtube.com/@AFCBournemouth", "AFC Bournemouth"];
    } else if ([46, 47].includes(item)) {
      return ["https://www.youtube.com/@GoalsCinematic", "GoalsCinematic"];
    }
    return ["https://www.youtube.com/@arsenal", "Arsenal"];
  };

  return (
    <Layout title={`But n°${goalOrdre}`}>
      {goal ? (
        <>
          <div className="absolute right-4 top-24">
            <ModalGoalInfo goal={goal} />
          </div>
          <div
            className="flex pt-24 md:pt-12 items-center flex-col gap-4"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <div className="flex items-center gap-4">
              {typeof goalOrdre === "string" &&
              firstGoal !== parseInt(goalOrdre) ? (
                <Button
                  onClick={() => changeGoal("last")}
                  variant={"carousel"}
                  aria-label={`Voir la vidéo du but n°${goal.ordre - 1}`}
                >
                  <ChevronLeft />
                </Button>
              ) : (
                <div className="w-14"></div>
              )}

              <h2 className="text-3xl font-bold">
                {langue ? "But" : "Goal"} n°{goalOrdre}
              </h2>

              {typeof goalOrdre === "string" &&
              lastGoal !== parseInt(goalOrdre) ? (
                <Button
                  onClick={() => changeGoal("next")}
                  variant={"carousel"}
                  aria-label={`Voir la vidéo du but n°${goal.ordre + 1}`}
                >
                  <ChevronRight />
                </Button>
              ) : (
                <div className="w-14"></div>
              )}
            </div>
            <Link
              className="bg-white text-xs flex gap-2 border rounded-md p-2"
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
        </>
      ) : (
        showError && <Erreur item={`But n°${goalOrdre} inconnu.`} />
      )}
    </Layout>
  );
};

export default GoalCarouselPage;
