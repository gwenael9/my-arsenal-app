import db from "./datasource";

async function clearDB() {
    const runner = db.createQueryRunner();

    // supprime toutes les tables
    await Promise.all(
      db.entityMetadatas.map(async (entity) =>
        runner.query(`DROP TABLE IF EXISTS ${entity.tableName} CASCADE`)
      )
    );

    await db.synchronize();
}

async function main() {
    await db.initialize();
    await clearDB();
}

main();

// https://www.youtube.com/embed/ogYmeObVaD0?si=-KFKRSzYAuhztT8V&amp;clip=Ugkx055AQ9tP6pXNkHKDaLhu_KDx3j5dpk9A&amp;clipt=EOmfHRir8R0