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

  @Column({ default: "Emirates Stadium", nullable: true })
  @Field()
  where: string;

  @Column()
  @Field()
  ordre: number;

  @Column({
    enum: [
      "Premier League",
      "FA Cup",
      "EFL Cup",
      "Champions League",
      "Community Shield",
    ],
  })
  @Field()
  competition: string;

  @ManyToOne(() => Player, (player) => player.goals, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field(() => Player)
  buteur: Player;

  @ManyToOne(() => Player, (player) => player.passes)
  @Field(() => Player, { nullable: true })
  passeur: Player;

  @Column({ nullable: true })
  buteurId: string;

  @Column({ nullable: true })
  passeurId?: string;

  @Column({ default: "2023/2024", nullable: true })
  @Field()
  saison?: string;
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

  @Field()
  saison?: string;
}
