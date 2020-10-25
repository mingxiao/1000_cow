import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class TaxonomicGroups {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    groupName: string

    @Column('boolean')
    inPresentStudy: boolean

    @Column('boolean')
    inTop30: boolean

    toJSONAPI = () => {
        return {
            type: 'taxonomic_groups',
            id: this.id,
            attributes: {
                groupName: this.groupName,
                inPresentStudy: this.inPresentStudy,
                inTop30: this.inTop30
            }
        }
    }
}