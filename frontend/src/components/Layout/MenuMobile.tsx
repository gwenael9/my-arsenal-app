import Link from "next/link";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface NavLink {
  name: string;
  link: string;
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
      className={`fixed w-full top-10 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
    >
      <div
        className="bg-white p-5 rounded mx-10"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col gap-10 h-full relative">
          <div className="flex justify-center flex-col items-center gap-2">
            {navLink.map((n, index) => (
              <Link
                key={index}
                href={n.link}
                className="text-xl uppercase font-bold"
              >
                {n.name}
              </Link>
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
