import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaUserPlus, FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import { Table } from "../../components/mini_components/Table";
import { Button } from "../../components/mini_components/Button";
import { Modal } from "../../components/mini_components/Modal";
import Input from "../../components/mini_components/Input";
import { Select } from "../../components/mini_components/Select";
import { 
  getAllUsers, 
  saveUser, 
  updateUser, 
  deleteUser, 
  toggleUserStatus 
} from "../../service/auth";
import { showAlert } from "../../components/mini_components/Swail";

export default function AdminUserManage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "CUSTOMER",
    status: "ACTIVE"
  });

  // Filter States
  const [activeRole, setActiveRole] = useState("ALL");
  const [activeStatus, setActiveStatus] = useState("ALL");

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getAllUsers(page, 20, activeRole, activeStatus);
      setUsers(res.data);
      setPagination(res.pagination);
      setStats(res.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [activeRole, activeStatus]);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      contactNumber: "",
      role: "CUSTOMER",
      status: "ACTIVE"
    });
    setSelectedUserId(null);
    setIsEditMode(false);
  };

  // Create or Update Submit
  const handleSubmit = async () => {
    if (!formData.fullname || !formData.email || (!isEditMode && !formData.password)) {
      showAlert({ icon: "warning", title: "Please fill required fields" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        roles: [formData.role],
        approved: formData.status
      };

      if (isEditMode && selectedUserId) {
        await updateUser(selectedUserId, payload);
        showAlert({ icon: "success", title: "User updated successfully!" });
      } else {
        await saveUser(payload);
        showAlert({ icon: "success", title: "User created successfully!" });
      }
      setIsModalOpen(false);
      resetForm();
      fetchData(pagination.page);
    } catch (error: any) {
      showAlert({ icon: "error", title: error.response?.data?.message || "Action failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (u: any) => {
    setIsEditMode(true);
    setSelectedUserId(u._id);
    setFormData({
      fullname: u.fullname,
      email: u.email,
      password: "", // Security reason: don't show old password
      contactNumber: u.contactNumber.toString(),
      role: u.roles[0],
      status: u.approved
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const res = await showAlert({
      icon: "warning",
      title: "Delete User?",
      text: "This user will be removed permanently!",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete"
    });

    if (res.isConfirmed) {
      try {
        await deleteUser(id);
        showAlert({ icon: "success", title: "User deleted!" });
        fetchData(pagination.page);
      } catch (err) {
        showAlert({ icon: "error", title: "Delete failed" });
      }
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleUserStatus(id);
      fetchData(pagination.page);
    } catch (err) {
      showAlert({ icon: "error", title: "Status toggle failed" });
    }
  };

  const FilterButton = ({ label, count, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full font-bold transition-all flex items-center shadow-sm ${
        isActive ? "bg-[#4a6741] text-white" : "bg-white text-[#4a6741] hover:bg-[#f0f9f4]"
      }`}
    >
      {label}
      <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-[#4a6741]/10 text-[#4a6741]"}`}>
        {count || 0}
      </span>
    </button>
  );

  return (
    <div className="animate-fade-in p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3e2723]">User Management</h1>
          <p className="text-stone-500 italic">Manage your staff and customers across AROMISTA.</p>
        </div>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <FaUserPlus /> Add New User
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        <FilterButton label="All Users" count={stats.all} isActive={activeRole === "ALL" && activeStatus === "ALL"} onClick={() => {setActiveRole("ALL"); setActiveStatus("ALL")}} />
        <FilterButton label="Customers" count={stats.customerCount} isActive={activeRole === "CUSTOMER"} onClick={() => setActiveRole("CUSTOMER")} />
        <FilterButton label="Staff" count={stats.staffCount} isActive={activeRole !== "CUSTOMER" && activeRole !== "ALL"} onClick={() => setActiveRole("BARISTOR")} />
        <FilterButton label="Active" count={stats.activeCount} isActive={activeStatus === "ACTIVE"} onClick={() => setActiveStatus("ACTIVE")} />
        <FilterButton label="Inactive" count={stats.inactiveCount} isActive={activeStatus === "INACTIVE"} onClick={() => setActiveStatus("INACTIVE")} />
      </div>

      <Table headers={["User Details", "Contact", "Role", "Time", "Status", "Actions"]}>
        {loading && users.length === 0 ? (
          <tr><td colSpan={6} className="py-20 text-center text-stone-400">Brewing data...</td></tr>
        ) : (
          users.map((u) => (
            <tr key={u._id} className="hover:bg-stone-50/50 border-b border-stone-50 group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eaddcf] flex items-center justify-center font-bold text-[#3e2723] uppercase">{u.fullname.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-[#3e2723]">{u.fullname}</p>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1"><FaEnvelope size={10}/> {u.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-stone-600 font-medium"><FaPhone className="inline mr-2 opacity-30"/>{u.contactNumber}</td>
              <td className="px-6 py-4 text-center">
                 <span className="px-3 py-1 bg-stone-100 text-[#4a6741] text-[10px] font-black rounded-md uppercase tracking-tighter flex items-center justify-center gap-1 mx-auto w-fit">
                   <FaShieldAlt size={10}/> {u.roles[0]}
                 </span>
              </td>
              
              <td className="px-6 py-4 text-[10px] font-medium text-stone-500">
                <div className="flex flex-col gap-0.5">
                   <span className="opacity-60 italic">Created: {new Date(u.createdAt).toLocaleDateString()}</span>
                   <span className="opacity-60 italic">Updated: {new Date(u.updatedAt).toLocaleDateString()}</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <button 
                  onClick={() => handleToggle(u._id)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all mx-auto flex items-center gap-2 ${u.approved === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${u.approved === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                  {u.approved}
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                 <div className="flex gap-2 justify-center">
                    <button onClick={() => handleEditClick(u)} className="p-2 text-stone-400 hover:text-[#bc8a5f] transition-all"><FaEdit/></button>
                    <button onClick={() => handleDelete(u._id)} className="p-2 text-stone-400 hover:text-red-500 transition-all"><FaTrashAlt/></button>
                 </div>
              </td>
            </tr>
          ))
        )}
      </Table>

      {/* Pagination Controls කලින් පරිදිම... */}
      <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-3xl border border-stone-100 shadow-sm font-sans">
        <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Page {pagination.page} of {pagination.pages} ({pagination.total} Users)</p>
        <div className="flex gap-2">
           <button disabled={pagination.page === 1} onClick={() => fetchData(pagination.page - 1)} className="px-5 py-2 bg-stone-50 rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-stone-100 transition-all">Previous</button>
           <button disabled={pagination.page === pagination.pages} onClick={() => fetchData(pagination.page + 1)} className="px-5 py-2 bg-stone-50 rounded-xl text-xs font-bold disabled:opacity-30 hover:bg-stone-100 transition-all">Next</button>
        </div>
      </div>

      {/* User Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); resetForm(); }} 
        title={isEditMode ? "Update User Details" : "Register New Staff/Member"}
      >
        <div className="space-y-5">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            value={formData.fullname} 
            onChange={(val) => setFormData({...formData, fullname: val})} 
            required
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            value={formData.email} 
            onChange={(val) => setFormData({...formData, email: val})} 
            required
          />
          {!isEditMode && (
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={(val) => setFormData({...formData, password: val})} 
              required
            />
          )}
          <Input 
            label="Contact Number" 
            placeholder="0771234567" 
            value={formData.contactNumber} 
            onChange={(val) => setFormData({...formData, contactNumber: val})} 
          />
          
          <div className="flex gap-4">
            <Select 
              label="Assign Role" 
              value={formData.role} 
              onChange={(val: any) => setFormData({...formData, role: val})} 
              options={[
                { label: "Customer", value: "CUSTOMER" },
                { label: "Barista", value: "BARISTOR" },
                { label: "Cashier", value: "CASHIER" },
                { label: "Manager", value: "MANAGER" },
                { label: "Admin", value: "ADMIN" }
              ]} 
            />
            <Select 
              label="Account Status" 
              value={formData.status} 
              onChange={(val: any) => setFormData({...formData, status: val})} 
              options={[
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" }
              ]} 
            />
          </div>

          <div className="pt-4 flex gap-3">
             <Button variant="secondary" className="flex-1" onClick={() => { setIsModalOpen(false); resetForm(); }}>Cancel</Button>
             <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : (isEditMode ? "Update User" : "Create Account")}
             </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}