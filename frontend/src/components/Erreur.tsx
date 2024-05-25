import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { ArrowBigLeft } from "lucide-react";

interface ErreurProps {
  item: string;
}

export default function Erreur({ item }: ErreurProps) {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-2">
      <h3 className="text-xl font-bold">{item}</h3>
      <Button variant={"black"} onClick={() => router.push("/")}><ArrowBigLeft />Retour</Button>
    </div>
  );
}
