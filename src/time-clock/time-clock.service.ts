import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTimeClockDto } from './dto/create-time-clock.dto';
import { UpdateTimeClockDto } from './dto/update-time-clock.dto';
import { TimeClock } from './entities/time-clock.entity';

@Injectable()
export class TimeClockService {

  constructor(
    @InjectModel(TimeClock)
    private timeClokModel: typeof TimeClock
  ) {}

  async create(createTimeClockDto: CreateTimeClockDto) {
    await this.timeClokModel.create({
      pa: createTimeClockDto.pa,
      name: createTimeClockDto.name,
      ip: createTimeClockDto.ip
    }).catch((err) => {
      if(err) {
        throw new HttpException('PA already exists', HttpStatus.FORBIDDEN)
      }
    });
  }

  findAll() {
    return this.timeClokModel.findAll();
  }

  findOne(id: string) {
    return this.timeClokModel.findByPk(id)
  }

  async update(id: string, updateTimeClockDto: UpdateTimeClockDto) {
    const timeClock = await this.timeClokModel.findByPk(id)
    timeClock.update({
      pa: updateTimeClockDto.pa,
      name: updateTimeClockDto.name,
      ip: updateTimeClockDto.ip,
    })
    return timeClock
  }

  async remove(id: string) {
    const timeClock = await this.timeClokModel.findByPk(id)
    timeClock.destroy();
  }
}
