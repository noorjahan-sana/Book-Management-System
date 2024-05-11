import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The title of your book',
    })
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        type: String,
        required: true,
        description: 'The title of your book',
    })
    @IsNotEmpty()
   
    author: string


    @ApiProperty({
        type: Number,
        required: true,
        description: 'The title of your book',
    })
    @IsNotEmpty()
    @IsNumber()
    price: number
}
