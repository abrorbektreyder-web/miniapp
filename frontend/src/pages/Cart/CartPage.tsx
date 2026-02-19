import { useNavigate } from 'react-router-dom';
import { useCart } from '@store/cartStore';
import { useTelegram } from '@hooks/useTelegram';
import Layout from '@components/Layout';
import BottomNav from '@components/BottomNav';
import MainButton from '@components/MainButton';
import { formatPrice } from '@utils/format';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totalAmount, incrementQuantity, decrementQuantity, removeItem, clearCart } = useCart();
  const { showAlert, showConfirm, hapticNotification } = useTelegram();

  const handleCheckout = async () => {
    const confirmed = await showConfirm('Buyurtma berishni tasdiqlaysizmi?');
    if (confirmed) {
      hapticNotification('success');
      showAlert('Buyurtmangiz qabul qilindi! Tez orada menejer siz bilan bog\'lanadi.');
      clearCart();
      navigate('/');
    }
  };

  if (items.length === 0) {
    return (
      <Layout className="pb-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <svg className="w-24 h-24 text-tg-hint mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl font-bold text-tg-text mb-2">Savatcha bo'sh</h2>
          <p className="text-tg-hint text-center mb-6">
            Xaridni boshlash uchun mahsulotlarni ko'ring
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-tg-button text-tg-button-text px-6 py-3 rounded-xl font-medium"
          >
            Bosh sahifaga
          </button>
        </div>
        <BottomNav />
      </Layout>
    );
  }

  return (
    <Layout className="pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-tg-bg z-40 safe-top border-b border-tg-section-separator">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-tg-text">Savatcha</h1>
          <p className="text-tg-hint text-sm mt-1">
            {items.length} ta mahsulot
          </p>
        </div>
      </header>

      {/* Cart Items */}
      <main className="p-4 space-y-3">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size || ''}-${item.color || ''}`}
            className="flex gap-3 bg-tg-secondary-bg rounded-xl p-3"
          >
            {/* Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-tg-bg">
              <img
                src={item.product.images?.[0]?.url || '/placeholder.jpg'}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-tg-text text-sm line-clamp-2">
                {item.product.name}
              </h3>
              
              {(item.size || item.color) && (
                <div className="flex gap-2 mt-1">
                  {item.size && (
                    <span className="text-xs text-tg-hint bg-tg-bg px-2 py-0.5 rounded">
                      {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="text-xs text-tg-hint bg-tg-bg px-2 py-0.5 rounded">
                      {item.color}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-tg-text">
                  {formatPrice(item.product.price)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item.product.id, item.size, item.color)}
                    className="w-7 h-7 rounded-full bg-tg-bg flex items-center justify-center text-tg-text hover:bg-tg-button hover:text-tg-button-text transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.product.id, item.size, item.color)}
                    className="w-7 h-7 rounded-full bg-tg-bg flex items-center justify-center text-tg-text hover:bg-tg-button hover:text-tg-button-text transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.product.id, item.size, item.color)}
              className="text-tg-hint hover:text-tg-destructive-text-color transition-colors self-start"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* Total */}
        <div className="bg-tg-secondary-bg rounded-xl p-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-tg-hint">Jami:</span>
            <span className="text-xl font-bold text-tg-text">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </main>

      {/* MainButton for checkout */}
      <MainButton
        text={`Buyurtma berish: ${formatPrice(totalAmount)}`}
        onClick={handleCheckout}
        color="var(--tg-theme-button-color)"
        textColor="var(--tg-theme-button-text-color)"
      />

      <BottomNav />
    </Layout>
  );
}
