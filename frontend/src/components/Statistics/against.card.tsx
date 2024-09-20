import { useLangue } from "@/components/Layout/LangueContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCode } from "@/lib/functions";
import { useGetTeamWithMostGoalsQuery } from "@/types/graphql";
import Image from "next/image";

interface AgainstMostGoalCardPros {
  playerId?: string;
  name?: string;
  saison: string;
}

export default function AgainstMostGoalCard({
  playerId,
  name,
  saison,
}: AgainstMostGoalCardPros) {
  const { langue } = useLangue();

  const { data } = useGetTeamWithMostGoalsQuery({
    variables: {
      buteurId: playerId,
      saison: saison,
    },
  });
  const result = data?.getTeamWithMostGoals;

  if (!result || result.goals <= 0) return null;

  // on recup le code de l'equipe, arsenal => afc
  const code = getCode(result.name);

  const description =
    saison === "all"
      ? langue
        ? "Toutes saisons confondues"
        : "All seasons combined"
      : langue
        ? `Pour la saison ${saison}`
        : `For the ${saison} season`;

  const title = langue ? "Equipe favorite" : "Favorite team";
  const goalsScored = langue
    ? result.goals === 1
      ? "but marqué"
      : "buts marqués"
    : result.goals === 1
      ? "goal scored"
      : "goals scored";
  const infoText = `${langue ? "Il s'agit de l'adversaire au quel" : "This is the opponent against whom"} ${name || "Arsenal"} ${langue ? "a marqué le plus de buts" : "have scored the most goals"}.`;

  return (
    <Card className="border sm:w-[500px] sm:h-[250px]">
      <div className="flex">
        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="font-semibold text-lg">{result.name}</h3>
                <p>
                  {result.goals} {goalsScored}
                </p>
              </div>
              <p className="text-base hidden sm:block italic">{infoText}</p>
            </div>
          </CardContent>
        </div>
        <div className="w-1/3 sm:w-full flex items-center justify-center py-6">
          <Image
            src={`club/${code}.svg`}
            height={0}
            width={100}
            alt="club logo"
            // variant de taille pour les logos de tottenham et nottingham
            className={`${code != "tot" && "sm:w-[150px]"} max-h-[170px] ${code == "tot" || code == "nf" && "w-[70px] sm:w-[85px]"}`}
          />
        </div>
      </div>
      <CardFooter className="sm:hidden text-sm italic">{infoText}</CardFooter>
    </Card>
  );
}
