import React, { useState } from "react";
import { Player, usePlayersQuery } from "@/types/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flagCountry, toUpOne } from "@/lib/functions";
import { MoveDown, MoveUp } from "lucide-react";

type SortKey = "goals" | "passes";
type SortDirection = "ascending" | "descending";

export default function Ranking() {
  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "goals",
    direction: "descending",
  });

  const sortedPlayers = players.slice().sort((a, b) => {
    if (a.lastname === "csc") return 1;
    if (b.lastname === "csc") return -1;
    const aValue = a[sortConfig.key]?.length || 0;
    const bValue = b[sortConfig.key]?.length || 0;
    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // on affiche pas les joueurs avec 0 b/p
  const playersFiltered = sortedPlayers.filter((player) => {
    const nbGoals = player.goals?.length || 0;
    const nbPasses = player.passes?.length || 0;
    return nbGoals > 0 || nbPasses > 0;
  });

  const getName = (item: Player | any) => {
    return `${item.firstname} ${item.lastname}`;
  };

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "descending";
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const tableHeaderStats: SortKey[] = ["goals", "passes"];

  const getBgPosition = (item: number) => {
    if (item == 1) {
      return "bg-or";
    } else if (item == 2) {
      return "bg-argent";
    } else if (item == 3) {
      return "bg-bronze";
    }

    return "bg-primary";
  };

  return (
    <Table className="max-w-[1200px]">
      <TableHeader className="border-b">
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Joueurs</TableHead>
          {tableHeaderStats.map((stat, index) => (
            <TableHead key={index}>
              <div
                onClick={() => requestSort(stat)}
                className="flex justify-center items-center cursor-pointer"
              >
                {toUpOne(stat == "goals" ? "buts" : "passes")}{" "}
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
        {playersFiltered.map((player, index) => (
          <TableRow key={index}>
            <TableCell className="font-bold w-10">
              <div className="flex justify-center">
                <p
                  className={
                    index < 3 || player.lastname === "csc"
                      ? `border px-1 rounded-sm ${getBgPosition(index + 1)}`
                      : ""
                  }
                >
                  {index + 1}.
                </p>
              </div>
            </TableCell>
            <TableCell className="font-bold flex items-center gap-2 justify-center">
              {flagCountry(player.country) && (
                <img
                  src={`https://flagcdn.com/${flagCountry(player.country)}.svg`}
                  alt={player.country}
                  className="w-4"
                />
              )}
              <div>{toUpOne(getName(player))}</div>
            </TableCell>
            <TableCell>{player.goals?.length}</TableCell>
            <TableCell>
              {player.lastname !== "csc" && player.passes?.length}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
