import {
  AttributeValue,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
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
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
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

  async findAllByUserId(userId) {
    const result: Task[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': { S: userId } },
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

  async upsertOne(data: Task) {
    console.log(data);
    const itemObject: Record<string, AttributeValue> = {
      taskId: {
        S: data.taskId,
      },
      userId: {
        S: data.userId,
      },
      title: {
        S: data.title,
      },
      description: {
        S: data.description,
      },
      scheduled: {
        N: String(new Date(data.scheduled).getTime()),
      },
      tag: {
        S: data.tag,
      },
      importance: {
        N: String(data.importance),
      },
      urgency: {
        N: String(data.urgency),
      },
      finished: {
        BOOL: data.finished,
      },
      createdAt: {
        N: String(new Date(data.createdAt).getTime()),
      },
    };

    if (data.updatedAt) {
      itemObject.updatedAt = { N: String(new Date(data.updatedAt).getTime()) };
    }

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.client.send(command);

    return data;
  }

  async deleteById(taskId: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        taskId: {
          S: taskId,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
    });

    const result = await this.client.send(command);
    if (result.Attributes) return true;
    return false;
  }
}
