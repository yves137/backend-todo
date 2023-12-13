import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum TaskDescription {
  OPEN = 'OPEN',
  INPROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  //id property
  @ApiProperty({
    readOnly: true,
    default: 'f17362aa-820s-za5f-q134-m866bb5fd72f',
    description: 'The id of the task',
  })
  @IsOptional()
  @IsString()
  id?: string;

  //title property
  @ApiProperty({
    required: true,
    minLength: 1,
    default: 'Task Title',
    description: 'The title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  // status property
  @ApiProperty({
    required: false,
    enum: TaskDescription,
    default: TaskDescription.OPEN,
    description: 'The status this of the task',
  })
  @IsOptional()
  @IsEnum(['OPEN', 'IN_PROGRESS', 'DONE'], {
    message: `status must be one of the following values: 'OPEN' | 'IN_PROGRESS' | 'DONE'`,
  })
  status?: TaskDescription;

  // description property
  @ApiProperty({
    required: true,
    minLength: 1,
    default: 'Task Description',
    description: 'The description of this task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  // category property
  @ApiProperty({
    required: true,
    example: 'f17362aa-820s-za5f-q134-m866bb5fd72f',
    default: 'f17362aa-820s-za5f-q134-m866bb5fd72f',
    description: 'The ID of an existing Category',
  })
  @IsUUID()
  categoryId: string;
}
