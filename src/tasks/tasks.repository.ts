import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksRepository {
  private readonly tableName = 'tasks';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: 'sa-east-1',
    });
  }

  async findAll() {
    const result: Task[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(Task.newInstanceFromDynamoDBObject(item));
      });
    }

    return result;
  }

  async findById(taskId: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        taskId: { S: taskId },
      },
    });

    const result = await this.client.send(command);

    if (result.Item) {
      return Task.newInstanceFromDynamoDBObject(result.Item);
    }

    return undefined;
  }
}
