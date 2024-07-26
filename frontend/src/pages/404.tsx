import { useLangue } from "@/components/Layout/LangueContext";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  const { langue } = useLangue();
  return (
    <Layout title="Erreur 404">
      <div className="flex justify-center mt-8">
        <div className="text-center flex flex-col gap-3">
          <div>
            <h2 className="text-5xl uppercase font-bold">
              {langue ? "erreur" : "error"} 404
            </h2>
            <p className="text-xl italic">
              {langue ? "Page inconnu" : "Unknown page"}.
            </p>
          </div>
          <div>
            <Button
              variant="black"
              onClick={() => router.push("/")}
              className="text-xl"
            >
              {langue ? "Accueil" : "Home"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
