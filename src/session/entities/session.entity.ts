import { Account } from "src/accounts/entities/account.entity";
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table, IsDate } from "sequelize-typescript";

@Table({
    tableName: "account_tokens"
})

export class Session extends Model {

    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    id: string;

    @Column({allowNull: false, type: DataType.STRING})
    refresh_token: string;

    @Column({allowNull: false, type: DataType.STRING})
    user_id: string;

    @ForeignKey(() => Account)
    user: Account

    
    @IsDate
    @Column
    expires_date: Date;
}
