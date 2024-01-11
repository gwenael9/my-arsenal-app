import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";

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

}

@InputType()
export class InputCreatePlayer implements Omit<Player, "id"> {
    @Field()
    name: string;

    @Field()
    country: string;

    @Field()
    age: number;

    @Field()
    number: number;
}