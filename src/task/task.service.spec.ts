import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-tast.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TaskRepository],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // GET ALL TASKS
  it('should GET all tasks', async () => {
    expect(await service.findAll()).toBeInstanceOf(Array<CreateTaskDto>);
  });

  // DELETE TASK ID
  it('should throw Error on DELETE task with invalid ID', async () => {
    await expect(service.delete('b099b19c')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // GET TASK ID
  it('should throw Error on GET task with invalid ID', async () => {
    await expect(service.findOne('b099b19c')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // CREATE TASK
  it('should throw an Error with invalid categoryID', async () => {
    const task: CreateTaskDto = {
      title: 'test Task',
      description: 'task description',
      categoryId: 'b099b19c',
    };
    await expect(service.create(task)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
