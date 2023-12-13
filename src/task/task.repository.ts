import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/main';
import { CreateTaskDto } from './dto/create-tast.dto';
@Injectable()
export class TaskRepository {
  async findAll() {
    return (await db.getData('/task')) as CreateTaskDto[];
  }

  async findOne(id: string) {
    const allTask = await this.findAll();
    const matchedTask = allTask.find((task) => task.id === id);
    if (!matchedTask) throw new NotFoundException('Task not found');
    return matchedTask;
  }

  async create(task: CreateTaskDto) {
    const categoryIndex = await db.getIndex('/category', task.categoryId);
    if (categoryIndex < 0)
      throw new NotFoundException('categoryId is not found');

    await db.push('/task[]', task);
    return task;
  }

  async delete(id: string) {
    const taskIndex = await db.getIndex('/task', id);
    if (taskIndex < 0) throw new NotFoundException('taskId is not found');
    await db.delete(`/task[${taskIndex}]`);
    return `Task with ID '${id}' is deleted`;
  }
}
