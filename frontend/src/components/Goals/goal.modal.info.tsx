import { GoalCardProps } from "@/types/interface";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { formaterDate, getCode, getName, isDomicile, logo, toUpOne } from "@/lib/functions";
import { Info, X } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ModalGoalInfo({ goal }: GoalCardProps) {

  // recupere le code de l'equipe adverse
  const codeAdverse = getCode(goal.against);

  const getClubLogo = (isHome: boolean) => (
    <>
      <Image
        src={`/club/${isHome ? "afc" : codeAdverse}.svg`}
        height={0}
        width={90}
        alt={isHome ? "Arsenal logo" : goal.against}
        className="max-h-[100px]"
        />
      <p>vs</p>
      <Image
        src={`/club/${isHome ? codeAdverse : "afc"}.svg`}
        height={0}
        width={90}
        alt={isHome ? goal.against : "Arsenal logo"}
        className="max-h-[100px]"
      />
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="filtre">
          Infos <Info size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-tertiary p-4 border overflow-hidden">
        <DialogHeader>
          <div>
            <DialogTitle>{getName(goal.buteur)}</DialogTitle>
            <DialogDescription>{getName(goal.passeur)}</DialogDescription>
          </div>
          <Image
            src={`/${goal.competition}.svg`}
            height={0}
            width={Number(logo(goal, "modal"))}
            alt={goal.competition}
          />
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center items-center gap-2">
            {getClubLogo(isDomicile(goal))}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <Badge variant="black">{toUpOne(goal.where) || "Emirates Stadium"}</Badge>
              <Badge variant="test">{formaterDate(goal.date)}</Badge>
            </div>
            <DialogClose asChild>
              <div className="hover:cursor-pointer"><X /></div>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
