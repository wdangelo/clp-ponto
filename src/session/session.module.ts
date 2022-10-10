import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/accounts/entities/account.entity';
import { Session } from './entities/session.entity';


@Module({
  imports: [SequelizeModule.forFeature([Session]), SequelizeModule.forFeature([Account])],
  controllers: [SessionController],
  providers: [SessionService],
  
})
export class SessionModule {}
