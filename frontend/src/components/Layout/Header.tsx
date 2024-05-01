import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const burgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  // ferme la nav mobile quand on resize l'écran
  useEffect(() => {
    window.addEventListener("resize", handleCloseButton);
    return () => {
      window.removeEventListener("resize", handleCloseButton);
    };
  }, []);

  const navLink = [
    { name: "Statistique", link: "/statistique" },
    {
      name: "Github",
      link: "https://github.com/gwenael9/my-arsenal-app",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <>
      <header className="p-6 flex justify-between items-center h-20 border-b">
        <div className="flex justify-between items-center gap-2.5">
          <Link href="/" className="font-bold">
            <span className="md:hidden">AFC</span>
            <span className="hidden md:inline text-lg">ARSENAL</span>
          </Link>
        </div>

        <nav className={`items-center space-x-8 hidden md:inline`}>
          {navLink.map((n, index) => (
            <Link className="font-bold uppercase hover:text-primary" key={index} href={n.link} target={n.target} rel={n.rel}>
              {n.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={burgerMenu}>
            {!isOpen ? (
              <AlignJustify height={24} />
            ) : (
              <X height={24} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`bg-background absolute top-20 bottom-0 z-50 w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "left-0" : "left-full"
        }`}
      >
        <div className="h-full w-full p-5 flex flex-col gap-10">
          <div className="flex justify-center flex-col items-center gap-2">
            {navLink.map((n, index) => (
              <Link key={index} href={n.link} target={n.target} rel={n.rel}>
                {n.name}
              </Link>
            ))}
          </div>
          <div className="flex-grow"></div>
          <hr />
          {/* placer un footer style copyright 2024 Gwenael Guého */}
        </div>
      </div>
    </>
  );
}
