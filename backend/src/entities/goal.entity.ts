import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import Player from "./player.entity";

@Entity()
@ObjectType()
export default class Goal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  date: string;

  @Column()
  @Field()
  link: string;

  @Column()
  @Field()
  against: string;

  @Column({ default: "Emirates Stadium" })
  @Field()
  where: string;

  @Column()
  @Field()
  ordre: number;

  @Column()
  @Field()
  competition: string;

  @ManyToOne(() => Player, (player) => player.goals, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => Player, { nullable: true })
  buteur: Player;

  @ManyToOne(() => Player, (player) => player.passes)
  @Field(() => Player, { nullable: true })
  passeur: Player;

  @Column({ nullable: true })
  buteurId: string;

  @Column({ nullable: true })
  passeurId?: string;
}

@InputType()
export class InputCreateGoal {
  @Field()
  date: string;

  @Field()
  link: string;

  @Field()
  buteurId: string;

  @Field({ nullable: true })
  passeurId?: string;

  @Field()
  against: string;

  @Field()
  where: string;

  @Field()
  ordre: number;

  @Field()
  competition?: string;
}
