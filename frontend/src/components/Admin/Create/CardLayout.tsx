import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CardLayoutProps {
  title: string;
  children: ReactNode;
}

export default function CardLayout({ title, children }: CardLayoutProps) {
  return (
    <Card className="border border-tertiary/20 w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
