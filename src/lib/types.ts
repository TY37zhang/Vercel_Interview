// User types
export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

export interface CreateUserRequest {
    name: string;
    email: string;
    role?: "admin" | "user";
}

// Task types
export interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
    priority?: "low" | "medium" | "high";
    userId: number;
}

export interface UpdateTaskRequest {
    id: number;
    title?: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
    priority?: "low" | "medium" | "high";
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    count?: number;
}

// Form types
export interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "select" | "textarea";
    required?: boolean;
    options?: { value: string; label: string }[];
    placeholder?: string;
}
