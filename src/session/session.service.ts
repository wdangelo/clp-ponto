import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sign } from "jsonwebtoken";
import { Account } from 'src/accounts/entities/account.entity';
import { UpdateSessionDto } from './dto/update-session.dto';
import { compare } from 'bcrypt';
import auth from 'src/config/auth';
import  * as dayjs from 'dayjs';
import { Session } from './entities/session.entity';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}


@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private sessionModel: typeof Session,
  ){}

  @InjectModel(Account)
  private accountsModel: typeof Account
  

  async create(email: string, password: string) {
    const user = await this.accountsModel.findOne({ where: { email: email}})
    
    const {  expires_in_token, secret_token, sercret_refresh_token, expires_in_refresh_token, expires_refresh_token_days} = auth
    
    if(!user) {
      throw new Error("Username or password is invalid!")
    }

    const passwordMath = await compare(password, user.password)

    if(!passwordMath) {
      throw new Error("Username or password is invalid")
    }

    const token = sign({  }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
  });

    const refresh_token = sign({email}, sercret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    const refresh_token_expires_date = dayjs().add(expires_refresh_token_days, "days").toDate();

    await this.sessionModel.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })


    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token,
    }
    
    return tokenReturn
    
  }

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
