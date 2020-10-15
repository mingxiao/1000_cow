import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class TaxonomicGroups {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    group_name: string
}