import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {

    id?: string

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    isAdmin?: boolean; 

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    pis: string

    @IsNotEmpty()
    password: string;

    constructor() {
        
        if (!this.isAdmin) {
            this.isAdmin = false
        }
    }
}
