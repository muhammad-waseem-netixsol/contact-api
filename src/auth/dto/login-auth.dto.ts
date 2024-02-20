/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty()
  @IsNotEmpty({message: "email must not be empty"})
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;
  @ApiProperty()
  @IsNotEmpty({message: "Password must not be empty"})
  @IsString({message: "password must be string"})
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
