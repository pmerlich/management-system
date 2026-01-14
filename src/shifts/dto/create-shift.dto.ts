import { IsString, IsEnum, IsNotEmpty, IsEmail, IsDate, IsDateString } from "class-validator";


export class CreateShiftDto {

    @IsNotEmpty()
    @IsDateString()
    startTime: string;

    @IsNotEmpty()
    @IsDateString()
    endTime: string
 
    @IsNotEmpty()
    @IsString()
    location: string

}