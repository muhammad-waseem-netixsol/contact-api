/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  // name
  @Prop({ required: true })
  name: string;

  //   relationship
  @Prop({ required: true })
  relationship: string;

  //   phoneNumber
  @Prop({ required: true })
  phoneNumber: number;

  //   age
  @Prop({ required: true })
  age: number;
}
export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass(Contact);
