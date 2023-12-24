import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.repository.upsertOne(Task.newInstanceFromDTO(createTaskDto));
  }

  findAll() {
    return this.repository.findAll();
  }

  findAllByUserId(userId: string) {
    return this.repository.findAllByUserId(userId);
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const existingObject = await this.repository.findById(id);
    if (existingObject) {
      const updateFields = Object.keys(updateTaskDto);
      updateFields.forEach(
        (field) => (existingObject[field] = updateTaskDto[field]),
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
