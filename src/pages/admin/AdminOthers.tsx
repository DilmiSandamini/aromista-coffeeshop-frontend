import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaTag } from "react-icons/fa";
import { Button } from "../../components/mini_components/Button";
import { Table } from "../../components/mini_components/Table";
import { Modal } from "../../components/mini_components/Modal";
import Input from "../../components/mini_components/Input";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    toggleCategoryStatus, 
    deleteCategory 
} from "../../service/category";
import { showAlert } from "../../components/mini_components/Swail";

export default function AdminOthers() {
    const [activeTab, setActiveTab] = useState<"categories" | "reports" | "offers">("categories");
    const [loading, setLoading] = useState<boolean>(false);
    
    // Category States
    const [categories, setCategories] = useState<Array<any>>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
    const [isEditModeCategory, setIsEditModeCategory] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch All Categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getAllCategories();
            setCategories(data.categories || data);
        } catch (error) {
            showAlert({ icon: "error", title: "Failed to fetch categories" });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCategoryName("");
        setIsEditModeCategory(false);
        setSelectedCategoryId(null);
        setIsModalOpenCategory(false);
    };

    const handleOpenAddModal = () => {
        resetForm();
        setIsModalOpenCategory(true);
    };

    const handleEditCategory = (category: any) => {
        setIsEditModeCategory(true);
        setSelectedCategoryId(category._id);
        setCategoryName(category.categoryName);
        setIsModalOpenCategory(true);
    };

    const handleSubmitCategory = async () => {
        if (!categoryName.trim()) {
            showAlert({ icon: "warning", title: "Category name is required" });
            return;
        }

        setLoading(true);
        try {
            if (isEditModeCategory && selectedCategoryId) {
                await updateCategory(selectedCategoryId, { categoryName });
                showAlert({ icon: "success", title: "Category updated successfully!" });
            } else {
                await createCategory({ categoryName });
                showAlert({ icon: "success", title: "Category created successfully!" });
            }
            resetForm();
            fetchCategories(); // Refresh table
        } catch (error: any) {
            showAlert({ 
                icon: "error", 
                title: error.response?.data?.message || "Action failed" 
            });
        } finally {
            setLoading(false);
        }
    };

    // Toggle Active/Inactive Status
    const handleToggleStatus = async (id: string) => {
        try {
            await toggleCategoryStatus(id);
            fetchCategories(); 
        } catch (error: any) {
            showAlert({ icon: "error", title: error.response?.data?.message || "Status toggle failed" });
        }
    };

    // Delete Category with Confirmation
    const handleDeleteCategory = async (id: string) => {
        const result = await showAlert({
            icon: "warning",
            title: "Are you sure?",
            text: "This category will be permanently deleted!",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id);
                fetchCategories();
                showAlert({ icon: "success", title: "Category deleted!" });
            } catch (error: any) {
                showAlert({ icon: "error", title: error.response?.data?.message || "Delete failed" });
            }
        }
    };

    return (
        <div className="animate-fade-in pb-10 px-4 pt-6">
            <div className="flex flex-col">
                <h1 className="text-3xl font-serif font-bold text-[#3e2723]">System Configuration</h1>
                <p className="text-stone-500 italic">Manage categories, generate reports, and seasonal offers.</p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-12">
                <div className="flex items-center justify-around border-b-2 border-stone-100 mb-8">
                    {["categories", "reports", "offers"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                activeTab === tab
                                    ? "border-b-4 border-[#4a6741] text-[#4a6741]"
                                    : "text-stone-400 hover:text-stone-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {activeTab === "categories" && (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-serif font-bold text-[#3e2723]">Item Categories</h2>
                                <Button onClick={handleOpenAddModal}>
                                    <FaPlus className="mr-2" /> Add Category
                                </Button>
                            </div>

                            {loading && categories.length === 0 ? (
                                <div className="flex justify-center py-20">
                                    <div className="w-10 h-10 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <Table headers={["Category ID", "Category Name", "Current Status", "Actions"]}>
                                    {categories.map((category) => (
                                        <tr key={category._id} className="hover:bg-stone-50/50 transition-colors group border-b border-stone-50">
                                            <td className="w-4 px-6 py-4 italic">#{category._id}</td>
                                            <td className="px-6 py-4 font-bold text-[#3e2723]">{category.categoryName}</td>
                                            
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleToggleStatus(category._id)}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 mx-auto ${
                                                        category.status === 'AVAILABLE' 
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    }`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        category.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500 animate-pulse'
                                                    }`}></div>
                                                    {category.status}
                                                </button>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        className="p-2 text-stone-400 hover:text-[#bc8a5f] transition-colors"
                                                        onClick={() => handleEditCategory(category)}
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button 
                                                        className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                                                        onClick={() => handleDeleteCategory(category._id)}
                                                    >
                                                        <FaTrashAlt size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </Table>
                            )}
                        </div>
                    )}

                    {activeTab === "reports" && (
                        <div className="p-20 text-center bg-white border-2 border-dashed border-stone-100">
                            <p className="text-stone-400 italic font-serif">Analytics and reporting module coming soon...</p>
                        </div>
                    )}

                    {activeTab === "offers" && (
                        <div className="p-20 text-center bg-white border-2 border-dashed border-stone-100">
                             <p className="text-stone-400 italic font-serif">Promotions and seasonal offers module coming soon...</p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpenCategory} onClose={resetForm} title={isEditModeCategory ? "Update Category" : "New Category"}>
                <div className="space-y-6">
                    <Input
                        label="Category Name"
                        placeholder="e.g. Hot Coffees"
                        value={categoryName}
                        onChange={(value) => setCategoryName(value)}
                        icon={<FaTag />}
                        required
                    />

                    <div className="flex gap-4 pt-4">
                        <Button variant="secondary" className="flex-1" onClick={resetForm}>
                            Discard
                        </Button>
                        <Button variant="primary" className="flex-1" onClick={handleSubmitCategory} disabled={loading}>
                            {loading ? "Saving..." : (isEditModeCategory ? "Update Category" : "Add Category")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}