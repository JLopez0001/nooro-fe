import EditTask from "@/components/edit-task/EditsTask";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  return (
    <>
      <EditTask id={params.id} />
    </>
  );
}
