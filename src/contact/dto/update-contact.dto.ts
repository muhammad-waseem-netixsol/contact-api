/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateContactDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string!' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Value must be a string!' })
    relationship: string;

    @IsOptional()
    @IsNumber({}, { message: 'Phone must be of number type!' })
    @Length(11, 11, { message: 'Phone number must be exactly 11 characters!' })
    phoneNumber: number;

    @IsOptional()
    @IsNumber({}, { message: 'Age must be a number!' })
    @Min(18, {message: "Age must be >= 18"})
    @Max(50, {message: "Age must be <= 50"})
    age: number;  
}
