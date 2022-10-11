import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Session } from 'src/session/entities/session.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Account]),
    SequelizeModule.forFeature([Session]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
