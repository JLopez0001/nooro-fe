"use client";
import { useEffect, useCallback } from "react";
import Link from "next/link";
import useTaskStore from "@/lib/store/taskStore";
import TaskItem from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CirclePlus } from "lucide-react";
import { ClipboardList } from "lucide-react";

export default function Tasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const fetchData = useCallback(async () => {
    try {
      await fetchTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [fetchTasks]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <main>
      <div className="mt-4 max-w-[600px]">
        <Link href="/create-task" passHref>
          <Button className="font-bold">
            Create Task <CirclePlus />
          </Button>
        </Link>
        <div className="flex mt-10 justify-between ">
          <h3>
            <span className="text-company-primary">Tasks</span>{" "}
            <Badge>{tasks.length}</Badge>
          </h3>
          <h3>
            <span className="text-company-secondary">Completed</span>{" "}
            <Badge> {`${completedTasksCount} de ${tasks.length}`}</Badge>
          </h3>
        </div>
        {tasks.length === 0 ? (
          <div className="mt-5 flex flex-col items-center text-center space-y-4 text-grey">
            <div className="w-full max-w-[600px] border-t border-grey mb-20"></div>
            <ClipboardList className="w-16 h-16 text-grey" />
            <p className="text-md font-bold">
              You don’t have any tasks registered yet.
            </p>
            <p className="text-md">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          <section className="mt-5 space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                color={task.color}
                completed={task.completed}
                title={task.title}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
