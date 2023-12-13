import { Global, Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
@Global()
@Module({
  imports: [TaskModule, CategoryModule],
})
export class AppModule {}
