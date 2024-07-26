import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CardLogProps {
    item: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    value?: string;
}

export default function CardLog({ item, handleSubmit, value}: CardLogProps) {
  return (
    <Card className="flex flex-col w-[300px] border border-tertiary/20 rounded">
      <CardHeader className="space-x-1">
        <CardTitle className="text-2xl">{item}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
            />
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" name="password" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="success">
              {item}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
