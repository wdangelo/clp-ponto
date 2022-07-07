import { PartialType } from '@nestjs/mapped-types';
import { CreatePointRegisterDto } from './create-point-register.dto';

export class UpdatePointRegisterDto extends PartialType(CreatePointRegisterDto) {}
