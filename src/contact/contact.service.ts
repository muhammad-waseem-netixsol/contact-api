/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './schema/contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel:Model<ContactDocument>){
    
  }
  create(createContactDto: CreateContactDto) {
    try{
      const model = new this.contactModel();
      model.name = createContactDto.name;
      model.relationship = createContactDto.relationship;
      model.phoneNumber = createContactDto.phoneNumber;
      model.age = createContactDto.age;
      return model.save();
    }catch(err){
      console.log(err);
    } 
  }

  async findAll() {
    try{
      const contacts = await this.contactModel.find();
      return contacts;
    }catch(err){ 
      console.log(err);
    }
  }

  async findOne(id: string) {
    try{
      const objId = new Types.ObjectId(id);
      const contact = await this.contactModel.findById({_id:objId});
      if(!contact){
        throw new Error("You have passed invalid id!");
      }
      return contact;
    }catch(err){
      console.log(err);
    }
    
  }

  async update(id: string, updateDto: UpdateContactDto) {
    if (!Object.values(updateDto).some(value => value !== undefined)) {
      throw new BadRequestException('Empty body sent! Please add fields to update.');
    }
    const updatedContact = await this.contactModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updatedContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return updatedContact;
  }

  async remove(id: string) {
    try{
      const obj = new Types.ObjectId(id);
      const ctct = await this.contactModel.deleteOne({_id: obj}).exec();
      if(ctct.deletedCount === 0){
        throw new NotFoundException("Contact not found!");
      }else{
        return {message: "Contact not found!"};
      }
    }catch(err){
      return {message: "Server is not availble for now.. Please try again later"}
    }

  }
}
