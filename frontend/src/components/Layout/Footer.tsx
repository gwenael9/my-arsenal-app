import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useLangue } from "./LangueContext";

export default function Footer() {
  const { langue } = useLangue();
  const items = [
    { name: "github", link: "https://github.com/gwenael9?tab=repositories" },
    { name: "x", link: "https://x.com/guepp9" },
    { name: "gmail", link: "mailto:gwenaelgueho@gmail.com" },
  ];

  const text = langue ? "Tous droits réservés" : "All rights reserved";
  const remerciement = langue ? "Merci pour votre visite" : "Thank you for visiting";

  return (
    <div className="border-t h-20 px-6 mt-20">
      <div className="flex justify-center items-center h-full">
        <div className="flex space-x-4">
          {items.map((item, index) => (
            <Button key={index} variant="footer">
              <Link href={item.link} target="_blank">
                <Image
                  src={`/${item.name}.svg`}
                  height={0}
                  width={20}
                  alt={`logo de ${item.name}`}
                />
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <hr className="w-1/2 mx-auto" />
      <div className="text-center py-4 text-sm">
        <p>© 2024 Gwenael Gueho. {text}.</p>
        <p>{remerciement}.</p>
      </div>
    </div>
  );
}
