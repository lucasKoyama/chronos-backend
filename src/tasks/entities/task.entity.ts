import { CreateTaskDto } from '../dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

export class Task {
  taskId: string;
  userId: string;
  title: string;
  description: string;
  scheduled: Date;
  tag: string;
  importance: number;
  urgency: number;
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;

  static newInstanceFromDTO(data: CreateTaskDto) {
    const result = new Task();
    result.taskId = uuidv4();
    result.userId = data.userId;
    result.title = data.title;
    result.description = data.description;
    result.scheduled = new Date(data.scheduled);
    result.tag = data.tag;
    result.importance = data.importance;
    result.urgency = data.urgency;
    result.finished = data.finished;
    result.createdAt = new Date();
    result.updatedAt = new Date();

    return result;
  }

  static newInstanceFromDynamoDBObject(data: any): Task {
    const result = new Task();
    result.taskId = data.taskId.S;
    result.userId = data.userId.S;
    result.title = data.title.S;
    result.description = data.description.S;
    result.scheduled = new Date(Number(data.scheduled.N));
    result.tag = data.tag.S;
    result.importance = data.importance.N;
    result.urgency = data.urgency.N;
    result.finished = data.finished.BOOL;
    result.createdAt = new Date(Number(data.createdAt.N));
    result.updatedAt = new Date(Number(data.updatedAt.N));

    return result;
  }
}
