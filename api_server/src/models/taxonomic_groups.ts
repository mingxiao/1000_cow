import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class TaxonomicGroups {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    groupName: string

    @Column('text')
    inPresentStudy: string

    @Column('text')
    inTop30: string
}