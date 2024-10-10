import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useGetUserProfileQuery, useLogoutLazyQuery } from "@/types/graphql";
import { LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const [logout] = useLogoutLazyQuery();

  const handleLogout = () => {
    logout({
      onCompleted: (data) => {
        if (data.logout.success) {
          router.push("/");
        }
      },
    });
  };

  const dataEmail = useGetUserProfileQuery();
  // recupère la partir avant l'@
  const name = dataEmail.data?.getUserProfile.email.split("@")[0];

  const links = [
    { name: "joueurs", path: "joueurs" },
    { name: "buts", path: "buts" },
    { name: "saisons", path: "saisons" },
  ];

  return (
    <header className="w-1/6 pt-8 pb-4 h-screen bg-tertiary text-white">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center gap-6">
          <Link className="font-bold uppercase" href="/">
            accueil
          </Link>

          <div className="flex flex-col gap-2 items-center">
            {links.map((link, index) => (
              <Link key={index} href={link.path}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center w-full px-8">
          <p>{name}</p>
          <Button variant="destructive" size="none" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
