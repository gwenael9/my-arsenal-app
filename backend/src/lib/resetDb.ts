import GoalService from "../services/goal.service";
import PlayerService from "../services/player.service";
import db from "./datasource";

export async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
    )
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const playerService = new PlayerService();
  const goalService = new GoalService();

  await playerService.createPlayer({
    name: "Bukayo Saka",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    name: "Gabriel Jesus",
    country: "Brésil",
  });

  await playerService.createPlayer({
    name: "Leandro Trossard",
    country: "Belgique",
  });

  await playerService.createPlayer({
    name: "Eddie Nketiah",
    country: "Angleterre",
  });

  // await goalService.createGoal({
  //   date: "30/09/2023",
  //   link: "https://www.youtube.com/embed/ca5imK6X4tY?si=rnnxKFBFzP8v-XDF&amp;clip=Ugkxegi_3u2QgN7jliZt132tZLjfY6b5rsiY&amp;clipt=ELbsAhiasQM",
  //   where: "Vitality Stadium",
  //   ordre: 19,
  //   playerId: "a",
  // });
}

main();
