import { useGetGoalByOrdreQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GoalCarouselPage = () => {
  const router = useRouter();
  const { goalOrdre } = router.query;

  const [loading, setLoading] = useState(true);

  console.log(router.query);

  // verif si le but est bien valide
  const { data } = useGetGoalByOrdreQuery({
    variables: {
      goalOrdre: typeof goalOrdre === "string" ? parseInt(goalOrdre, 10) : 0,
    },
    skip: typeof goalOrdre === "undefined",
  });

  const goal = data?.getGoalByOrdre;

  useEffect(() => {
    if (typeof goal !== "undefined") {
      setLoading(false);
    }
  }, [goalOrdre]);

  const nextGoal = () => {
    if (typeof goalOrdre === "string") {
      const next = parseInt(goalOrdre, 10) + 1;
      router.push(`/goals/${next}`);
    }
  };

  const lastGoal = () => {
    if (typeof goalOrdre === "string") {
      const last = parseInt(goalOrdre, 10) - 1;
      router.push(`/goals/${last}`);
    }
  };

  return (
    <Layout title={`But n°${goalOrdre}`}>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="flex items-center flex-col mt-5">
          <p className="text-lg font-bold">But n°{goalOrdre}</p>

          <div className="flex gap-5">
            <div className="flex justify-center items-center">
              <button onClick={lastGoal} className="p-4 rounded-full h-fit">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            </div>

            <div className="my-5 mx-auto overflow-hidden rounded-xl">
              {typeof goal === "undefined" ? (
                <div className="flex items-center justify-center bg-tertiary h-[400px] w-[350px] sm:w-[500px] sm:h-[500px] lg:w-[800px]">
                  <p className="text-xl text-white">But pas encore ajouté..</p>
                </div>
              ) : (
                <iframe
                  className="h-[400px] w-[350px] sm:w-[500px] sm:h-[500px] lg:w-[800px] border-none"
                  src={goal.link}
                  data-gtm-yt-inspected-12="true"
                  title={goal.player?.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div
              onClick={nextGoal}
              className="flex justify-center items-center"
            >
              <button className="p-4 rounded-full h-fit">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default GoalCarouselPage;
