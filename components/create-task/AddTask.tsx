"use client";

import { TaskColorEnum } from "@/lib/types/task.types";
import TaskForm from "@/components/form/TaskForm";
import useTaskStore from "@/lib/store/taskStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddTask() {
  const createTask = useTaskStore((state) => state.createTask);

  const handleFormSubmit = async (
    title: string,
    color: TaskColorEnum,
    resetForm: () => void
  ) => {
    try {
      await createTask({ title, color, completed: false });
      resetForm();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <main>
      <div className="mt-24">
        <Link href="/">
          <ArrowLeft className="text-white" />
        </Link>
        <TaskForm
          onSubmit={handleFormSubmit}
          buttonLabel="Add Task"
          isUpdate={false}
        />
      </div>
    </main>
  );
}
