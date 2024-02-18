import { GoalsCarousel } from "@/components/Goals/goal.card.carousel";
import Layout from "@/components/Layout/Layout";
import Ranking from "@/components/Players/player.ranking";

export default function Home() {
  return (
    <Layout title="Accueil">
      <div className="grid md:grid-rows-2">
        <div className="flex justify-center items-center p-8">
          <p className="text-2xl">
            Bienvenue sur mon site, ce site va vous permettre de (re)voir les
            buts d'Arsenal au cours de cette fabuleuse saison. Bon visionnage !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="text-2xl font-bold text-primary mb-2">Nos derniers buteurs</h2>
            <div className="flex justify-center">
              <GoalsCarousel />
            </div>
          </div>

          <div className="">
            <h2 className="text-2xl font-bold text-primary mb-2">Classement des meilleurs buteurs</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
                provident corrupti assumenda similique quia tempora est aperiam
                enim consectetur! Ducimus esse accusamus est quos incidunt
                doloribus animi mollitia aliquid voluptatibus.
              </p>
              <Ranking />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
