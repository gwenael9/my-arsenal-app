import { useGetGoalByOrdreQuery, useGoalsQuery } from "@/types/graphql";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

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
    <Layout title="test">
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
                // src={goal.link}
                src="https://www.youtube.com/embed/ADQlEP3M2_c?si=Cb-E5SQPrBDHCACt?controls=0&amp;autoplay=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;loop=1&amp;start=NaN&amp;end=NaN&amp;enablejsapi=1&amp;origin=https%3A%2F%2F&amp;widgetid=3"
                title={goal.player?.name}
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div onClick={nextGoal} className="flex justify-center items-center">
            <button className="p-4 rounded-full h-fit">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalCarouselPage;
