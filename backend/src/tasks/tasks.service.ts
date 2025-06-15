import  { Injectable, OnModuleInit, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common'; 
import Nano from 'nano';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService implements OnModuleInit {
  private db: Nano.DocumentScope<Task>;

  async onModuleInit() {
    const nano = Nano('http://admin:password@localhost:5984');
    const dbName = 'tasks';

    try {
      const dbList = await nano.db.list();
      if (!dbList.includes(dbName)) {
        console.log(`Database '${dbName}' does not exist, creating it...`);
        await nano.db.create(dbName);
        console.log(`Database '${dbName}' created successfully.`);
      }
      this.db = nano.db.use(dbName);
      console.log(`Connected to CouchDB database: ${dbName}`);
    } catch (error) {
      console.error('Failed to initialize CouchDB connection or create database:', error);
      throw error;
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask: Task = {
        ...createTaskDto,
        createdAt: new Date().toISOString(),
        status: createTaskDto.status || 'Pending', 
      } as Task;

      const response = await this.db.insert(newTask);
      return { _id: response.id, _rev: response.rev, ...newTask };
    } catch (error) {
      console.error('Error creating task in DB:', error);
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const result = await this.db.list({ include_docs: true });
      return result.rows
        .map(row => row.doc)
        .filter(doc => doc && !doc._id.startsWith('_design/')) as Task[];
    } catch (error) {
      console.error('Error fetching all tasks from DB:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.db.get(id);
      return task;
    } catch (error) {
      if (error.statusCode === 404) {
        throw new NotFoundException(`Task with ID "${id}" not found.`);
      }
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const existingTask = await this.db.get(id);

      const updatedTask = {
        ...existingTask,
        ...updateTaskDto,
        _id: existingTask._id,
        _rev: existingTask._rev,
      } as Task;

      const response = await this.db.insert(updatedTask);

      return { ...updatedTask, _rev: response.rev };

    } catch (error) {
      if (error.statusCode === 404) {
        throw new NotFoundException(`Task with ID "${id}" not found for update.`);
      }
      console.error(`Error updating task with ID ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      
      const existingTask = await this.db.get(id);
      const response = await this.db.destroy(existingTask._id, existingTask._rev);
      return response; 
    } catch (error) {
      if (error.statusCode === 404) {
        throw new NotFoundException(`Task with ID ${id} not found.`); 
      }
      
      if (error.statusCode === 409) {
        throw new ConflictException(`Conflict: Revision mismatch for task with ID ${id}.`); 
      }
      throw new InternalServerErrorException(`Failed to delete task with ID ${id}.`);
    }
  }
  
}