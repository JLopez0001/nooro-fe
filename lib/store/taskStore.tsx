import { create } from "zustand";
import {
  TaskSchema,
  UpdateTaskSchema,
  CreateTaskSchema,
} from "../types/task.types";
import axios from "axios";

interface TaskState {
  tasks: TaskSchema[];
  isLoading: boolean;
  error: string | null;
}

interface TaskActions {
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskSchema) => Promise<void>;
  updateTask: (id: number, task: UpdateTaskSchema) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const useTaskStore = create<TaskState & TaskActions>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`
      );
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch tasks",
        isLoading: false,
      });
    }
  },

  createTask: async (task: CreateTaskSchema) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        task
      );
      set((state) => ({
        tasks: [...state.tasks, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create task",
        isLoading: false,
      });
    }
  },

  updateTask: async (id: number, task: UpdateTaskSchema) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        task
      );
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? response.data : t)),
        isLoading: false,
      }));
    } catch (error) {
      console.error("API Error:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to update task",
        isLoading: false,
      });
    }
  },

  deleteTask: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/remove/${id}`
      );
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete task",
        isLoading: false,
      });
    }
  },
}));

export default useTaskStore;
