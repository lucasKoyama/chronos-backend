import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  tags: string[];

  static newInstanceFromDTO(data: CreateUserDto) {
    const result = new User();
    result.id = uuidv4();
    result.username = data.username;
    result.email = data.email;
    result.passwordHash = data.passwordHash;
    result.firstName = data.firstName;
    result.lastName = data.lastName;
    result.tags = [...data.tags];

    return result;
  }

  static newInstanceFromDynamoDBObject(data: any): User {
    const result = new User();
    result.id = data.id.S;
    result.username = data.username.S;
    result.email = data.email.S;
    result.passwordHash = data.passwordHash.S;
    result.firstName = data.firstName.S;
    result.lastName = data.lastName.S;
    result.tags = [...data.tags.SS];

    return result;
  }
}
