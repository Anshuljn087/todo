import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  todoId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsDate()
  timeline?: Date;
}
