import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../../api/queryClient';
import { useTelegram } from '../../hooks/useTelegram';
import { formatRelativeTime } from '../../utils/format';

interface CommentsProps {
  productId: number;
}

export default function Comments({ productId }: CommentsProps) {
  const { user, showAlert, hapticNotification } = useTelegram();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch comments
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.products.comments(productId),
    queryFn: async () => {
      const response = await api.products.getComments(productId, { sortBy });
      return response.data.data;
    },
  });

  // Create comment mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await api.comments.create({ productId, text, rating });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.comments(productId) });
      setText('');
      setRating(5);
      hapticNotification?.('success');
      showAlert?.('Izohingiz qoldirildi!');
    },
    onError: (error: any) => {
      showAlert?.(error.response?.data?.error?.message || 'Xatolik yuz berdi');
    },
  });

  // Delete comment mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.comments.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.comments(productId) });
      hapticNotification?.('success');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      showAlert?.('Izoh matnini kiriting');
      return;
    }
    createMutation.mutate();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Izohni o\'chirishni xohlaysizmi?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const comments = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Comments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-tg-text">
            Izohlar ({data?.total || 0})
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-tg-secondary-bg text-tg-text text-sm rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="newest">Yangi</option>
            <option value="oldest">Eski</option>
            <option value="rating_high">Yuqori rating</option>
            <option value="rating_low">Past rating</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-tg-hint">Yuklanmoqda...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-tg-hint">
            Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment: any) => {
              const isOwnComment = user?.id === comment.user?.telegramId;

              return (
                <div
                  key={comment.id}
                  className="bg-tg-secondary-bg rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-tg-button text-tg-button-text flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {comment.user?.firstName?.[0] || '?'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-tg-text">
                            {comment.user?.firstName || 'Noma\'lum'}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={i < comment.rating ? 'text-yellow-500' : 'text-tg-hint'}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-tg-hint">
                              {formatRelativeTime(comment.createdAt)}
                            </span>
                          </div>
                        </div>

                        {isOwnComment && (
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-tg-hint hover:text-tg-destructive-text-color transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <p className="text-tg-text mt-2 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="bg-tg-secondary-bg rounded-xl p-4">
        <h4 className="font-medium text-tg-text mb-3">Izoh qoldirish</h4>

        {/* Rating */}
        <div className="mb-3">
          <label className="text-sm text-tg-hint mb-2 block">Rating:</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform ${
                  star <= rating ? 'text-yellow-500 scale-110' : 'text-tg-hint'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Izohingizni yozing..."
            rows={3}
            className="w-full bg-tg-bg text-tg-text rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tg-button mb-3"
          />
          <button
            type="submit"
            disabled={createMutation.isPending || !text.trim()}
            className="w-full bg-tg-button text-tg-button-text font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createMutation.isPending ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
      </div>
    </div>
  );
}
