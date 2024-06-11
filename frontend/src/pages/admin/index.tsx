import LoginCard from "@/components/Admin/Login";
import Layout from "@/components/Layout/Layout";

export default function Login() {

  return (
    <Layout title="Connexion">
      <div className="flex justify-center h-[calc(100vh-100px)] items-center bg-quadrille">
        <LoginCard />
      </div>
    </Layout>
  );
}
