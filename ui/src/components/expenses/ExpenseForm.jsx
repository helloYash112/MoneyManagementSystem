import { useForm } from "react-hook-form";

export default function ExpenseForm({
  initialData,
  onSubmit,
  onClose,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {initialData ? "Edit Expense" : "Add Expense"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("description")}
            placeholder="Expense Title"
            className="w-full rounded-lg border p-3"
          />

          <input
            {...register("amount")}
            placeholder="Amount"
            type="number"
            step="0.01"
            className="w-full rounded-lg border p-3"
          />

          <select
            {...register("category")}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>

          <input
            type="date"
            {...register("expenseDate")}
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