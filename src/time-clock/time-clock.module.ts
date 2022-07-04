import { Module } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { TimeClockController } from './time-clock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeClock } from './entities/time-clock.entity';

@Module({
  imports: [SequelizeModule.forFeature([TimeClock])],
  controllers: [TimeClockController],
  providers: [TimeClockService]
})
export class TimeClockModule {}
