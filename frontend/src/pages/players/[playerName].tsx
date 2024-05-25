import Layout from "@/components/Layout/Layout";
import { flagCountry } from "@/lib/functions";
import { useGetPlayerByNameQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Erreur from "@/components/Erreur";
import { useEffect, useState } from "react";

export default function PlayerPage() {
  const router = useRouter();
  const { playerName } = router.query;
  const [showError, setShowError] = useState(false);

  const { data: playerByName, loading } = useGetPlayerByNameQuery({
    variables: {
      playerName: typeof playerName === "string" ? playerName : "",
    },
    skip: typeof playerName === "undefined",
  });

  const player = playerByName?.getPlayerByName;

  const erreur = "Joueur inconnu";

  const lastGoal = player?.goals
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.max(a, b), -Infinity);

  const getName = (item: any) => {
    const name = `${item?.firstname} ${item?.lastname}`;
    return name.toUpperCase();
  };

  useEffect(() => {
    if (!loading && !player) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500);

      // Cleanup the timer when component unmounts or when goal changes
      return () => clearTimeout(timer);
    }
  }, [loading, player]);

  return (
    <Layout title={`${player ? getName(player) : erreur}`}>
      <div className="p-2">
        {player ? (
          <div className="flex flex-col p-4 gap-2 border rounded">
            <div className="flex items-center">
              <img
                src={`https://flagcdn.com/${flagCountry(player.country)}.svg`}
                alt={player.country}
                className="w-8 mr-2"
              />
              <h2 className="text-3xl font-semibold">{getName(player)}</h2>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Buts : {player.goals?.length}</p>
                <p>Passes décisives : {player.passes?.length}</p>
              </div>
              {player.goals && player.goals?.length > 0 && (
                <Button onClick={() => router.push(`/goals/${lastGoal}`)}>
                  Voir son dernier but
                </Button>
              )}
            </div>
          </div>
        ) : (
          showError && <Erreur item={`${playerName} indisponible.`} />
        )}
      </div>
    </Layout>
  );
}
