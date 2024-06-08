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

export default function MenuMobile({ isOpen, closeMenu, navLink }: MenuMobileProps) {
    return (
        <div
        className={`fixed top-10 left-0 right-0 mx-auto z-50 transition-transform duration-300 ease-in-out max-w-[500px] bg-white p-5 rounded ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full -left-full"
        }`}
        style={{ width: 'calc(100% - 40px)', height: 'calc(100% - 100px)' }}
        >
        <div className={`flex flex-col gap-10`}>
          <div className="flex justify-center flex-col items-center gap-2">
            {navLink.map((n, index) => (
              <Link key={index} href={n.link} className="text-xl uppercase font-bold">
                {n.name}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-0 right-0 p-4">
            <Button variant={"arrowCard"} onClick={closeMenu}><X /></Button>
          </div>
        </div>
      </div>
    )
}