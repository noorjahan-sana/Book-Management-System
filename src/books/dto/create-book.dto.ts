import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The title of your feature',
    })
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        type: String,
        required: true,
        description: 'The title of your feature',
    })
    @IsNotEmpty()
   
    autohor: string


    @ApiProperty({
        type: String,
        required: true,
        description: 'The title of your feature',
    })
    @IsNotEmpty()
    @IsNumber()
    price: number
}
