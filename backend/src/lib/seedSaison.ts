import db from "./datasource";
import * as dotenv from "dotenv";
import SaisonService from "../services/saison.service";

dotenv.config();

async function seedSaison() {
  const saisonService = new SaisonService();

  const saisons = [
    { name: "2023/2024", match: 52 },
    { name: "2024/2025", match: 1 },
    { name: "all", match: 52 },
  ];

  for (const saison of saisons) {
    const existingSaison = await saisonService.findSaisonByName(saison.name);
    if (!existingSaison) {
      const newSaison = await saisonService.createSaison(saison);
      await newSaison.save();
    }
  }
}

async function main() {
  await db.initialize();
  await seedSaison();
}

main();
