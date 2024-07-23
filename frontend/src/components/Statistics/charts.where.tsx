"use client";

import { Goal } from "@/types/graphql";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useLangue } from "../Layout/LangueContext";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  goals: {
    label: "Goals",
  },
};

interface StadeGoalsProps {
  goals: Goal[];
  saison: string;
}

interface CategorizedGoal {
  where: string;
  goals: number;
  fill: string;
}

export default function StadeGoals({ goals, saison }: StadeGoalsProps) {
  const { langue } = useLangue();
  const number = goals.length;
  if (number < 1) return null;

  const categorizeGoals = (goals: Goal[]): CategorizedGoal[] => {
    const initialData: CategorizedGoal[] = [
      { where: langue ? "Domicile" : "Home", goals: 0, fill: "#f00000" },
      { where: langue ? "Extérieur" : "Away", goals: 0, fill: "#E8F861" },
    ];

    return goals.reduce((acc, goal) => {
      const location =
        goal.where === "Emirates Stadium" || goal.where === "" ? 0 : 1;
      acc[location].goals += 1;
      return acc;
    }, initialData);
  };
  const data = categorizeGoals(goals);

  const description =
    saison === "all"
      ? langue
        ? "Toutes saisons confondues"
        : "All seasons combined"
      : langue
        ? `Pour la saison ${saison}`
        : `For the ${saison} season`;
  const total = langue
    ? `Un total de ${number} buts`
    : `A total of ${number} goals`;
    
const infoText = langue ? `${data[0].goals} à domicile et ${data[1].goals} à l'extérieur` : `${data[0].goals} home and ${data[1].goals} away`;

  return (
    <Card className="border sm:w-[500px] sm:h-[250px] sm:relative">
      <CardHeader className="pb-0 sm:pb-6">
        <CardTitle>
          {langue ? "Domicile - Extérieur" : "Home - Away"}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-square sm:max-h-[200px] w-full sm:w-1/2 sm:absolute sm:top-8 sm:right-0"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="where"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="goals"
              radius={8}
              barSize={40}
              fill={({ payload }: { payload: any }) => payload.fill}
            />
          </BarChart>
        </ChartContainer>
        <div className="sm:w-1/2 text-sm sm:text-base mt-2 sm:mt-0">
          <h3 className="font-semibold text-lg">{total}.</h3>
          <p>{infoText}.</p>
        </div>
      </CardContent>
    </Card>
  );
}
