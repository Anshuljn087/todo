import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getTodos(@Param('userId') userId: string) {
    return this.todoService.findByUserId(userId);
  }
}
