export class Task {
  taskId: string;
  title: string;
  description: string;
  finished: boolean;
  importance: number;
  urgency: number;

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
