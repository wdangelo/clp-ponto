import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  create(createAccountDto: CreateAccountDto) {
    return this.create({
      
      name: createAccountDto.name,
      email: createAccountDto.email,
      cpf: createAccountDto.cpf,
      pis: createAccountDto.pis,
      password: createAccountDto.password,
      
    });
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
