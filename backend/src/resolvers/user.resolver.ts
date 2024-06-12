import * as argon2 from "argon2";
import Cookies from "cookies";
import { SignJWT } from "jose";
import { Authorized, Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "..";
import User, {
  InputLogin,
  InputRegister,
  UserProfile,
} from "../entities/user.entity";
import UserService from "../services/user.service";
import { ContextType } from "../types";
import { Message } from "../entities/message.entity";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await new UserService().listUsers();
  }
  @Query(() => Message)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (!user) {
      throw new Error("Compte inconnu.");
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email, role: user.role })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(`${process.env.JWT_PRIVATE_KEY}`));

      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = "Bienvenue!";
      m.success = true;
    } else {
      m.message = "Vérifiez vos informations !";
      m.success = false;
    }
    return m;
  }

  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const cookies = await new Cookies(ctx.req, ctx.res);
      cookies.set("token");
    }
    const m = new Message();
    m.message = "Vous avez été déconnecté.";
    m.success = true;

    return m;
  }

  @Mutation(() => User)
  async register(@Arg("infos") infos: InputRegister) {
    const user = await new UserService().findUserByEmail(infos.email);
    if (user) {
      throw new Error("Cet email est déjà pris!");
    }
    const newUser = await new UserService().createUser(infos);
    return newUser;
  }

  @Authorized(["USER", "ADMIN"])
  @Query(() => UserProfile)
  async getUserProfile(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const connectedUser = await new UserService().findUserByEmail(
        ctx.user.email
      );
      return connectedUser;
    }
    throw new Error("Utilisateur inconnu");
  }
}
