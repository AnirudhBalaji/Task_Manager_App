import { Injectable, OnModuleInit } from '@nestjs/common';
import Nano from 'nano';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService implements OnModuleInit {
  private db: Nano.DocumentScope<any>;

  async onModuleInit() {
    const nano = Nano('http://admin:password@localhost:5984');
    const dbName = 'tasks';
    const dbList = await nano.db.list();

    if (!dbList.includes(dbName)) {
      await nano.db.create(dbName);
    }

    this.db = nano.db.use(dbName);
  }

  async create(createTaskDto: CreateTaskDto) {
    const response = await this.db.insert({
      ...createTaskDto,
      createdAt: new Date().toISOString(),
    });
    return response;
  }

  findAll() {
    return 'TODO: fetch all tasks';
  }

  findOne(id: string) {
    return `TODO: fetch task ${id}`;
  }

  update(id: string) {
    return `TODO: update task ${id}`;
  }

  remove(id: string) {
    return `TODO: delete task ${id}`;
  }
}