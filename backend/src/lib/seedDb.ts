import db from "./datasource";
import * as dotenv from "dotenv";
import UserService from "../services/user.service";

dotenv.config();

async function seedDb() {
    const userService = new UserService();

    // vérifie si un utilisateur avec l'e-mail spécifié existe déjà
    const user = await userService.findUserByEmail(process.env.email || "");

    console.info("user :", user);

  if (!user) {
    const newUser = await userService.createUser({
      email: process.env.email || "",
      password: process.env.password || "",
      role: "ADMIN"
    });

    if (newUser.email == "" || newUser.password == "") {
        console.info("probleme env");
    } else {
        await newUser.save();
        console.info(newUser.role, "User createeeeeee");
    }

  } else {
    console.info("user déjà présent!");
  }
}

async function main() {
  await db.initialize();
  await seedDb();
}

main();
