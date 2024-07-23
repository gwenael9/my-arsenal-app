import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Classement() {
  
  return (
    <Layout title="Classement">
      <div className="flex justify-center">
        <Ranking />
      </div>
    </Layout>
  );
}
