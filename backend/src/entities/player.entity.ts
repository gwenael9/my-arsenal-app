import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import Goal from "./goal.entity";

@Entity()
@ObjectType()
export default class Player  {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column({ length: 50 })
    @Field()
    name: string;

    @Column()
    @Field()
    country: string;

    @Column()
    @Field()
    age: number;

    @Column({ type: "float" })
    @Field()
    number: number;

    @OneToMany(() => Goal, (goal) => goal.player)
    @Field(() => [Goal], { nullable: true})
    goals: Goal[];
}

@InputType()
export class InputCreatePlayer {
    @Field()
    name: string;

    @Field()
    country: string;

    @Field()
    age: number;

    @Field()
    number: number;

}