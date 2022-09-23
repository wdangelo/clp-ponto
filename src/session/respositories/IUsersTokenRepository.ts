import { CreateSessionDto } from "../dto/create-session.dto";


interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id}: CreateSessionDto): Promise<CreateSessionDto>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<CreateSessionDto>;
    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository }