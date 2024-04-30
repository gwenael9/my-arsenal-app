import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const burgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 left-0 right-0 p-6 bg-tertiary">
      <div className="flex mx-auto items-center justify-between text-white">
        <div className="flex justify-between items-center gap-2.5">
          <Link href="/" className="">
            <span className="md:hidden font-bold">AFC</span>
            <span className="hidden md:inline">LILIIII</span>
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
