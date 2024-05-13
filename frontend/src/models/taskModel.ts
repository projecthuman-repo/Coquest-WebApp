// taskModel.ts
import { Location, Image, ExpandableUser } from "./common";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

// Separating properties and methods into different interfaces

export interface TaskProperties {
  readonly id: string | undefined;
  taskName: string;
  communityName: string;
  location: Location;
  description: string;
  images?: Image[];
  status: TaskStatus;
  assignedTo?: ExpandableUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task extends TaskProperties {
  isValid(): boolean;
  getDefaultForProperty(key: string): any;
}

export class TaskImpl implements Task {
  readonly id: string | undefined;
  taskName: string;
  communityName: string;
  location: Location;
  description: string;
  images: Image[];
  status: TaskStatus;
  assignedTo?: ExpandableUser;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params: TaskProperties) {
    // Change to TaskProperties
    this.id = params.id;
    this.taskName = params.taskName;
    this.communityName = params.communityName;
    this.location = params.location;
    this.description = params.description;
    this.images = params.images || [];
    this.status = params.status;
    this.assignedTo = params.assignedTo;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  isValid(): boolean {
    return !!this.taskName && !!this.communityName && !!this.description;
  }

  getDefaultForProperty(key: string): any {
    const defaults: { [key: string]: any } = {
      images: [],
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return defaults[key] || null;
  }
}
