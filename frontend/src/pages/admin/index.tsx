import CardLog from "@/components/Admin/CardLog";
import Layout from "@/components/Layout/Layout";
import { useToast } from "@/components/ui/use-toast";
import { LOGIN } from "@/requetes/queries/auth.queries";
import {
  LoginQuery,
  LoginQueryVariables,
  InputLogin,
} from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const [login] = useLazyQuery<LoginQuery, LoginQueryVariables>(LOGIN);

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
        onCompleted(data) {
          if (data.login.success) {
            router.push("/admin/configuration");
            setTimeout(() => {
              toast({
                title: data.login.message,
                variant: "success",
              });
            }, 300);
          } else {
            toast({
              title: data.login.message,
              variant: "destructive",
            });
          }
        },
        onError(error) {
          toast({
            title: error.message,
            variant: "destructive",
          });
        },
      });
    } else {
      toast({
        title: "Champ incomplet !",
        variant: "destructive",
      });
    }
  };


  return (
    <Layout title="Admin">
      <div className="flex justify-center h-[calc(100vh-80px)] items-center bg-quadrille">
        <CardLog item="Connexion" handleSubmit={handleSubmitLogin} />
      </div>
    </Layout>
  );
}
