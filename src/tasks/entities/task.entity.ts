import { CreateTaskDto } from '../dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

export class Task {
  taskId: string;
  title: string;
  description: string;
  finished: boolean;
  importance: number;
  urgency: number;

  static newInstanceFromDTO(data: CreateTaskDto) {
    const result = new Task();
    result.taskId = uuidv4();
    result.title = data.title;
    result.description = data.description;
    result.finished = data.finished;
    result.importance = data.importance;
    result.urgency = data.urgency;

    return result;
  }

  static newInstanceFromDynamoDBObject(data: any): Task {
    const result = new Task();
    result.taskId = data.taskId.S;
    result.title = data.title.S;
    result.description = data.description.S;
    result.finished = data.finished.BOOL;
    result.importance = data.importance.N;
    result.urgency = data.urgency.N;

    return result;
  }
}
