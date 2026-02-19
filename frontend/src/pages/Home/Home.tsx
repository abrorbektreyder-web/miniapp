import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '../../api/queryClient';
import Layout from '../../components/Layout';
import BottomNav from '../../components/BottomNav';
import ProductCard from '../../components/ProductCard';
import Loading from '../../components/Loading';
import type { Category } from '../../types/index';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: async () => {
      const response = await api.categories.getAll();
      return response.data.data;
    },
  });

  const categories: Category[] = categoriesData || [];

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: queryKeys.products.list({
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    }),
    queryFn: async () => {
      const response = await api.products.getAll({
        category: selectedCategory || undefined,
        search: searchQuery || undefined,
      });
      return response.data.data;
    },
  });

  const products = productsData?.items || [];

  return (
    <Layout className="pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-tg-bg z-40 safe-top">
        <div className="p-4 border-b border-tg-section-separator">
          <h1 className="text-2xl font-bold text-tg-text mb-3">Kiyim Do'koni</h1>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-tg-secondary-bg text-tg-text placeholder-tg-hint rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-tg-button"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tg-hint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-2 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-tg-button text-tg-button-text'
                  : 'bg-tg-secondary-bg text-tg-hint hover:text-tg-text'
              }`}
            >
              Barchasi
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-tg-button text-tg-button-text'
                    : 'bg-tg-secondary-bg text-tg-hint hover:text-tg-text'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="p-4">
        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-tg-hint">Mahsulotlar topilmadi</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </Layout>
  );
}
