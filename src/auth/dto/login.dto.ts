import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {

    @ApiProperty({ 
        type:String,
        required: true,
        description: 'The EMAIL of your account',
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;


    @ApiProperty({
        description: ' give me some password'
    })
    @MinLength(6)
    @MaxLength(10)
    password:string;


}