import { useState, useEffect } from "react";
import { Plus, FolderTree } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import CategoryTable from "../components/categories/CategoryTable";
import CategoryForm from "../components/categories/CategoryForm";
import CategoryFilters from "../components/categories/CategoryFilters";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";


import {
  createCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "../features/categories/categoriesSlice";

export default function Categories() {
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const { userId } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Open Add Category form
  const handleAddCategory = () => {
    setEditCategory(null);
    setShowForm(true);
  };

  // Open Edit Category form
  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowForm(true);
  };

  // Create / Update Category
  const handleCategorySubmit = async (data) => {
    try {
       const categoryData = {
      ...data,
      userId: userId,
    };
      if (editCategory) {
        // Update existing category
        await dispatch(
          updateCategory({
            id: editCategory.id,
            categoryRequest: categoryData,
          }),
        ).unwrap();
      } else {
        // Create new category
        await dispatch(
          createCategory(categoryData),
        ).unwrap();
      }

      // Close form after successful request
      setShowForm(false);
      setEditCategory(null);
    } catch (err) {
      console.error("Category operation failed:", err);
    }
  };

  // Close Add / Edit form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditCategory(null);
  };

  // Open Delete modal
  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDelete(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(
        deleteCategory(id),
      ).unwrap();

      setShowDelete(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Delete category failed:", err);
    }
  };

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
          onClick={handleAddCategory}
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

      {/* Loading */}
      {loading && (
        <div className="rounded-lg bg-white p-4 text-center text-gray-500">
          Loading categories...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <CategoryForm
          initialData={editCategory}
          onSubmit={handleCategorySubmit}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Modal */}
      {showDelete && (
        <DeleteCategoryModal
          category={selectedCategory}
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setShowDelete(false);
            setSelectedCategory(null);
          }}
        />
      )}

    </div>
  );
}
