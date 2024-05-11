import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Max, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'The EMAIL of your account',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @ApiProperty({
    //     required: false,
    //     default: false,
    //     description: ' mark true when user email is verified'
    // })
    // isVerified: boolean;

    // @ApiProperty({required: false})
    @ApiPropertyOptional({
        description: ' give me some name'
    })
    fullName?: string;

    @ApiProperty({
        description: ' give me some password'
    })
    @MinLength(6)
    @Max(10)
    password: string;


}
