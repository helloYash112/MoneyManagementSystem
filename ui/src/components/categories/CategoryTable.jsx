import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="p-4 font-medium">
                {category.name}
              </td>

              <td className="p-4 text-gray-600">
                {category.description}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No categories found
        </div>
      )}
    </div>
  );
}