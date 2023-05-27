import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Flatten extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  json: string;
}
