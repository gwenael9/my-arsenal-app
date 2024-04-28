import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {
  return (
    <Layout title="Statistique">
      <div className="">
        <h2 className="font-bold text-xl my-4 text-white">
          Classement des meilleurs buteurs
        </h2>
        <Ranking />
      </div>
    </Layout>
  );
}
