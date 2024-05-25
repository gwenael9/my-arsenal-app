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
    firstname: "bukayo",
    lastname: "saka",
    country: "angleterre",
  });

  await playerService.createPlayer({
    firstname: "gabriel",
    lastname: "jesus",
    country: "brésil",
  });

  await playerService.createPlayer({
    firstname: "leandro",
    lastname: "trossard",
    country: "belgique",
  });

  await playerService.createPlayer({
    firstname: "eddie",
    lastname: "nketiah",
    country: "angleterre",
  });

  await playerService.createPlayer({
    firstname: "martin",
    lastname: "odegaard",
    country: "norvège",
  });

  await playerService.createPlayer({
    firstname: "kai",
    lastname: "havertz",
    country: "allemagne",
  });

  await playerService.createPlayer({
    firstname: "gabriel",
    lastname: "martinelli",
    country: "brésil",
  });

  await playerService.createPlayer({
    firstname: "reiss",
    lastname: "nelson",
    country: "angleterre",
  });

  await playerService.createPlayer({
    firstname: "fabio",
    lastname: "viera",
    country: "portugal",
  });

  await playerService.createPlayer({
    firstname: "emile",
    lastname: "smith-rowe",
    country: "angleterre",
  });

  await playerService.createPlayer({
    firstname: "thomas",
    lastname: "partey",
    country: "ghana",
  });

  await playerService.createPlayer({
    firstname: "declan",
    lastname: "rice",
    country: "Angleterre",
  });

  await playerService.createPlayer({
    firstname: "",
    lastname: "jorginho",
    country: "italie",
  });

  await playerService.createPlayer({
    firstname: "gabriel",
    lastname: "magalhães",
    country: "brésil",
  });

  await playerService.createPlayer({
    firstname: "william",
    lastname: "saliba",
    country: "france",
  });

  await playerService.createPlayer({
    firstname: "jakub",
    lastname: "kiwior",
    country: "pologne",
  });

  await playerService.createPlayer({
    firstname: "takehiro",
    lastname: "tomiyasu",
    country: "japon",
  });

  await playerService.createPlayer({
    firstname: "ben",
    lastname: "white",
    country: "angleterre",
  });

  await playerService.createPlayer({
    firstname: "oleksandr",
    lastname: "zinchenko",
    country: "ukraine",
  });

  await playerService.createPlayer({
    firstname: "mohamed",
    lastname: "elneny",
    country: "egypte",
  });

  const odegaard = await playerService.getPlayerByName("odegaard");
  const saka = await playerService.getPlayerByName("saka");
  const jesus = await playerService.getPlayerByName("jesus");
  const rice = await playerService.getPlayerByName("rice");
  const martinelli = await playerService.getPlayerByName("martinelli");
  const trossard = await playerService.getPlayerByName("trossard");
  const havertz = await playerService.getPlayerByName("havertz");
  const viera = await playerService.getPlayerByName("viera");
  const white = await playerService.getPlayerByName("white");

  if (
    odegaard?.id &&
    saka?.id &&
    jesus?.id &&
    rice?.id &&
    martinelli?.id &&
    trossard?.id &&
    havertz?.id &&
    viera?.id &&
    white?.id
  ) {
    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/ca5imK6X4tY?si=rnnxKFBFzP8v-XDF&amp;clip=Ugkxegi_3u2QgN7jliZt132tZLjfY6b5rsiY&amp;clipt=ELbsAhiasQM",
      where: "Vitality Stadium",
      ordre: 19,
      against: "Bournemouth",
      buteurId: odegaard.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/J-ZItV1PSRQ?si=jbJZj54XYbc9icKb;clipt=EIQYGNOsAQ",
      where: "Vitality Stadium",
      ordre: 18,
      against: "Bournemouth",
      buteurId: saka.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "03/09/2023",
      link: "https://www.youtube.com/embed/rqgAHAnx00k?si=ErtlOik615VK2al7",
      where: "Emirates Stadium",
      ordre: 9,
      against: "Manchester United",
      buteurId: jesus.id,
      passeurId: viera.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "03/09/2023",
      link: "https://www.youtube.com/embed/IGzrjz20Yqo?si=Na9GNvyMeyE2cMLt",
      where: "Emirates Stadium",
      ordre: 8,
      against: "Manchester United",
      buteurId: rice.id,
      passeurId: saka.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "05/12/2023",
      link: "https://www.youtube.com/embed/pIAWbGeURho?si=06yEdDYXPIU43e3y",
      where: "Kenilworth Road",
      ordre: 51,
      against: "Luton",
      buteurId: rice.id,
      passeurId: odegaard.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "04/05/2024",
      link: "https://www.youtube.com/embed/urvQq03Q900?si=9sIq5BWwzhSHdxCf",
      where: "Emirates Stadium",
      ordre: 110,
      against: "Bournemouth",
      buteurId: rice.id,
      passeurId: jesus.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "04/05/2024",
      link: "https://www.youtube.com/embed/T8qvLtM88rA?si=-bb-64phDeM2zveS",
      where: "Emirates Stadium",
      ordre: 109,
      against: "Bournemouth",
      buteurId: trossard.id,
      passeurId: rice.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "04/05/2024",
      link: "https://www.youtube.com/embed/t2o306PuOQs?si=W7WKY2e3pWuVGkZc",
      where: "Emirates Stadium",
      ordre: 108,
      against: "Bournemouth",
      buteurId: saka.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "21/10/2023",
      link: "https://www.youtube.com/embed/GF1ZIsx6An8?si=azNgHPSE3QB7hXhl",
      where: "Stamford Bridge",
      ordre: 25,
      against: "Chelsea",
      buteurId: trossard.id,
      passeurId: saka.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "08/10/2023",
      link: "https://www.youtube.com/embed/DIVuMUeqDZ4?si=mp_vXPcmNXypH371",
      where: "Emirates Stadium",
      ordre: 23,
      against: "Manchester City",
      buteurId: martinelli.id,
      passeurId: havertz.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "25/11/2023",
      link: "https://www.youtube.com/embed/l49sD0WOJhE?si=CTsHuIAfo9OAo2S2",
      where: "Community Stadium",
      ordre: 39,
      against: "Brentford",
      buteurId: havertz.id,
      passeurId: saka.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/Hli5jnOBgDE?si=AUEP8agfdazyVoyN",
      where: "Vitality Stadium",
      ordre: 20,
      against: "Bournemouth",
      buteurId: havertz.id,
      competition: "Premier League",
    });

    await goalService.createGoal({
      date: "30/09/2023",
      link: "https://www.youtube.com/embed/3nTIOvuH1dA?si=75edUgCE0OEimODn",
      where: "Vitality Stadium",
      ordre: 21,
      against: "Bournemouth",
      buteurId: white.id,
      passeurId: odegaard.id,
      competition: "Premier League",
    });
  }
}


main();
