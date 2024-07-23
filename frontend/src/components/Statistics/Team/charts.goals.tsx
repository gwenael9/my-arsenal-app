"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getRatioGoalByMatch, toUpOne } from "@/lib/functions";
import { Goal, useGetGoalsBySaisonQuery } from "@/types/graphql";
import { nbMatchFisrtSaison, nbMatchSecondSaison } from "@/utils/teams";
import { useLangue } from "@/components/Layout/LangueContext";

const chartConfig = {
  buts: { label: "Buts" },
  pl: { label: "PL", color: "#3F1052" },
  facup: { label: "FA Cup", color: "#BB1822" },
  ldc: { label: "LDC", color: "#00003E" },
  eflcup: { label: "EFL Cup", color: "#00905E" },
  cs: { label: "Community Shield", color: "#D40319" },
} satisfies ChartConfig;

interface CompetitionsProps {
  goals: Goal[];
  item?: "buteur" | "passeur";
  saison: string;
}

export default function ChartsGoal({ goals, item, saison }: CompetitionsProps) {
  const { langue } = useLangue();
  const { data } = useGetGoalsBySaisonQuery({ variables: { saison } });
  const nbTotalGoals = data?.getGoalsBySaison.length || 0;

  const goalsTri = goals.reduce<{ competition: string; buts: number; fill: string }[]>(
    (acc, goal) => {
      const competitionMap: { [key: string]: string } = {
        "Premier League": "pl",
        "Champions League": "ldc",
        "Community Shield": "cs",
      };
      const competition = competitionMap[goal.competition] || goal.competition;
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
    },
    []
  );

  const totalGoals = React.useMemo(() => goalsTri.reduce((acc, curr) => acc + curr.buts, 0), [goalsTri]);

  const number = goals.length;
  const title = item === "passeur" ? (langue ? "passes décisives" : "assists") : (langue ? "buts" : "goals");
  const contentGoal = item === "passeur" 
    ? (number === 1 ? (langue ? "passe décisive" : "assist") : (langue ? "passes décisives" : "assists"))
    : (number === 1 ? (langue ? "but" : "goal") : (langue ? "buts" : "goals"));

  const nbMatch = saison === "2023/2024" ? nbMatchFisrtSaison : saison === "2024/2025" ? nbMatchSecondSaison : nbMatchFisrtSaison + nbMatchSecondSaison;

  const descriptionText = langue ? "Dans chaque compétition" : "In each competition";
  const averageText = langue ? "Une moyenne de" : "An average of";
  const perGameText = langue ? "par match" : "per game";
  const arsenalGoalsText = langue ? "des buts d'Arsenal" : "of Arsenal's goals";

  return (
    <>
      {number > 0 && (
        <Card className="border sm:w-[500px] sm:relative sm:h-[250px]">
          <CardHeader>
            <CardTitle>{toUpOne(title)}</CardTitle>
            <CardDescription>{descriptionText}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="sm:w-1/2 text-sm sm:text-base">
              <h3 className="font-semibold text-lg">
                {item
                  ? `${number} ${contentGoal}.`
                  : `${number} ${title} ${langue ? "en" : "in"} ${nbMatch} ${langue ? "match" : "games"}.`}
              </h3>
              <p>
                {item
                  ? `${getRatioGoalByMatch(number, nbTotalGoals, true)}% ${arsenalGoalsText}.`
                  : `${averageText} ${getRatioGoalByMatch(number, nbMatch)} ${title} ${perGameText}.`}
              </p>
            </div>
            <ChartContainer config={chartConfig} className="aspect-square max-h-[200px] w-full sm:w-1/2 sm:absolute sm:top-8 sm:right-0">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={goalsTri} dataKey="buts" nameKey="competition" innerRadius={60} strokeWidth={5}>
                  <Label content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="text-3xl font-bold">
                            {totalGoals.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            {toUpOne(title)}
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }} />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
}
