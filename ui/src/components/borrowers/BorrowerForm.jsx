import { useForm } from "react-hook-form";

export default function BorrowerForm({
  onSubmit,
  onClose,
}) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Add Borrower
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("name", {
              required: true,
            })}
            placeholder="Name"
            className="w-full rounded-lg border p-3"
          />

          <input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="w-full rounded-lg border p-3"
          />

          <input
            {...register("address")}
            placeholder="Address"
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
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
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