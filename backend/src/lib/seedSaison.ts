import db from "./datasource";
import * as dotenv from "dotenv";
import UserService from "../services/user.service";
import SaisonService from "../services/saison.service";

dotenv.config();

async function seedSaison() {
  const saisonService = new SaisonService();

  // vérifie si un utilisateur avec l'e-mail spécifié existe déjà
  const saison1 = await saisonService.findSaisonByName("2023/2024");
  const saison2 = await saisonService.findSaisonByName("2024/2025");

  if (!saison1) {
    const newSaison = await saisonService.createSaison({
      name: "2023/2024",
      match: 52,
    });

    await newSaison.save();
  }

  if (!saison2) {
    const newSaison = await saisonService.createSaison({
      name: "2024/2025",
      match: 0,
    });

    await newSaison.save();
  }
}

async function main() {
  await db.initialize();
  await seedSaison();
}

main();
