import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi } from '../../api/adminClient';

export default function AdminCategories() {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    // Fetch categories
    const { data, isLoading } = useQuery({
        queryKey: ['admin-categories'],
        queryFn: async () => {
            const response = await adminApi.categories.getAll();
            return response.data.data;
        },
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: (data: { name: string; description?: string }) =>
            adminApi.categories.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            resetForm();
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: { name: string; description?: string } }) =>
            adminApi.categories.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            resetForm();
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id: number) => adminApi.categories.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
        },
    });

    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setEditingCategory(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        if (editingCategory) {
            await updateMutation.mutateAsync({
                id: editingCategory.id,
                data: { name: formData.name, description: formData.description || undefined },
            });
        } else {
            await createMutation.mutateAsync({
                name: formData.name,
                description: formData.description || undefined,
            });
        }
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setFormData({ name: category.name, description: category.description || '' });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Kategoriyani o'chirishni xohlaysizmi?")) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const categories = Array.isArray(data) ? data : data?.items || [];

    return (
        <AdminLayout title="Kategoriyalar">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kategoriyalar</h1>
                    <p className="text-gray-500 mt-1">Mahsulot kategoriyalarini boshqaring</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Yangi kategoriya
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-2 border-blue-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        {editingCategory ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya qo\'shish'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategoriya nomi *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Masalan: Erkaklar kiyimi"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tavsif
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Kategoriya tavsifi..."
                                rows={3}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg"
                            >
                                {createMutation.isPending || updateMutation.isPending ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Saqlanmoqda...
                                    </span>
                                ) : editingCategory ? (
                                    'Saqlash'
                                ) : (
                                    'Qo\'shish'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories Grid */}
            {isLoading ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-400">
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Yuklanmoqda...
                    </div>
                </div>
            ) : categories.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className="text-gray-400 text-lg mb-4">Kategoriyalar topilmadi</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
                    >
                        Birinchi kategoriyani qo'shing
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category: any) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🏷️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {category._count?.products ?? 0} ta mahsulot
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {category.description && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                            )}

                            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-medium text-sm text-center"
                                >
                                    ✏️ Tahrirlash
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    disabled={deleteMutation.isPending}
                                    className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm text-center disabled:opacity-50"
                                >
                                    🗑 O'chirish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
