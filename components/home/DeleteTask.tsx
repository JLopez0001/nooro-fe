import { Trash2 } from "lucide-react";
import useTaskStore from "@/lib/store/taskStore";

interface TaskItemProps {
  id: number;
}

export default function DeleteTask({ id }: TaskItemProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return <Trash2 onClick={handleDelete} className="cursor-pointer text-grey" />;
}
