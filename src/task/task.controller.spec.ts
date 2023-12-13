import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-tast.dto';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, TaskRepository],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // GET ALL TASKS
  it('should GET all tasks', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array<CreateTaskDto>);
  });

  // DELETE TASK ID
  it('should DELETE a task by ID', async () => {
    const task: CreateTaskDto = {
      title: 'test Task',
      description: 'task description',
      categoryId: 'b099b19c-d81e-4972-bb2e-40d6a7d67a9f',
    };
    const createTask = await controller.create(task);
    expect(await controller.delete(createTask.id)).toContain('is deleted');
  });

  // GET TASKS ID
  it('should GET a task by ID', async () => {
    const task: CreateTaskDto = {
      title: 'test Task',
      description: 'task description',
      categoryId: 'b099b19c-d81e-4972-bb2e-40d6a7d67a9f',
    };
    const createTask = await controller.create(task);
    expect((await controller.findOne(createTask.id)).title).toEqual(task.title);
  });

  // CREATE TASK
  it('should CREATE A TASK', async () => {
    const task: CreateTaskDto = {
      title: 'test Task',
      description: 'task description',
      categoryId: 'b099b19c-d81e-4972-bb2e-40d6a7d67a9f',
    };
    expect((await controller.create(task)).title).toEqual(task.title);
  });
});
