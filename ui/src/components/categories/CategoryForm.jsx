import { useForm } from "react-hook-form";

export default function CategoryForm({
  initialData,
  onSubmit,
  onClose,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {initialData
            ? "Edit Category"
            : "Add Category"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Category Name"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            rows={3}
            className="w-full rounded-lg border p-3"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}