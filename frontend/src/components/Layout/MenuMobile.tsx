import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useLangue } from "./LangueContext";

interface NavLink {
  name: string;
  link: string;
  target?: string;
}

interface MenuMobileProps {
  isOpen: boolean;
  closeMenu: () => void;
  navLink: NavLink[];
}

export default function MenuMobile({
  isOpen,
  closeMenu,
  navLink,
}: MenuMobileProps) {
  const { langue, setLangue } = useLangue();

  const getBgColor = (lang: string) => (langue ? "fr" : "gb") === lang ? "border-b-2 border-primary rounded-none" : "";

  return (
    <div
      className={`fixed w-full top-20 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="bg-white py-5 rounded mx-10"
        style={{ height: "calc(100vh - 160px)" }}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex justify-center flex-col items-center mt-4">
            {navLink.map((n, index) => (
              <div
                key={index}
                className="hover:bg-tertiary/20 w-full text-center py-2"
              >
                <Link
                  href={n.link}
                  onClick={closeMenu}
                  target={n.target}
                  className="text-xl uppercase font-bold w-full"
                >
                  {n.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex-grow" />
          <hr />
          <div className="flex items-center justify-center h-24">
            <div>
              {["fr", "gb"].map((lang, index) => (
                <Button
                  key={index}
                  className={`${getBgColor(lang)}`}
                  variant="langue"
                  onClick={() => setLangue(lang === "fr")}
                >
                  <span
                    className={`fi fi-${lang}`}
                    style={{ width: "2rem", height: "2rem" }}
                  />
                </Button>
              ))}
            </div>
          </div>
          <hr />
          <div className="flex justify-end px-2 pt-4">
            <Button variant="arrowCard" onClick={closeMenu}>
              <X />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
