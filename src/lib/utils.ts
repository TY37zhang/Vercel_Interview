import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    ApiResponse,
    User,
    Task,
    CreateUserRequest,
    CreateTaskRequest,
    UpdateTaskRequest,
} from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// API utility functions
const API_BASE_URL = "/api";

export const api = {
    // User API methods
    users: {
        async getAll(role?: string): Promise<ApiResponse<User[]>> {
            const url = role
                ? `${API_BASE_URL}/users?role=${role}`
                : `${API_BASE_URL}/users`;
            const response = await fetch(url);
            return response.json();
        },

        async create(userData: CreateUserRequest): Promise<ApiResponse<User>> {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            return response.json();
        },

        async delete(id: number): Promise<ApiResponse<User>> {
            const response = await fetch(`${API_BASE_URL}/users?id=${id}`, {
                method: "DELETE",
            });
            return response.json();
        },
    },

    // Task API methods
    tasks: {
        async getAll(filters?: {
            status?: string;
            priority?: string;
            userId?: number;
        }): Promise<ApiResponse<Task[]>> {
            const params = new URLSearchParams();
            if (filters?.status) params.append("status", filters.status);
            if (filters?.priority) params.append("priority", filters.priority);
            if (filters?.userId)
                params.append("userId", filters.userId.toString());

            const url = `${API_BASE_URL}/tasks${
                params.toString() ? `?${params.toString()}` : ""
            }`;
            const response = await fetch(url);
            return response.json();
        },

        async create(taskData: CreateTaskRequest): Promise<ApiResponse<Task>> {
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            return response.json();
        },

        async update(taskData: UpdateTaskRequest): Promise<ApiResponse<Task>> {
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            return response.json();
        },

        async delete(id: number): Promise<ApiResponse<Task>> {
            const response = await fetch(`${API_BASE_URL}/tasks?id=${id}`, {
                method: "DELETE",
            });
            return response.json();
        },
    },
};

// Utility functions for formatting
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Status and priority utilities
export function getStatusColor(status: string): string {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800";
        case "in-progress":
            return "bg-blue-100 text-blue-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

export function getPriorityColor(priority: string): string {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-800";
        case "medium":
            return "bg-orange-100 text-orange-800";
        case "low":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}
