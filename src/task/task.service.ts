import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-tast.dto';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  async findAll() {
    return this.taskRepository.findAll();
  }

  async findOne(id: string) {
    return await this.taskRepository.findOne(id);
  }

  async create(task: CreateTaskDto) {
    return await this.taskRepository.create(task);
  }

  async delete(id: string) {
    return await this.taskRepository.delete(id);
  }
}
