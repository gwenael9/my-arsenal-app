import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin, LoginQuery, LoginQueryVariables } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Login() {
  const [login] = useLazyQuery<LoginQuery, LoginQueryVariables>(LOGIN);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
        onCompleted(data) {
          if (data.login.success) {
            router.push("/admin/test");
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
    <Layout title="Connexion">
      <h1>Page de connexion</h1>
      <Card className="flex flex-col">
        <CardHeader className="space-x-1">
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>
            Entrer votre email pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-2">
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
              <Input
                id="password"
                type="password"
                name="password"
                data-testid="login-password"
              />
            </div>
            <Button type="submit" className="w-full bg-primary">
              Connexion
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
