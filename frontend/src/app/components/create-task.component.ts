import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { TaskService} from '../services/task-services'; 
import {Task} from '../task.interface'; 

@Component({
  selector: 'app-create-task',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService 
  ) {}

  ngOnInit(): void {
   
    this.taskForm = this.fb.group({
      title: ['', Validators.required], 
      description: [''], // 
      status: ['pending', Validators.required] 
    });
  }

  onSubmit(): void {
    this.loading = true; 
    this.successMessage = null; 
    this.errorMessage = null;

    if (this.taskForm.valid) {
      
      const newTask: Omit<Task, 'id' | 'createdAt'> = this.taskForm.value;

      this.taskService.createTask(newTask).subscribe({
        next: (response) => {
          console.log('Task created successfully!', response);
          this.successMessage = 'Task created successfully!';
          
          this.taskForm.reset({ title: '', description: '', status: 'pending' });
          this.loading = false; 
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.errorMessage = 'Failed to create task. Please check the console for details.';
          this.loading = false; 
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.loading = false;
      
      this.taskForm.markAllAsTouched();
    }
  }
}