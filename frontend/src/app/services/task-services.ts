import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task.interface'; // Adjust path if you put task.interface.ts elsewhere

@Injectable({
  providedIn: 'root' // Makes the service available throughout the app
})
export class TaskService {
  // IMPORTANT: Replace this with your actual NestJS backend API URL
  // This will typically be your backend's URL plus its global prefix and resource path
  // E.g., 'http://localhost:3000/api/tasks' if your NestJS is on 3000 with '/api' prefix and '/tasks' controller
  private apiUrl = 'http://localhost:3000/api/tasks'; // Adjust to your backend's tasks endpoint

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to the backend to create a new task.
   * @param task The task object to create (without id, createdAt).
   * @returns An Observable of the created Task (including ID and createdAt from backend).
   */
  createTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions);
  }

  // You will add methods for viewing (getTasks), updating (updateTask),
  // and deleting (deleteTask) tasks here later.
}