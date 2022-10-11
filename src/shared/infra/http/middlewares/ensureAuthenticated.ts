import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import auth from 'src/config/auth';


interface IPayload {
    sub: string;
  }

@Injectable()
export class EnsureAutjenticated implements NestMiddleware {

    async use(req: any, res: any, next: (error?: any) => void) {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            throw new Error("Token missing")
        }

        const [, token] = authHeader.split(" ")

        try {
            const { sub: user_id} = verify(
                token,
                auth.secret_token
            ) as IPayload;


            req.user = {
                id: user_id
            }

            next();
        } catch {
            throw new Error("Invalid token!")
        }
    }
    
}


