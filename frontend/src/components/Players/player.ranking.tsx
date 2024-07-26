import React, { useState } from "react";
import { usePlayersQuery } from "@/types/graphql";
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

  // on affiche pas les joueurs avec 0 b/p
  const filteredPlayers = players.filter((player) => {
    const filterGoals = (player.goals || []).filter(goal => saison === "all" || goal.saison === saison).length;
    const filterPasses = (player.passes || []).filter(pass => saison === "all" || pass.saison === saison).length;
    return filterGoals > 0 || filterPasses > 0;
  });
  
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (a.lastname === "csc") return 1;
    if (b.lastname === "csc") return -1;
    const aValue = (a[sortConfig.key] || []).length;
    const bValue = (b[sortConfig.key] || []).length;
    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
  });

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "descending" ? "ascending" : "descending",
    }));
  };

  const tableHeaderStats: SortKey[] = ["goals", "passes"];

  const getBgPosition = (item: number) =>
    ["bg-or", "bg-argent", "bg-bronze", "bg-primary"][item - 1] || "bg-primary";

  const headers = langue ? { goals: "buts", passes: "passes" } : { goals: "goals", passes: "assists" };

  return (
    <Table className="max-w-[1200px]">
      <TableHeader className="border-b">
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>{langue ? "Joueurs" : "Players"}</TableHead>
          {tableHeaderStats.map((stat, index) => (
            <TableHead key={index}>
              <div
                onClick={() => requestSort(stat)}
                className="flex justify-center items-center cursor-pointer"
              >
                {toUpOne(headers[stat])}
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
          <TableRow key={index}>
            <TableCell className="font-bold w-10">
              <div className="flex justify-center">
                <p
                  className={`px-1 rounded-sm ${
                    index < 3 || player.lastname === "csc"
                      ? getBgPosition(index + 1)
                      : ""
                  }`}
                >
                  {index + 1}.
                </p>
              </div>
            </TableCell>
            <TableCell className="font-bold flex items-center gap-2 justify-center">
              {flagCountry(player.country) && (
                <span
                  className={`fi fi-${flagCountry(player.country)}`}
                  style={{ width: "1rem", height: "1rem" }}
                />
              )}
              <div>
                {player.lastname !== "csc"
                  ? toUpOne(getName(player))
                  : player.lastname.toUpperCase()}
              </div>
            </TableCell>
            <TableCell>{player.goals?.length || 0}</TableCell>
            <TableCell>
              {player.lastname !== "csc" ? player.passes?.length || 0 : ""}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
