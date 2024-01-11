import { DataSource } from "typeorm";
import Player from "../entities/player.entity";

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "db",
    port: parseInt(process.env.DB_PORT || "0") || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "postgres",
    entities: [Player],
    synchronize: true,
    logging: true,
  });
