import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {
  return (
    <Layout title="Statistiques">
      {/* <h2 className="font-bold text-xl mb-2">Classement des meilleurs buteurs</h2> */}
      <div className="flex justify-center">
        <Ranking />
      </div>
    </Layout>
  );
}
