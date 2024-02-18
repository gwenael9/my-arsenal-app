import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoalsQuery, usePlayersQuery } from "@/types/graphql";

export default function Statistique() {

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  return (
    <Layout title="Statistique">
      <div>
        <div>
          <h1 className="font-bold text-lg">Page de stats</h1>
          <p>Nombres de joueurs : {players.length}</p>
        </div>
        
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Joueurs" />
          </SelectTrigger>
          <SelectContent>
          {players.map((player) => ( <SelectItem value={player.name}>{player.name}</SelectItem> ))}
          </SelectContent>
        </Select>

        <div>
          {players.map((player, index) => (
            <div key={index}>
              <Card className="border bg-slate-500">
                <CardHeader>
                  {player.name} <span>{player.country}</span>
                </CardHeader>
                <CardContent>
                  <p>Nombres de but : {player.goals?.length}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
