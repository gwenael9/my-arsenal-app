import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {
  
  return (
    <Layout title="Statistiques">
      <div className="flex justify-center">
        <Ranking />
      </div>
    </Layout>
  );
}
