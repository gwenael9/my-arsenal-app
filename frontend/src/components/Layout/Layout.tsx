import Head from "next/head";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Toaster } from "../ui/toaster";
import { useGetUserProfileQuery, useGoalsQuery } from "@/types/graphql";
import Link from "next/link";
import { AlignJustify, ArrowUp, X } from "lucide-react";
import MenuMobile from "./MenuMobile";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLangue } from "./LangueContext";
import { Button } from "../ui/button";

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);

  const { langue, setLangue } = useLangue();

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

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
  }, []);

  // tout nos buts
  const { data: allGoalData } = useGoalsQuery();
  const allGoal = allGoalData?.goals;

  // premier but en bdd
  const firstGoal = allGoal
    ?.map((g) => g.ordre)
    ?.reduce((a, b) => Math.min(a, b), Infinity);

  const navLink = [
    { name: `${langue ? "Buts" : "Goals"}`, link: `/goals/${firstGoal}` },
    { name: `${langue ? "Classement" : "Ranking"}`, link: "/classement" },
    {
      name: `${langue ? "Statistiques" : "Statistics"}`,
      link: "/statistiques",
    },
    {
      name: `${langue ? "Me soutenir" : "Support me"}`,
      link: "https://www.paypal.com/paypalme/ggueho",
      target: "_blank",
    },
  ];

  const langueTable = ["fr", "gb"];

  // button scrollTop
  const [buttonVisible, setButtonVisible] = useState(false);

  const renderLangueValue = (langue: boolean) => {
    const langCode = langue ? "fr" : "gb";
    return (
      <span
        className={`fi fi-${langCode}`}
        style={{ width: "1rem", height: "1rem" }}
      ></span>
    );
  };

  const handleLangueChange = (value: string) => {
    const newLangue = value === "fr";
    setLangue(newLangue);
  };

  // fonction pour revenir en haut de la page
  useEffect(() => {
    const mainElement = mainRef.current;
    const handleScroll = () => {
      if (mainElement) {
        setButtonVisible(mainElement.scrollTop > 200);
      }
    };

    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }
    handleScroll();

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        {router.pathname == "/" && (
          <>
            <meta
              name="description"
              content="Tout les buts d'Arsenal pour la saison 2023/2024"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content="arsenal buts goals" />
          </>
        )}
        <link rel="icon" href="arsenal.ico" />
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
      <header
        className={`p-6 relative flex justify-between items-center h-20 border-b ${
          isOpen && "blur"
        }`}
      >
        <div className="flex justify-between items-center gap-2.5">
          <Link href="/" className="font-bold uppercase">
            <h1>arsenal</h1>
          </Link>
        </div>

        <nav className={`items-center space-x-6 hidden md:flex`}>
          {currentUser && currentUser.getUserProfile && (
            <Link className="font-bold uppercase nav-link" href="/admin">
              admin
            </Link>
          )}
          {navLink.map((n, index) => (
            <Link
              className="font-bold uppercase nav-link"
              key={index}
              href={n.link}
              target={n.target}
            >
              {n.name}
            </Link>
          ))}
          <div className="w-12">
            <Select
              name="langue"
              value={langue ? "Français" : "Anglais"}
              onValueChange={handleLangueChange}
            >
              <SelectTrigger className="flex items-center gap-2 border-none p-1">
                <SelectValue asChild>{renderLangueValue(langue)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {langueTable.map((l, index) => (
                    <SelectItem
                      key={index}
                      value={l}
                      className="pl-2 flex justify-center"
                    >
                      <p
                        className={`fi fi-${l}`}
                        style={{ width: "1rem", height: "1rem" }}
                      ></p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </nav>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {!isOpen ? <AlignJustify height={24} /> : <X height={24} />}
          </button>
        </div>
      </header>
      <MenuMobile isOpen={isOpen} closeMenu={closeMenu} navLink={navLink} />
      <main
        ref={mainRef}
        className={`overflow-y-auto ${isOpen && "blur"}`}
        style={{ height: "calc(100vh - 80px)" }}
      >
        {children}
      </main>
      {buttonVisible && (
        <div className="fixed bottom-10 right-10 z-50">
          <Button variant="arrowCard" onClick={scrollToTop}>
            <ArrowUp size={24} />
          </Button>
        </div>
      )}
      <Toaster />
    </>
  );
}
