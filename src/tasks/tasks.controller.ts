import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task', description: 'Create a new task.' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieve a list of all tasks.',
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all tasks by user ID',
    description: 'Retrieve a list of all tasks of a specified user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks successfully retrieved.',
  })
  findAllByUserId(@Param('userId') userId: string) {
    return this.tasksService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      result: await this.tasksService.remove(id),
    };
  }
}
