import { useForm } from "react-hook-form";

export default function LoanForm({
  borrowerId,
  onSubmit,
  onClose,
}) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Add Loan
        </h2>

        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({
              ...data,
              borrowerId,
            })
          )}
          className="space-y-4"
        >
          <input
            {...register("amountLent")}
            type="number"
            placeholder="Amount Lent"
            className="w-full rounded-lg border p-3"
          />

          <input
            {...register("dueDate")}
            type="date"
            className="w-full rounded-lg border p-3"
          />

          <textarea
            {...register("notes")}
            rows={3}
            placeholder="Notes"
            className="w-full rounded-lg border p-3"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}