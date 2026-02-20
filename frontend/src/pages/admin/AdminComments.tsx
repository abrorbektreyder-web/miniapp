import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminApi } from '../../api/adminClient';

export default function AdminComments() {
    const queryClient = useQueryClient();
    const [filterVisible, setFilterVisible] = useState<string>('');
    const [page, setPage] = useState(1);

    // Fetch comments
    const { data, isLoading } = useQuery({
        queryKey: ['admin-comments', page, filterVisible],
        queryFn: async () => {
            const response = await adminApi.comments.getAll({
                page,
                limit: 20,
                isVisible: filterVisible === '' ? undefined : filterVisible === 'true',
            });
            return response.data.data;
        },
    });

    // Toggle visibility mutation
    const toggleVisibilityMutation = useMutation({
        mutationFn: ({ id, isVisible }: { id: number; isVisible: boolean }) =>
            adminApi.comments.update(id, { isVisible }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (id: number) => adminApi.comments.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
        },
    });

    const handleToggleVisibility = async (id: number, currentVisibility: boolean) => {
        await toggleVisibilityMutation.mutateAsync({ id, isVisible: !currentVisibility });
    };

    const handleDelete = async (id: number) => {
        if (confirm("Izohni o'chirishni xohlaysizmi?")) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const comments = data?.items || data || [];
    const totalPages = data?.totalPages || 1;

    // Star rating renderer
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}>
                ★
            </span>
        ));
    };

    return (
        <AdminLayout title="Izohlar">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Izohlar</h1>
                    <p className="text-gray-500 mt-1">Foydalanuvchi izohlarini moderatsiya qiling</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => { setFilterVisible(''); setPage(1); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterVisible === ''
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Barchasi
                </button>
                <button
                    onClick={() => { setFilterVisible('true'); setPage(1); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterVisible === 'true'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    ✅ Ko'rinadigan
                </button>
                <button
                    onClick={() => { setFilterVisible('false'); setPage(1); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterVisible === 'false'
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    🚫 Yashirin
                </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
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
                ) : comments.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-gray-400 text-lg">Izohlar topilmadi</p>
                    </div>
                ) : (
                    comments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className={`bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow ${!comment.isVisible ? 'border-l-4 border-red-400 opacity-70' : 'border-l-4 border-green-400'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    {/* User & Product info */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="font-bold text-blue-600 text-sm">
                                                {(comment.user?.firstName?.[0] || comment.user?.username?.[0] || 'F').toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {comment.user?.firstName || comment.user?.username || `Foydalanuvchi #${comment.userId}`}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {comment.product?.name && (
                                                    <span className="text-blue-500">{comment.product.name}</span>
                                                )}
                                                {' • '}
                                                {new Date(comment.createdAt).toLocaleDateString('uz-UZ', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    {comment.rating > 0 && (
                                        <div className="flex items-center gap-1 mb-2">
                                            {renderStars(comment.rating)}
                                            <span className="text-sm text-gray-500 ml-1">({comment.rating}/5)</span>
                                        </div>
                                    )}

                                    {/* Comment Text */}
                                    <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleToggleVisibility(comment.id, comment.isVisible)}
                                        disabled={toggleVisibilityMutation.isPending}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${comment.isVisible
                                                ? 'text-orange-600 hover:bg-orange-50'
                                                : 'text-green-600 hover:bg-green-50'
                                            }`}
                                        title={comment.isVisible ? 'Yashirish' : "Ko'rsatish"}
                                    >
                                        {comment.isVisible ? '🚫 Yashirish' : '✅ Ko\'rsatish'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        disabled={deleteMutation.isPending}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm disabled:opacity-50"
                                    >
                                        🗑 O'chirish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors font-medium"
                    >
                        ← Oldingi
                    </button>
                    <span className="px-4 py-2 text-gray-600 font-medium">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors font-medium"
                    >
                        Keyingi →
                    </button>
                </div>
            )}
        </AdminLayout>
    );
}
