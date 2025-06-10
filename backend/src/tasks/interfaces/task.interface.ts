export interface Task {
  _id?: string;           // CouchDB auto-generates _id if not provided
  _rev?: string;          // Required for updates/deletes
  title: string;
  description: string;
  status: string;
  createdAt?: string;     // ISO date string
}