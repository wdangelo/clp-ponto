import { Module } from '@nestjs/common';
import { PointRegisterService } from './point-register.service';
import { PointRegisterController } from './point-register.controller';
import { HttpModule } from '@nestjs/axios';
import { TimeClock } from 'src/time-clock/entities/time-clock.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([TimeClock])],
  controllers: [PointRegisterController],
  providers: [PointRegisterService]
})
export class PointRegisterModule {}
