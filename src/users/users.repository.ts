import {
  AttributeValue,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  private readonly tableName = 'users';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: 'sa-east-1',
    });
  }

  async findAll() {
    const result: User[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(User.newInstanceFromDynamoDBObject(item));
      });
    }

    return result;
  }

  async findById(userId: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: userId },
      },
    });

    const result = await this.client.send(command);

    if (result.Item) {
      return User.newInstanceFromDynamoDBObject(result.Item);
    }

    return undefined;
  }

  async findByEmail(userEmail: string) {
    // tech debt, couldn't find a cheaper solution, having a second index would have additional costs
    const user = await this.findAll().then((users) =>
      users.find((user) => user.email == userEmail),
    );

    if (user) return user;

    return undefined;
  }

  async upsertOne(data: User) {
    const passwordHashSalts = 2;
    const itemObject: Record<string, AttributeValue> = {
      id: {
        S: data.id,
      },
      username: {
        S: data.username,
      },
      email: {
        S: data.email,
      },
      passwordHash: {
        S: await bcrypt.hash(data.passwordHash, passwordHashSalts),
      },
      firstName: {
        S: data.firstName,
      },
      lastName: {
        S: data.lastName,
      },
      tags: {
        SS: [...data.tags],
      },
    };

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.client.send(command);

    return data;
  }

  async deleteById(userId: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: userId,
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
