import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
    tableName: "time-clock"
})
export class TimeClock extends Model {
    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({allowNull: false, type: DataType.STRING})
    pa: string;

    @Column({allowNull: false, type: DataType.STRING})
    name: string;

    @Unique
    @Column({allowNull: false, type: DataType.STRING})
    ip: string
}
