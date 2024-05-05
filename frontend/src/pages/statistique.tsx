import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Statistique() {
  return (
    <Layout title="Statistique">
      <div className="p-4">
        <div className="flex sm:flex-row flex-col justify-between">
          {/* <div className="bg-red-500">
            <h3>Nombres de buts</h3>
          </div> */}
          <div className="p-4">
            <h2 className="font-bold text-xl">
              Classement des meilleurs buteurs
            </h2>
            <Ranking />
          </div>
        </div>
      </div>
    </Layout>
  );
}
