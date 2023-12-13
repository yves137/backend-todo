import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async create(category: CreateCategoryDto) {
    return await this.categoryRepository.create(category);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
