import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  todoId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  completed: boolean;

  @Prop({ required: false })
  timeline: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
