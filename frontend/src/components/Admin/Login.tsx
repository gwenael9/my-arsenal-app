import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useLazyQuery } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { LoginQuery, LoginQueryVariables, InputLogin } from "@/types/graphql";
import { useRouter } from "next/router";

export default function LoginCard() {
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
            router.push("/admin/players");
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
    <Card className="flex flex-col w-[300px] border border-tertiary/20 rounded">
      <CardHeader className="space-x-1">
        <CardTitle className="text-2xl">Connexion</CardTitle>
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
            <Input id="password" type="password" name="password" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="success">
              Connexion
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
