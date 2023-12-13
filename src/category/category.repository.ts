import { JsonDB, Config } from 'node-json-db';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('./database/myDataBase', true, true, '/'));
  }
  async findAll() {
    return (await this.db.getData('/category')) as CreateCategoryDto[];
  }

  async create(category: CreateCategoryDto) {
    const categoryIndex = await this.db.getIndex(
      '/category',
      category.name,
      'name',
    );
    if (categoryIndex >= 0)
      throw new ConflictException('Category Name already exists');

    await this.db.push('/category[]', category);
    return category;
  }

  async delete(id: string) {
    const categoryIDIndex = await this.db.getIndex('/task', id, 'categoryId');
    if (categoryIDIndex >= 0)
      throw new ConflictException(
        'Some tasks are still referencing this category',
      );

    const categoryIndex = await this.db.getIndex('/category', id);
    if (categoryIndex < 0)
      throw new NotFoundException('categoryId is not found');

    await this.db.delete(`/category[${categoryIndex}]`);
    return `Category with ID '${id}' is deleted`;
  }
}
