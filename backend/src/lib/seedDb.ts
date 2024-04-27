import db from "./datasource";
import * as dotenv from "dotenv";
import UserService from "../services/user.service";

dotenv.config();

async function seedDb() {
    const userService = new UserService();

    // vérifie si un utilisateur avec l'e-mail spécifié existe déjà
    const user = await userService.findUserByEmail(process.env.email || "");

  if (!user) {
    const newUser = await userService.createUser({
      email: process.env.email || "",
      password: process.env.password || "",
    });

    if (newUser.email == "" || newUser.password == "") {
        console.info("probleme env");
    } else {
        await newUser.save();
        // on upgrade l'user en ADMIN
        const upUser = await userService.upgradeRoleToAdmin(newUser);
        await upUser.save();
        console.info(upUser.role, "User createeeeeee");
    }

  } else {
    console.info("user déjà présent.");
  }
}

async function main() {
  await db.initialize();
  await seedDb();
}

main();
