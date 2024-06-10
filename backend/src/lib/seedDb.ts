import db from "./datasource";
import * as dotenv from "dotenv";
import UserService from "../services/user.service";

dotenv.config();

async function seedDb() {
  const userService = new UserService();

  // vérifie si un utilisateur avec l'e-mail spécifié existe déjà
  const user = await userService.findUserByEmail("test@mail.com");

  console.info("user :", user);

  if (!user) {
    const newUser = await userService.createUser({
      email: process.env.email || "test@mail.com",
      password: process.env.password,
      role: "ADMIN",
    });

    if (newUser.email == "" || newUser.password == "") {
      console.info("problemeeeeeee");
    } else {
      await newUser.save();
      console.info(newUser, "User createeeeeee");
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
