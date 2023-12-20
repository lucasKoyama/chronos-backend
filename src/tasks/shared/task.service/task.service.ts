import { Injectable } from '@nestjs/common';
import { Task } from '../task/task';
import tasks from './task.mock';

@Injectable()
export class TaskService {
  tasks: Task[] = tasks;

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  create(task: Task) {
    const lastId =
      this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id : 0;
    task.id = lastId + 1;
    this.tasks.push(task);

    return task;
  }

  update(task: Task) {
    const existingTask = this.getById(task.id);
    if (existingTask) {
      existingTask.title = task.title;
      existingTask.description = task.description;
      existingTask.finished = task.finished;
      existingTask.importance = task.importance;
      existingTask.urgency = task.urgency;
    }

    return existingTask;
  }

  delete(id: number) {
    const deletionIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(deletionIndex, 1);
  }
}
