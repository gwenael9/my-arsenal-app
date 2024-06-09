import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";

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
  return (
    <div
      className={`fixed w-full top-20 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
    >
      <div
        className="bg-white py-5 rounded mx-10"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex justify-center flex-col items-center mt-4">
            {navLink.map((n, index) => (
              <div className="hover:bg-tertiary/20 w-full text-center py-2">
                <Link
                  key={index}
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
          <div className="absolute bottom-0 right-0 p-4">
            <Button variant={"arrowCard"} onClick={closeMenu}>
              <X />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
