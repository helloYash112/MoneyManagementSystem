import { useState } from "react";
import { Plus, FolderTree } from "lucide-react";

import CategoryTable from "../components/categories/CategoryTable";
import CategoryForm from "../components/categories/CategoryForm";
import CategoryFilters from "../components/categories/CategoryFilters";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";

export default function Categories() {
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] =
    useState(null);

  const [showDelete, setShowDelete] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const categories = [
    {
      id: 1,
      name: "Food",
      description: "Restaurants and groceries",
    },
    {
      id: 2,
      name: "Transport",
      description: "Petrol, bus and cab expenses",
    },
    {
      id: 3,
      name: "Entertainment",
      description: "Movies and subscriptions",
    },
    {
      id: 4,
      name: "Bills",
      description: "Electricity and internet",
    },
  ];

  const filteredCategories =
    categories.filter((category) =>
      category.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500">
            Manage expense categories
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats Card */}

      <div className="rounded-xl bg-white p-5 shadow">
        <div className="flex items-center gap-3">
          <FolderTree
            className="text-blue-600"
            size={32}
          />

          <div>
            <p className="text-gray-500">
              Total Categories
            </p>

            <h2 className="text-2xl font-bold">
              {categories.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Filters */}

      <CategoryFilters
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}

      <CategoryTable
        categories={filteredCategories}
        onEdit={(category) => {
          setEditCategory(category);
          setShowForm(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setShowDelete(true);
        }}
      />

      {/* Add / Edit Modal */}

      {showForm && (
        <CategoryForm
          initialData={editCategory}
          onSubmit={(data) => {
            console.log(data);

            setShowForm(false);
            setEditCategory(null);
          }}
          onClose={() => {
            setShowForm(false);
            setEditCategory(null);
          }}
        />
      )}

      {/* Delete Modal */}

      {showDelete && (
        <DeleteCategoryModal
          category={selectedCategory}
          onConfirm={(id) => {
            console.log("Delete Category", id);
            setShowDelete(false);
          }}
          onClose={() =>
            setShowDelete(false)
          }
        />
      )}
    </div>
  );
}