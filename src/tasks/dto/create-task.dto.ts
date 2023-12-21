import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  taskId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  finished: boolean;

  @IsNumber()
  importance: number;

  @IsNumber()
  urgency: number;
}
