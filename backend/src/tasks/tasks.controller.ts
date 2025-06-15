import { Controller, Post, Body, Get, Param, Patch, NotFoundException,Delete, HttpStatus, Query,ConflictException,
  InternalServerErrorException } from '@nestjs/common'
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
          return await this.tasksService.update(id, updateTaskDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

   @Delete(':id')
  
  async remove(@Param('id') id: string) {
    try {
      
      const result = await this.tasksService.remove(id);
      return { message: 'Task deleted successfully', result };
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      if (error instanceof NotFoundException || error.statusCode === 404) { 
        throw new NotFoundException('Task not found or already deleted.');
      } else if (error instanceof ConflictException || error.statusCode === 409) {
        throw new ConflictException('Revision mismatch. Task might have been updated by another process.');
      }
      throw new InternalServerErrorException(`Failed to delete task with ID ${id}`, error.message);
    }
  }
}

