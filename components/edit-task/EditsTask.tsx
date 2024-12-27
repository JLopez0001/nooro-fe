"use client";

import useTaskStore from "@/lib/store/taskStore";
import TaskForm from "@/components/form/TaskForm";
import { TaskColorEnum } from "@/lib/types/task.types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditTaskProps {
  id: string;
}

export default function EditTask({ id }: EditTaskProps) {
  const taskId = Number(id);
  const updateTask = useTaskStore((state) => state.updateTask);
  const task = useTaskStore((state) =>
    state.tasks.find((task) => task.id === taskId)
  );

  if (!task) {
    return <p>Task not found or invalid ID.</p>;
  }

  const handleFormSubmit = async (title: string, color: TaskColorEnum) => {
    try {
      await updateTask(taskId, { title, color });
      console.log("Task updated successfully!");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <main className="p-4">
      <div className="mt-24">
        <Link href="/" aria-label="Back to home">
          <ArrowLeft className="text-white" />
        </Link>
        <TaskForm
          onSubmit={handleFormSubmit}
          buttonLabel="Save"
          initialTitle={task.title}
          initialColor={task.color}
          isUpdate={true}
        />
      </div>
    </main>
  );
}
