/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString({ message: 'Name must be a string!' })
  @IsNotEmpty({ message: 'Name must not be empty!' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Value must be a string!' })
  @IsNotEmpty({ message: 'Relationship is neccessary!' })
  relationship: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Phone must be of number type!' })
  @IsNotEmpty({ message: 'Phone # must not be empty' })
  phoneNumber: number;
  
  @ApiProperty()
  @IsNumber({}, { message: 'Age must be a number!' })
  @IsNotEmpty({ message: 'Age must not be empty' })
  age: number;
}
