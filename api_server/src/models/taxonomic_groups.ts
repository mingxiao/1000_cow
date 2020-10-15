import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class TaxonomicGroups {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    groupName: string

    @Column()
    inPresentStudy: string

    @Column()
    inTop30: string
}