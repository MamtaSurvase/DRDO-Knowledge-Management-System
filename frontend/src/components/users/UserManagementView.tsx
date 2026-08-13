import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Users, Shield, Lock, CheckCircle2, AlertTriangle, Key, Edit, Search, Trash2 } from 'lucide-react';
import { ClearanceLevel, UserRole, User } from '../../types';

export const UserManagementView: React.FC = () => {
  const { users, drdoLabs, updateUserClearance, updateUser, deleteUser, currentUser } = useApp();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [newClearance, setNewClearance] = useState<ClearanceLevel>('LEVEL_3_SECRET');
  const [search, setSearch] = useState('');

  const handleUpdateClearance = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUserClearance(selectedUser.id, newClearance);
      setSelectedUser(null);
    }
  };

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        clearance: editingUser.clearance,
        designation: editingUser.designation,
        department: editingUser.department,
        drdoLab: editingUser.drdoLab,
        status: editingUser.status
      });
      setEditingUser(null);
    }
  };

  const handleDeleteUserConfirm = () => {
    if (deletingUser) {
      deleteUser(deletingUser.id);
      setDeletingUser(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.drdoLab.toLowerCase().includes(search.toLowerCase()) ||
    u.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.25 }}
      className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans text-slate-900 dark:text-slate-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            DRDO User Access & RBAC Clearance Control
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage military officers, laboratory curators, and analyst clearance levels across DRDO clusters.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search officers, labs, designations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 border border-transparent"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[10px] font-mono">
              <tr>
                <th className="p-4">Personnel</th>
                <th className="p-4">DRDO Lab</th>
                <th className="p-4">Role</th>
                <th className="p-4">Clearance Level</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-700 dark:text-slate-300">{u.drdoLab}</td>
                  <td className="p-4">
                    <span className="capitalize font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-bold">
                      {u.clearance.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${
                      u.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" /> {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingUser(u)}
                        title="Edit User Details"
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-bold text-xs rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer transition"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setNewClearance(u.clearance);
                        }}
                        title="Modify Security Clearance"
                        className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs rounded border border-amber-200 dark:border-amber-800 flex items-center gap-1 cursor-pointer transition"
                      >
                        <Shield className="w-3.5 h-3.5" /> Clearance
                      </button>
                      <button
                        onClick={() => setDeletingUser(u)}
                        title="Delete User"
                        className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 font-bold text-xs rounded border border-rose-200 dark:border-rose-900/50 flex items-center gap-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CLEARANCE */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Elevate / Mutate Security Clearance
            </h3>
            <p className="text-xs text-slate-500">
              User: <strong className="text-slate-900 dark:text-white">{selectedUser.name}</strong> ({selectedUser.drdoLab})
            </p>

            <form onSubmit={handleUpdateClearance} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">New Clearance Level</label>
                <select
                  value={newClearance}
                  onChange={e => setNewClearance(e.target.value as ClearanceLevel)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                >
                  <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                  <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                  <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                  <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 border rounded-lg text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Confirm Clearance Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit User Profile & Permissions</h3>
              </div>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text" required 
                  value={editingUser.name} 
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Email Address</label>
                <input 
                  type="email" required 
                  value={editingUser.email} 
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Assigned Role</label>
                  <select 
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="end_user">end_user</option>
                    <option value="knowledge_admin">knowledge_admin</option>
                    <option value="super_admin">super_admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Clearance Level</label>
                  <select 
                    value={editingUser.clearance}
                    onChange={e => setEditingUser({ ...editingUser, clearance: e.target.value as ClearanceLevel })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="LEVEL_1_RESTRICTED">LEVEL 1 RESTRICTED</option>
                    <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 CONFIDENTIAL</option>
                    <option value="LEVEL_3_SECRET">LEVEL 3 SECRET</option>
                    <option value="LEVEL_4_TOP_SECRET">LEVEL 4 TOP SECRET</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">DRDO Laboratory</label>
                  <select 
                    value={editingUser.drdoLab}
                    onChange={e => setEditingUser({ ...editingUser, drdoLab: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  >
                    {drdoLabs.map(lab => (
                      <option key={lab.id} value={lab.name}>{lab.name} ({lab.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Account Status</label>
                  <select 
                    value={editingUser.status}
                    onChange={e => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                    <option value="PENDING_VERIFICATION">PENDING_VERIFICATION</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Designation</label>
                  <input 
                    type="text" 
                    value={editingUser.designation} 
                    onChange={e => setEditingUser({ ...editingUser, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-slate-700 dark:text-slate-300">Department</label>
                  <input 
                    type="text" 
                    value={editingUser.department} 
                    onChange={e => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE USER CONFIRMATION */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-100 dark:bg-rose-950/80">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Delete User Account</h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Irreversible Administrative Action</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs font-mono">
              <p className="text-slate-900 dark:text-white font-bold">{deletingUser.name}</p>
              <p className="text-slate-500">{deletingUser.email}</p>
              <p className="text-slate-400">{deletingUser.drdoLab} • {deletingUser.role}</p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to purge <strong>{deletingUser.name}</strong> from the STRATOS system? Their active sessions will be terminated and clearance revoked immediately.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={() => setDeletingUser(null)} 
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleDeleteUserConfirm} 
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Delete User</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
