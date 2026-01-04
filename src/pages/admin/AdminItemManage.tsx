import React, { useEffect, useState } from "react";
import { FaCoffee, FaTag, FaPlus, FaEdit, FaTrashAlt, FaCamera, FaTimes } from "react-icons/fa";
import { Button } from "../../components/mini_components/Button";
import Input from "../../components/mini_components/Input";
import { Modal } from "../../components/mini_components/Modal";
import { Select, Textarea } from "../../components/mini_components/Select";
import { itemCreate, getAllItems, detactiveOrActiveItem, deleteItem, updateItem } from "../../service/item";
import { Table } from "../../components/mini_components/Table";
import { showAlert } from "../../components/mini_components/Swail";
import { getAllCategories } from "../../service/category";

export default function AdminItemManage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([]);

    // item form states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Beverage");
    const [image, setImage] = useState<File | null>(null);
    const [postPreview, setPostPreview] = useState<string | null>(null);
    const [categoriesList, setCategoriesList] = useState<any[]>([]);

    const handleToggleStatus = async (id: string) => {
        try {
            await detactiveOrActiveItem(id);
            fetchItems();
            showAlert({ icon: "success", title: "Item status updated successfully" });
        } catch (error: any) {
            showAlert({ icon: "error", title: error.response?.data?.message || "Status toggle failed" });
        }
    };

    const handleDelete = async (id: string) => {
        const confirm = await showAlert({
            icon: "warning",
            title: "Are you sure?",
            text: "This action cannot be undone.",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });
        if (confirm.isConfirmed) {
            try {
                await deleteItem(id);
                fetchItems();
                showAlert({ icon: "success", title: "Item deleted successfully" });
            } catch (error) {
                showAlert({ icon: "error", title: "Failed to delete item" });
            }
        }
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPostPreview(URL.createObjectURL(file));
        }
    };

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await getAllItems();
            setItems(res.items || []);
        } catch (error) {
            showAlert({ icon: "error", title: "Failed to fetch items" });
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCategories = async () => {
    try {
        const res = await getAllCategories();
        const formattedCategories = res.categories.map((cat: any) => ({
            label: cat.categoryName,
            value: cat.categoryName
        }));
        setCategoriesList(formattedCategories);
        
        if (formattedCategories.length > 0 && !category) {
            setCategory(formattedCategories[0].value);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

    useEffect(() => {
        fetchItems();
        fetchAllCategories();
    }, []);

    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        if (categoriesList.length > 0) {
            setCategory(categoriesList[0].value);
        }
        setImage(null);
        setPostPreview(null);
    };

    const handleEditClick = (item: any) => {
        setIsEditMode(true);
        setSelectedItemId(item._id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price.toString());
        setCategory(item.category);
        setPostPreview(item.imageUrl);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {

        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        try {
            if (isEditMode && selectedItemId) {
                await updateItem(selectedItemId, formData);
            } else {
                await itemCreate(formData);
            }
            setIsModalOpen(false);
            fetchItems();
        } catch (error) { 
            showAlert({ icon: "error", title: "Failed to add or update item" });
        } finally { 
            setLoading(false); 
        }
    };

    return (
        <div className="animate-fade-in pb-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#3e2723]">Item Management</h1>
                    <p className="text-stone-500 italic">Manage your coffee shop's artisan menu.</p>
                </div>
                <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <FaPlus className="mr-2" /> Add New Item
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <Table headers={["Item Details", "Category", "Price", "Status", "Actions"]}>
                    {items.map((item) => (
                        <tr key={item._id} className="hover:bg-stone-50/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.imageUrl || "https://via.placeholder.com/100"}
                                        className=" object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                                        alt={item.name}
                                    />
                                    <div>
                                        <p className="font-bold text-[#3e2723]">{item.name}</p>
                                        <p className="text-[10px] text-stone-400 font-medium lowercase italic">
                                            {item.category}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-stone-600 font-medium">
                                {item.category}
                            </td>

                            <td className="px-6 py-4 font-bold text-[#5c6d47]">
                                Rs. {item.price.toFixed(2)}
                            </td>

                            <td className="px-6 py-4 text-center">
                                <button 
                                    onClick={() => handleToggleStatus(item._id)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center gap-2 mx-auto ${
                                        item.availability === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${item.availability === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                                    {item.availability}
                                </button>
                            </td>

                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button onClick={() => handleEditClick(item)} className="p-2 text-stone-400 hover:text-[#bc8a5f]"><FaEdit size={18} /></button>
                                    <button onClick={() => handleDelete(item._id)} className="p-2 text-stone-400 hover:text-red-500"><FaTrashAlt size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add / Edit Item">
                <div className="space-y-6 max-h-[75vh] overflow-y-auto px-2 custom-scrollbar">
                    <Input
                        label="Item Name"
                        placeholder="e.g. Arabica Dark Roast"
                        value={name}
                        onChange={(val) => setName(val)}
                        icon={<FaCoffee />}
                        required
                    />

                    <div className="flex gap-4">
                        <Input
                            label="Price (LKR)"
                            type="number"
                            placeholder="850"
                            value={price}
                            onChange={(val) => setPrice(val)}
                            icon={<FaTag />}
                            required
                        />
                        <Select
                            label="Category"
                            value={category}
                            onChange={(val: string) => setCategory(val)}
                            options={categoriesList}
                        />
                    </div>

                    <Textarea
                        label="Description"
                        placeholder="Describe the flavor profile..."
                        value={description}
                        onChange={(val: string) => setDescription(val)}
                    />

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">
                            Item Image Content
                        </label>
                        <div className="relative group w-full bg-gray-50 overflow-hidden border-2 border-dashed border-gray-200 transition-all hover:border-[#4a6741]">
                            <div className="aspect-video flex items-center justify-center relative">
                                {postPreview ? (
                                    <img src={postPreview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <FaCamera size={30} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Select Image</p>
                                    </div>
                                )}
                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                                        {postPreview ? "Replace Image" : "Upload Image"}
                                    </span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                            {postPreview && (
                                <button
                                    type="button"
                                    onClick={() => { setImage(null); setPostPreview(null); }}
                                    className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full hover:bg-red-500"
                                >
                                    <FaTimes size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 pb-2">
                        <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)} >
                            Discard
                        </Button>
                        <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={loading} >
                            {loading ? "Adding..." : "Add to Menu"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}