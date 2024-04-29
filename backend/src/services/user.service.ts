import { Repository } from "typeorm";

import datasource from "../lib/datasource";
import User, { InputRegister } from "../entities/user.entity";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }

  async listUsers() {
    return this.db.find();
  }

  async findUserByEmail(email: string) {
    return await this.db.findOneBy({ email });
  }
  async findUserById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async createUser({ email, password, role }: InputRegister) {
    const user = this.db.create({ email, password, ...(role === "ADMIN" && { role }) });
    return await this.db.save(user);
  }
  
}
