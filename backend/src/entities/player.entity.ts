import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import Goal from "./goal.entity";

@Entity()
@ObjectType()
export default class Player  {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column({ nullable: true})
    @Field()
    firstname?: string;

    @Column({ length: 50 })
    @Field()
    lastname: string;

    @Column()
    @Field()
    country: string;

    @OneToMany(() => Goal, (goal) => goal.buteur)
    @Field(() => [Goal], { nullable: true})
    goals: Goal[];

    @OneToMany(() => Goal, (goal) => goal.passeur)
    @Field(() => [Goal], { nullable: true})
    passes: Goal[];
}

@InputType()
export class InputCreatePlayer {
    @Field()
    firstname?: string;

    @Field()
    lastname: string;

    @Field()
    country: string;

}