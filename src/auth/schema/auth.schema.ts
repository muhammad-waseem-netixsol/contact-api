/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
 // name
 @Prop({ required: true })
 name: string;

 //   email
 @Prop({ required: true })
 email: string;

 //   password
 @Prop({ required: true })
 password: string;
}

export const authSchema = SchemaFactory.createForClass(Auth);