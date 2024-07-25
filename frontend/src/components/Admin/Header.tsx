import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useLogoutLazyQuery } from "@/types/graphql";
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

  return (
    <header className="sticky top-0 left-0 right-0 p-6 bg-tertiary">
      <div className="flex mx-auto items-center justify-between text-white">
        <Link className="font-bold uppercase" href="/">
          accueil
        </Link>

        <Button variant="destructive" onClick={handleLogout}>
          <span className="sm:hidden">
            <LogOut />
          </span>
          <span className="hidden sm:block">Déconnexion</span>
        </Button>
      </div>
    </header>
  );
}
