import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Alpha extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  json: string;
}
