import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { LoginQuery, LoginQueryVariables, InputLogin } from "@/types/graphql";
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
            router.push("/admin/joueurs");
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
        <Card className="flex flex-col w-[300px] border border-tertiary/20 rounded">
          <CardHeader className="space-x-1">
            <CardTitle className="text-2xl">Connexion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmitLogin} className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  name="email"
                />
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" name="password" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="success">
                  Confirmez
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
