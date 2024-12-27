import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-background-header h-[15vh] w-full flex justify-center">
      <div className="flex items-center gap-x-4">
        <Rocket className="text-company-primary w-8 h-8" />
        <h1 className="text-4xl font-bold">
          <span className="text-company-primary">Todo</span>{" "}
          <span className="text-company-secondary">App</span>
        </h1>
      </div>
    </header>
  );
}
