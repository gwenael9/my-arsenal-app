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
  
  await playerService.createPlayer({
    name: "Martin Odegaard",
    country: "Norvège",
  });

  await playerService.createPlayer({
    name: "Kai Havertz",
    country: "Allemagne",
  });

  await playerService.createPlayer({
    name: "Gabriel Martinelli",
    country: "Brésil",
  });

  await playerService.createPlayer({
    name: "Reiss Nelson",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    name: "Fabio Viera",
    country: "Portugal",
  });

  await playerService.createPlayer({
    name: "Emile Smith Rowe",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    name: "Thomas Partey",
    country: "Ghana",
  });

  await playerService.createPlayer({
    name: "Declan Rice",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    name: "Jorginho",
    country: "Italie",
  });

  await playerService.createPlayer({
    name: "Gabriel",
    country: "Brésil",
  });

  await playerService.createPlayer({
    name: "William Saliba",
    country: "France",
  });

  await playerService.createPlayer({
    name: "Jakub Kiwior",
    country: "Pologne",
  });

  await playerService.createPlayer({
    name: "Takehiro Tomiyasu",
    country: "Japon",
  });

  await playerService.createPlayer({
    name: "Ben White",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    name: "Oleksandr Zinchenko",
    country: "Ukraine",
  });

  await playerService.createPlayer({
    name: "Mohamed Elneny",
    country: "Egypte",
  });

  const odegaard = await playerService.getPlayerByName("Martin Odegaard");
  const saka = await playerService.getPlayerByName("Bukayo Saka");

  if (odegaard?.id) {

    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/ca5imK6X4tY?si=rnnxKFBFzP8v-XDF&amp;clip=Ugkxegi_3u2QgN7jliZt132tZLjfY6b5rsiY&amp;clipt=ELbsAhiasQM",
      where: "Vitality Stadium",
      ordre: 19,
      against: "Bournemouth",
      playerId: odegaard?.id,
    });
  }

  if (saka?.id) {

    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/ca5imK6X4tY?si=rX-4K-1IdmgNvx_P&amp;controls=0&amp;clip=UgkxtVoEX--R_M25Gx7efT3SDCI63SCpRMTe&amp;clipt=EIQYGNOsAQ",
      where: "Vitality Stadium",
      ordre: 18,
      against: "Bournemouth",
      playerId: saka?.id,
    });
  }
}

main();
