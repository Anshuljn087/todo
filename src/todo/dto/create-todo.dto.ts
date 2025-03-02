import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsDate()
  timeline?: Date;
}
