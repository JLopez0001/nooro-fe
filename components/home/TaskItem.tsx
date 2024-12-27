import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import useTaskStore from "@/lib/store/taskStore";
import DeleteTask from "./DeleteTask";
import { TaskColorEnum } from "@/lib/types/task.types";

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  color: TaskColorEnum;
}

export default function TaskItem({ title, completed, id }: TaskItemProps) {
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleCheckboxChange = async (checked: boolean) => {
    await updateTask(id, { completed: checked });
  };

  return (
    <div className="flex justify-between items-center bg-dark-grey p-2 rounded-md space-x-2">
      <Checkbox
        id={`task-${id}`}
        checked={completed}
        onCheckedChange={handleCheckboxChange}
      />
      <Link
        href={`/edit-task/${id}`}
        className="text-sm font-medium text-white hover:underline"
      >
        {completed ? (
          <span className="line-through text-grey">{title}</span>
        ) : (
          <span>{title}</span>
        )}
      </Link>
      <DeleteTask id={id} />
    </div>
  );
}
