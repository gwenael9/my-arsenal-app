import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import Player from "./player.entity";

@Entity()
@ObjectType()
export default class Goal  {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column()
    @Field()
    date: string;

    @Column()
    @Field()
    link: string;

    @ManyToOne(() => Player, (player) => player.goals, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @Field(() => Player, { nullable: true })
    player: Player;
    
    @Column({ nullable: true })
    playerId: string;
}

@InputType()
export class InputCreateGoal {
    @Field()
    date: string;

    @Field()
    link: string;

    @Field()
    playerId: string;
}