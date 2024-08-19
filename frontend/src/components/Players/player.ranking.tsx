import React, { useState } from "react";
import { Goal, usePlayersQuery } from "@/types/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flagCountry, getName, toUpOne } from "@/lib/functions";
import { MoveDown, MoveUp } from "lucide-react";
import { useLangue } from "../Layout/LangueContext";

type SortKey = "goals" | "passes";
type SortDirection = "ascending" | "descending";

interface RankingProps {
  saison: string;
}

export default function Ranking({ saison }: RankingProps) {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];
  const { langue } = useLangue();

  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "goals",
    direction: "descending",
  });

  const filterStatsBySeason = (stats: Goal[]): number =>
    stats?.filter((item) => saison === "all" || item.saison === saison).length || 0;

  const filteredPlayers = players.filter(
    (player) => filterStatsBySeason(player.goals as Goal[]) > 0 || filterStatsBySeason(player.passes as Goal[]) > 0
  );

  const sortedPlayers = filteredPlayers.sort((a, b) => {
    if (a.lastname === "csc") return 1;
    if (b.lastname === "csc") return -1;

    const aValue = filterStatsBySeason(a[sortConfig.key] as Goal[]);
    const bValue = filterStatsBySeason(b[sortConfig.key] as Goal[]);

    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
  });

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "descending" ? "ascending" : "descending",
    }));
  };

  const headers = {
    goals: langue ? "Buts" : "Goals",
    passes: langue ? "Passes" : "Assists",
  };

  const getBgPosition = (index: number) =>
    ["bg-or", "bg-argent", "bg-bronze", "bg-primary"][index] || "bg-primary";

  return (
    <Table className="max-w-[1200px]">
      <TableHeader className="border-b">
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>{langue ? "Joueurs" : "Players"}</TableHead>
          {["goals", "passes"].map((stat) => (
            <TableHead key={stat} onClick={() => requestSort(stat as SortKey)} className="cursor-pointer">
              <div className="flex justify-center items-center">
                {toUpOne(headers[stat as SortKey])}
                {sortConfig.key === stat ? (
                  sortConfig.direction === "ascending" ? (
                    <MoveDown color="red" size={12} />
                  ) : (
                    <MoveUp color="red" size={12} />
                  )
                ) : (
                  <MoveDown size={12} />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPlayers.map((player, index) => (
          <TableRow key={player.id}>
            <TableCell className="font-bold w-10">
              <div className="flex justify-center">
                <p className={`px-1 rounded-sm ${index < 3 || player.lastname === "csc" ? getBgPosition(index) : ""}`}>
                  {index + 1}.
                </p>
              </div>
            </TableCell>
            <TableCell className="font-bold flex items-center gap-2 justify-center">
              {flagCountry(player.country) && (
                <span className={`fi fi-${flagCountry(player.country)}`} style={{ width: "1rem", height: "1rem" }} />
              )}
              <div>{player.lastname !== "csc" ? toUpOne(getName(player)) : player.lastname.toUpperCase()}</div>
            </TableCell>
            <TableCell>{filterStatsBySeason(player.goals as Goal[])}</TableCell>
            <TableCell>{player.lastname !== "csc" ? filterStatsBySeason(player.passes as Goal[]) : ""}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
