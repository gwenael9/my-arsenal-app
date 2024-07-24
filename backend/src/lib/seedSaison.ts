import db from "./datasource";
import * as dotenv from "dotenv";
import SaisonService from "../services/saison.service";

dotenv.config();

const saisonNames = ["2023/2024", "2024/2025"];

async function seedSaison() {
  const saisonService = new SaisonService();

  for (const name of saisonNames) {
    const saison = await saisonService.findSaisonByName(name);
    
    if (!saison) {
      await saisonService.createSaison({ name });
    }
  }
}

async function main() {
  await db.initialize();
  await seedSaison();
}

main();
