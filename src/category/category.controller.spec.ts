import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, CategoryRepository],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // GET ALL CATEGORIES
  it('should GET all category', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array<CreateCategoryDto>);
  });

  //  DELETE CATEGORY
  it('should create delete a category', async () => {
    const category = new CreateCategoryDto();
    category.name = 'amyCategory1';
    const createdCategoryID = (await controller.create(category)).id;
    expect(await controller.delete(createdCategoryID)).toContain('is deleted');
  });

  //  CREATE CATEGORY
  it('should create a category', async () => {
    const category = new CreateCategoryDto();
    category.name = 'myCategory1';
    const createdCategory = await controller.create(category);
    controller.delete(createdCategory.id);
    expect(createdCategory.name).toEqual(category.name);
  });
});
