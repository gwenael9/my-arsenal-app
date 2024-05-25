import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {
  return (
    <Layout title="Statistique">
      <h2 className="font-bold text-xl">Classement des meilleurs buteurs</h2>
      <div className="p-2">
        <Ranking />
      </div>
    </Layout>
  );
}
