import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  taskId: string;

  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  scheduled: Date;

  @IsString()
  tag: string;

  @IsNumber()
  importance: number;

  @IsNumber()
  urgency: number;

  @IsBoolean()
  finished: boolean;
}
