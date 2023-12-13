import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tast.dto';
import { JsonDB, Config } from 'node-json-db';
@Injectable()
export class TaskRepository {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('./database/myDataBase', true, true, '/'));
  }
  async findAll() {
    return (await this.db.getData('/task')) as CreateTaskDto[];
  }

  async findOne(id: string) {
    const allTask = await this.findAll();
    const matchedTask = allTask.find((task) => task.id === id);
    if (!matchedTask) throw new NotFoundException('Task not found');
    return matchedTask;
  }

  async create(task: CreateTaskDto) {
    const categoryIndex = await this.db.getIndex('/category', task.categoryId);
    if (categoryIndex < 0)
      throw new NotFoundException('categoryId is not found');

    await this.db.push('/task[]', task);
    return task;
  }

  async delete(id: string) {
    const taskIndex = await this.db.getIndex('/task', id);
    if (taskIndex < 0) throw new NotFoundException('taskId is not found');
    await this.db.delete(`/task[${taskIndex}]`);
    return `Task with ID '${id}' is deleted`;
  }
}
