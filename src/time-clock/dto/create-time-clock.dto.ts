import { IsNotEmpty } from "class-validator";

export class CreateTimeClockDto {

    @IsNotEmpty()
    pa: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    ip: string;
}
