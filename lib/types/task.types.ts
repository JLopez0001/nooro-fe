import { z } from "zod";

export enum TaskColorEnum {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  DARKBLUE = "DARKBLUE",
  PURPLE = "PURPLE",
  PINK = "PINK",
  BROWN = "BROWN",
}

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().describe("Task Title"),
  color: z.nativeEnum(TaskColorEnum).describe("Task Color"),
  completed: z.boolean().default(false),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export type CreateTaskSchema = Omit<TaskSchema, "id">;
export type UpdateTaskSchema = Partial<TaskSchema>;
