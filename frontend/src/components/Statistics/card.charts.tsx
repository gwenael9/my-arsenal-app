import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardForChartsProps {
  children: ReactNode;
  title: string;
  description: string;
  total: string;
  infoText: string
}

export default function CardForCharts({ children, title, description, total, infoText }: CardForChartsProps) {
  return (
    <Card className="border sm:w-[500px] sm:h-[250px] sm:relative">
      <CardHeader className="pb-0 sm:pb-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <div className="sm:w-1/2 text-sm sm:text-base mt-2 sm:mt-0">
          <h3 className="font-semibold text-lg">{total}.</h3>
          <p>{infoText}.</p>
        </div>
      </CardContent>
    </Card>
  );
}
