"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getRatioGoalByMatch } from "@/lib/functions";
import { Goal, useSaisonByNameQuery } from "@/types/graphql";
import { useLangue } from "@/components/Layout/LangueContext";
import CardForCharts from "./card.charts";

const chartConfig = {
  buts: { label: "Buts" },
  pl: { label: "PL", color: "#3F1052" },
  facup: { label: "FA Cup", color: "#BB1822" },
  ldc: { label: "LDC", color: "#00003E" },
  eflcup: { label: "EFL Cup", color: "#00905E" },
  cs: { label: "CS", color: "#D40319" },
} satisfies ChartConfig;

interface CompetitionsProps {
  goals: Goal[];
  item?: "buteur" | "passeur";
  name: string;
}

const competitionColors: Record<string, string> = {
  "Premier League": "pl",
  "Champions League": "ldc",
  "Community Shield": "cs",
};

export default function ChartsGoal({ goals, item, name }: CompetitionsProps) {
  const { langue } = useLangue();

  // on recupere les données de la saison (matchs, buts)
  const { data } = useSaisonByNameQuery({
    variables: {
      name,
    },
  });
  const saison = data?.saisonByName;

  // on tri nos goals
  /*
    goals [
      id: x
      date: x
      link: x
      ordre: x
      passeur: x
      saison: x
      where: x
      competition: x
    ]

    =>

    goalsTri [
      competition: 'pl'
      buts: tout les buts de la competition 'pl'
      fill: color
    ]

  */
  const goalsTri = goals.reduce<
    { competition: string; buts: number; fill: string }[]
  >((acc, goal) => {
    const competition = competitionColors[goal.competition] || goal.competition;
    const existingCompetition = acc.find((c) => c.competition === competition);
    if (existingCompetition) {
      existingCompetition.buts += 1;
    } else {
      acc.push({
        competition,
        buts: 1,
        fill: `var(--color-${competition.toLowerCase().replace(/\s+/g, "")})`,
      });
    }
    return acc;
  }, []);

  // nombres de buts
  const number = goals.length;
  // tout les buts de la saison selectionnée
  const totalGoalsSaison = saison?.goals || 0;
  // nombres de matchs dans la saison selectionnée
  const nbMatch = saison?.match || 0;

  // si aucun match dans la saison sélectionné, on affiche pas la card
  if (nbMatch == 0) {
    return null;
  }

  const title =
    item === "passeur"
      ? langue
        ? "Passes décisives"
        : "Assists"
      : langue
        ? "Buts"
        : "Goals";
  const contentGoal =
    item === "passeur"
      ? langue
        ? "passes décisives"
        : "assists"
      : langue
        ? "buts"
        : "goals";

  const descriptionText = langue
    ? "Dans chaque compétition"
    : "In each competition";
  const averageText = langue ? "Une moyenne de" : "An average of";
  const perGameText = langue ? "par match" : "per game";
  const arsenalGoalsText = langue ? "des buts d'Arsenal" : "of Arsenal's goals";

  const textTotal = item
    ? `${number} ${contentGoal}`
    : `${number} ${contentGoal} ${langue ? "en" : "in"} ${nbMatch} ${langue ? "matchs" : "games"}`;
  const infoText = item
    ? `${getRatioGoalByMatch(number, totalGoalsSaison, true)}% ${arsenalGoalsText}`
    : `${averageText} ${getRatioGoalByMatch(number, nbMatch)} ${title} ${perGameText}`;

  return (
    number > 0 && (
      <CardForCharts
        title={title}
        description={descriptionText}
        total={textTotal}
        infoText={infoText}
      >
        <ChartContainer
          config={chartConfig}
          className="aspect-square sm:max-h-[200px] w-full sm:w-1/2 sm:absolute sm:top-8 sm:right-0"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={goalsTri}
              dataKey="buts"
              nameKey="competition"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold"
                        >
                          {number}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {title}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardForCharts>
    )
  );
}
