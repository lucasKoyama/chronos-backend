import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.upsertOne(User.newInstanceFromDTO(createUserDto));
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingObject = await this.repository.findById(id);
    if (existingObject) {
      const updateFields = Object.keys(updateUserDto);
      updateFields.forEach(
        (field) => (existingObject[field] = updateUserDto[field]),
      );
      return this.repository.upsertOne(existingObject);
    } else {
      return false;
    }
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
