import { v4 as uuidv4 } from 'uuid';
import { TaskService } from './task.service';
import { CreateTaskDto, TaskDescription } from './dto/create-tast.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // GET task endpoint
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: [CreateTaskDto],
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  async findAll() {
    return this.taskService.findAll();
  }

  // GET:id task endpoint
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Task has been successfully created.',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'The request ID was malformed, It must be a valid format of UUID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task is not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.findOne(id);
  }

  // POST task endpoint
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Task has been successfully created.',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'The request was malformed, e.g. missing or invalid parameter or property in the request body.',
  })
  @ApiResponse({
    status: 404,
    description: 'categoryId is not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for Task object',
  })
  async create(@Body(ValidationPipe) task: CreateTaskDto) {
    return await this.taskService.create({
      id: uuidv4(),
      ...task,
      status: TaskDescription.OPEN,
    });
  }

  // DELETE task endpoint
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Task is successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description:
      'The request ID was malformed, It must be a valid format of UUID.',
  })
  @ApiResponse({
    status: 404,
    description: 'taskId is not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error occurred.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.delete(id);
  }
}
