import { db } from 'src/main';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  async findAll() {
    return (await db.getData('/category')) as CreateCategoryDto[];
  }

  async create(category: CreateCategoryDto) {
    const categoryIndex = await db.getIndex('/category', category.name, 'name');
    if (categoryIndex >= 0)
      throw new ConflictException('Category Name already exists');

    await db.push('/category[]', category);
    return category;
  }

  async delete(id: string) {
    const categoryIDIndex = await db.getIndex('/task', id, 'categoryId');
    if (categoryIDIndex >= 0)
      throw new ConflictException(
        'Some tasks are still referencing this category',
      );

    const categoryIndex = await db.getIndex('/category', id);
    if (categoryIndex < 0)
      throw new NotFoundException('categoryId is not found');

    await db.delete(`/category[${categoryIndex}]`);
    return `Category with ID '${id}' is deleted`;
  }
}
