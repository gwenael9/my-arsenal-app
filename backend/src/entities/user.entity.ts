import * as argon2 from "argon2";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export type ROLE = "ADMIN" | "USER";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @BeforeInsert()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")) {
      this.password = await argon2.hash(this.password);
    }
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true,
    default: "USER",
  })
  role: ROLE;
}

@ObjectType()
export class UserProfile {
  @Field()
  email: string;
}

/**----------------------
 **      Input Types
 *------------------------**/
@InputType()
export class InputRegister {
  @Field()
  email: string;

  @Field()
  password?: string;

  @Field() 
  role?: string;
}

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}
