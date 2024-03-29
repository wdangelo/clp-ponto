import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from "jsonwebtoken";
import { hash } from "bcrypt";
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import auth from 'src/config/auth';

interface IPayload {
  sub: string;
}

@Injectable()
export class AccountsService {

  constructor(
    @InjectModel(Account)
    private accountsModel: typeof Account
  ){}

  async create(createAccountDto: CreateAccountDto) {
    const passwordHash = await hash(createAccountDto.password, 8)


    await this.accountsModel.create({
        name: createAccountDto.name,
        email: createAccountDto.email,
        isAdmin: createAccountDto.isAdmin,
        cpf: createAccountDto.cpf,
        pis: createAccountDto.pis,
        password: passwordHash,
      })

  
  }

  async findAll() {
    return await this.accountsModel.findAll();
  }

  async findOne(id: string) {
    return await this.accountsModel.findByPk(id)
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account =  await this.accountsModel.findByPk(id)

    account.update({
      name: updateAccountDto.name,
      email: updateAccountDto.email,
      isAdmin: updateAccountDto.isAdmin,
      cpf: updateAccountDto.cpf,
      pis: updateAccountDto.pis,
      password: updateAccountDto.password
    })
     
  }

  async remove(id: string) {
    const acc =  await this.accountsModel.findByPk(id)
    acc.destroy();
    return   
  }
}
