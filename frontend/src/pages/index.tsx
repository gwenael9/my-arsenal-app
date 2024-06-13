import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout title="Accueil">
      <div className="px-12 py-8 flex flex-col border-b bg-quadrille">
        <h1 className="text-3xl font-bold uppercase p-2">
          Tous les buts d'Arsenal saison 2023/2024
        </h1>
        <p>
          Bienvenue sur ma page, où vous pouvez retrouver toutes les vidéos des buts marqués par Arsenal au cours de la saison 2023/2024. Que vous soyez un fan inconditionnel ou que vous souhaitiez revivre les moments forts de cette saison, vous êtes au bon endroit pour découvrir et apprécier chaque but, chaque tir, chaque moment de magie sur le terrain.
        </p>
      </div>
    </Layout>
  );
}
