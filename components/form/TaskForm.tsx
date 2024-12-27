import { useState, useCallback } from "react";
import { TaskColorEnum } from "@/lib/types/task.types";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Check } from "lucide-react";

interface TaskFormProps {
  initialTitle?: string;
  initialColor?: TaskColorEnum;
  onSubmit: (
    title: string,
    color: TaskColorEnum,
    resetForm: () => void
  ) => void;
  buttonLabel?: string;
  isUpdate?: boolean;
}

export default function TaskForm({
  initialTitle = "",
  initialColor = TaskColorEnum.RED,
  onSubmit,
  buttonLabel = "Submit",
  isUpdate = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState<TaskColorEnum>(initialColor);

  const resetForm = useCallback(() => {
    setTitle("");
    setColor(TaskColorEnum.RED);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(title, color, isUpdate ? () => {} : resetForm);
    },
    [title, color, onSubmit, isUpdate, resetForm]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-10">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-bold text-company-primary"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Brush your teeth"
          className="mt-2 w-full rounded-lg text-white bg-dark-grey h-10 p-5"
          required
        />
      </div>
      <div>
        <p className="text-sm font-bold text-company-primary">Color</p>
        <div className="flex space-x-2 mt-2">
          {Object.values(TaskColorEnum).map((colorValue) => (
            <div
              key={colorValue}
              className={`w-10 h-10 rounded-full cursor-pointer ${
                color === colorValue ? "ring-1 ring-offset-1 ring-white" : ""
              }`}
              style={{ backgroundColor: colorValue.toLowerCase() }}
              onClick={() => setColor(colorValue)}
              role="button"
              aria-label={`Select color ${colorValue}`}
              aria-pressed={color === colorValue}
            />
          ))}
        </div>
      </div>
      <Button type="submit" className="flex items-center space-x-2">
        <span>{buttonLabel}</span>
        {isUpdate ? <Check /> : <CirclePlus />}
      </Button>
    </form>
  );
}
