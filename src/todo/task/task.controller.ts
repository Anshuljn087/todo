import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get(':todoId')
  getTasksByTodo(@Param('todoId') todoId: string) {
    return this.taskService.findByTodoId(todoId);
  }
}
