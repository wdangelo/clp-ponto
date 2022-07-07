import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointRegisterService } from './point-register.service';
import { CreatePointRegisterDto } from './dto/create-point-register.dto';
import { UpdatePointRegisterDto } from './dto/update-point-register.dto';

@Controller('point-register')
export class PointRegisterController {
  constructor(private readonly pointRegisterService: PointRegisterService) {}

  @Post()
  create(@Body() createPointRegisterDto: CreatePointRegisterDto) {
    return this.pointRegisterService.create(createPointRegisterDto);
  }

  @Get()
  findAll() {
    return this.pointRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointRegisterDto: UpdatePointRegisterDto) {
    return this.pointRegisterService.update(+id, updatePointRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointRegisterService.remove(+id);
  }
}
