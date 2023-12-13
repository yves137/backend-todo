import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JsonDB, Config } from 'node-json-db';
import { CategoryRepository } from './category.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let db: JsonDB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, CategoryRepository],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    db = new JsonDB(new Config('./database/myDataBase', true, true, '/'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // FIND ALLL CATEGORIES
  describe('findAll', () => {
    it('should have equal length', async () => {
      expect((await service.findAll()).length).toEqual(
        ((await db.getData('/category')) as CreateCategoryDto[]).length,
      );
    });
  });

  // CREATE CATEGORY
  describe('create', () => {
    let category: CreateCategoryDto;
    beforeEach(async () => {
      category = { id: '1', name: 'watchdog' };
    });

    it('should return the same ID', async () => {
      expect((await service.create(category)).id).toEqual(category.id);
    });

    it('should throw an error', async () => {
      await expect(service.create(category)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });

  // DELETE CATEGORY
  describe('delete', () => {
    it('should throw an error', async () => {
      await expect(service.delete('10')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('should return a string contains "is deleted"', async () => {
      expect(await service.delete('1')).toContain('is deleted');
    });
  });
});
