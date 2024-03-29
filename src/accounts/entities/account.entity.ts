import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
    tableName: "accounts"
})
export class Account extends Model {

    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({allowNull: false, type: DataType.STRING})
    name: string;

    @Column({allowNull: false, type: DataType.STRING})
    email: string;

    @Column({allowNull: false, type: DataType.BOOLEAN})
    isAdmin: boolean;

    @Unique
    @Column({allowNull: false, type: DataType.STRING})
    cpf: string;

    @Unique
    @Column({allowNull: false, type: DataType.STRING})
    pis: string

    @Column({allowNull: false, type: DataType.STRING})
    password: string

}
