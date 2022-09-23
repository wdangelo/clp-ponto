import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/accounts/entities/account.entity';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [SessionController],
  providers: [SessionService],
  
})
export class SessionModule {}
