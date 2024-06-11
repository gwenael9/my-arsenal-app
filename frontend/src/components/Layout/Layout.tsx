import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "../ui/toaster";
import { useGoalsQuery } from "@/types/graphql";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import MenuMobile from "./MenuMobile";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // ferme la nav mobile quand on resize l'écran
  useEffect(() => {
    window.addEventListener("resize", closeMenu);
    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, [closeMenu]);

  // tout nos buts
  const { data: allGoalData } = useGoalsQuery();
  const allGoal = allGoalData?.goals;

  // premier but en bdd
  const firstGoal = allGoal
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.min(a, b), Infinity);

  const navLink = [
    { name: "Buts", link: `/goals/${firstGoal}` },
    { name: "Statistique", link: "/statistique" },
    { name: "Me soutenir", link: "https://www.paypal.com/paypalme/ggueho", target: "_blank"},
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Tout les buts d'Arsenal cette saison" />
        <meta name="viewport" content="width=device-width, initial-scale-1" />
        <meta name="keywords" content="arsenal buts goals" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
          ></link>
      </Head>
      <header className={`p-6 flex justify-between items-center h-20 border-b ${isOpen && "blur"}`}>
        <div className="flex justify-between items-center gap-2.5">
          <Link href="/" className="font-bold">
            <span className="text-lg">ARSENAL</span>
          </Link>
        </div>

        <nav className={`items-center space-x-8 hidden sm:inline`}>
          {navLink.map((n, index) => (
            <Link
            className="font-bold uppercase hover:text-primary"
            key={index}
            href={n.link}
            target={n.target}
            >
              {n.name}
            </Link>
          ))}
        </nav>

        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu}>
            {!isOpen ? <AlignJustify height={24} /> : <X height={24} />}
          </button>
        </div>
      </header>
      <MenuMobile isOpen={isOpen} closeMenu={closeMenu} navLink={navLink} />
      <main
        className={`overflow-y-auto ${isOpen && "blur"}`}
        style={{ maxHeight: "calc(100vh - 80px" }}
        >
        {children}
      </main>
      <Toaster />
    </>
  );
}
