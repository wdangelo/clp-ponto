import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sign } from "jsonwebtoken";
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { Account } from 'src/accounts/entities/account.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { compare } from 'bcrypt';
import { response } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Account)
    private accountsModel: typeof Account
  ){}
  async create(email: string, password: string) {
    const user = await this.accountsModel.findOne({ where: { email: email}})
    

    
    if(!user) {
      throw new Error("Username or password is invalid!")
    }

    const passwordMath = await compare(password, user.password)

    if(!passwordMath) {
      throw new Error("Username or password is invalid")
    }

    const token = sign({  }, "ebd6eec5119efbef6d71ddece6ff1419", {
      subject: user.id,
      expiresIn: '15m'
  }) 
    return token
    
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
