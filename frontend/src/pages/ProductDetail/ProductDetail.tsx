import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '../../api/queryClient';
import { useCart } from '../../store/cartStore';
import { useTelegram } from '../../hooks/useTelegram';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import MainButton from '../../components/MainButton';
import Comments from '../../components/Comments/Comments';
import { formatPrice } from '../../utils/format';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { hapticImpact, showAlert } = useTelegram();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'comments'>('description');

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.products.detail(slug!),
    queryFn: async () => {
      const response = await api.products.getBySlug(slug!);
      return response.data.data;
    },
    enabled: !!slug,
  });

  const product = data;

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize && product.sizes?.length > 0) {
      showAlert?.('O\'lchamni tanlang!');
      return;
    }

    if (!selectedColor && product.colors?.length > 0) {
      showAlert?.('Rangni tanlang!');
      return;
    }

    hapticImpact?.('medium');
    addItem(product, selectedSize || undefined, selectedColor || undefined, quantity);
    showAlert?.('Mahsulot savatchaga qo\'shildi!');
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-tg-hint">Yuklanmoqda...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-tg-hint">Mahsulot topilmadi</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="pb-20">
      <BackButton />

      {/* Images */}
      <div className="bg-tg-secondary-bg">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images?.[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail strip */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {product.images.map((img: any, index: number) => (
              <button
                key={index}
                onClick={() => {}}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  index === 0 ? 'border-tg-button' : 'border-transparent'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-4">
        {/* Title & Price */}
        <div>
          <h1 className="text-2xl font-bold text-tg-text mb-2">{product.name}</h1>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-tg-button">
              {formatPrice(product.price)}
            </span>
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-tg-text font-medium">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-tg-hint mb-2">O'lcham:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: any) => (
                <button
                  key={size.id}
                  onClick={() => {
                    setSelectedSize(size.size);
                    hapticImpact?.('light');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSize === size.size
                      ? 'bg-tg-button text-tg-button-text'
                      : 'bg-tg-secondary-bg text-tg-text'
                  }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-tg-hint mb-2">Rang:</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color: any) => (
                <button
                  key={color.id}
                  onClick={() => {
                    setSelectedColor(color.hexCode);
                    hapticImpact?.('light');
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    selectedColor === color.hexCode
                      ? 'ring-2 ring-tg-button ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                >
                  <span
                    className={`text-sm font-medium ${
                      parseInt(color.hexCode.slice(1), 16) > 0xffffff / 2
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  >
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <h3 className="text-sm font-medium text-tg-hint mb-2">Soni:</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  hapticImpact?.('light');
                }
              }}
              className="w-10 h-10 rounded-lg bg-tg-secondary-bg flex items-center justify-center text-tg-text text-xl font-bold hover:bg-tg-button hover:text-tg-button-text transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-bold text-tg-text">{quantity}</span>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
                hapticImpact?.('light');
              }}
              className="w-10 h-10 rounded-lg bg-tg-secondary-bg flex items-center justify-center text-tg-text text-xl font-bold hover:bg-tg-button hover:text-tg-button-text transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-tg-section-separator">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'description'
                ? 'text-tg-button border-b-2 border-tg-button'
                : 'text-tg-hint'
            }`}
          >
            Tavsif
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'comments'
                ? 'text-tg-button border-b-2 border-tg-button'
                : 'text-tg-hint'
            }`}
          >
            Izohlar ({product.comments?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' ? (
          <div className="text-tg-text whitespace-pre-wrap">
            {product.description || 'Tavsif mavjud emas.'}
          </div>
        ) : (
          <Comments productId={product.id} />
        )}
      </div>

      {/* MainButton */}
      <MainButton
        text={`Savatga: ${formatPrice(product.price * quantity)}`}
        onClick={handleAddToCart}
        isVisible={true}
        isActive={true}
      />
    </Layout>
  );
}
