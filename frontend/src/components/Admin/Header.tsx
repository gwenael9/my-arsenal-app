import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";
import { LOGOUT } from "@/requetes/queries/auth.queries";
import { useToast } from "../ui/use-toast";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const [logout] = useLazyQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT);


  const burgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout({
      onCompleted: (data) => {
        if (data.logout.success) {
          router.push("/");
          setTimeout(() => {
            toast({
              title: data.logout.message,
            });
          }, 500);
        }
      },
    });
  }

  return (
    <header className="sticky top-0 left-0 right-0 p-6 bg-tertiary">
      <div className="flex mx-auto items-center justify-between text-white">
        <div className="flex justify-between items-center gap-2.5">
          <Link href="/" className="">
            <span className="md:hidden font-bold">AFC</span>
            <span className="hidden md:inline">ARSENAL</span>
          </Link>
        </div>

        {/* burger */}
        <div className="md:hidden">
          <button onClick={burgerMenu}>
            <span className="material-symbols-outlined">Menu</span>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav
          className={`items-center space-x-8 hidden md:inline ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <Link href="/statistique">Stats</Link>
          <a
            href="https://github.com/gwenael9/my-arsenal-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <Button onClick={handleLogout}>Déconnexion</Button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden block absolute top-full left-0 right-0 bg-tertiary py-2 px-6 overflow-hidden animate-slide-down">
            <div className="flex justify-center flex-col items-center gap-2">
              <Link href="/statistique">Stats</Link>
              <a
                href="https://github.com/gwenael9/my-arsenal-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
