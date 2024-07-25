import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Saison extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ default: 0 })
  @Field()
  match: number;
}

@InputType()
export class InputCreateSaison {
  @Field()
  name: string;

  @Field()
  match: number;
}

@ObjectType()
export class UpdateSaisonMatch {
  @Field()
  match: number;
}
