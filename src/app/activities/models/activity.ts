export interface Project {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
}

export interface Activity {
  project: Project;
  employee: Employee;
  date: string;
  hours: number;
}
