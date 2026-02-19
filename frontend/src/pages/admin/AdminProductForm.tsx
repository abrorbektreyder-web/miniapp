import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/adminClient';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    sizes: [] as string[],
    colors: [] as { name: string; hexCode: string }[],
    images: [] as { url: string; order: number }[],
    isActive: true,
  });

  // Fetch product for edit
  const { data: productData } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: async () => {
      const response = await adminApi.products.getById(Number(id));
      return response.data.data;
    },
    enabled: isEdit,
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const response = await adminApi.categories.getAll();
      return response.data.data;
    },
  });

  // Populate form for edit
  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price?.toString() || '',
        categoryId: productData.categoryId?.toString() || '',
        sizes: productData.sizes?.map((s: any) => s.size) || [],
        colors: productData.colors?.map((c: any) => ({ name: c.name, hexCode: c.hexCode })) || [],
        images: productData.images?.map((img: any) => ({ url: img.url, order: img.order })) || [],
        isActive: productData.isActive ?? true,
      });
    }
  }, [productData]);

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const data = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
      };
      if (isEdit) {
        return adminApi.products.update(Number(id), data);
      } else {
        return adminApi.products.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      navigate('/admin/products');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Mahsulot nomini kiriting');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      alert('Narxni to\'g\'ri kiriting');
      return;
    }
    if (!formData.categoryId) {
      alert('Kategoriyani tanlang');
      return;
    }

    mutation.mutate();
  };

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: '', hexCode: '#000000' }],
    }));
  };

  const updateColor = (index: number, field: 'name' | 'hexCode', value: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  };

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  return (
    <AdminLayout title={isEdit ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}>
      <div className="max-w-4xl">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                📝
              </span>
              Asosiy ma'lumotlar
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomi *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masalan: Erkaklar futbolkasi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tavsif
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Mahsulot haqida ma'lumot..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Narx (so'm) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="50000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriya *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Tanlang...</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Aktiv (saytda ko'rsatish)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                🖼️
              </span>
              Rasmlar
            </h2>
            <ImageUpload
              onUpload={(urls) => setFormData({ ...formData, images: urls })}
              existingImages={formData.images}
            />
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                📏
              </span>
              O'lchamlar
            </h2>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
                  🎨
                </span>
                Ranglar
              </h2>
              <button
                type="button"
                onClick={addColor}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Qo'shish
              </button>
            </div>
            <div className="space-y-3">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <input
                    type="color"
                    value={color.hexCode}
                    onChange={(e) => updateColor(index, 'hexCode', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => updateColor(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Rang nomi (masalan: Qora)"
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              {formData.colors.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  Ranglar qo'shilmagan
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-blue-500 text-white font-medium py-3 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {mutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
