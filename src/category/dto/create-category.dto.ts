import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  // id property
  @ApiProperty({
    readOnly: true,
    default: 'f17362aa-820s-za5f-q134-m866bb5fd72f',
    description: 'The ID of the category',
  })
  @IsOptional()
  @IsString()
  id?: string;

  // name property
  @ApiProperty({
    required: true,
    minLength: 1,
    uniqueItems: true,
    default: 'Category',
    description: 'The name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
