import { Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

@NestSchema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  lastLogin: Date;

  @Prop()
  isActive: boolean;
}

export type UserDocument = User & Document; // UserDocument is now a combination of User and Mongoose Document

// Create the schema for User class
export const UserSchema = SchemaFactory.createForClass(User);
