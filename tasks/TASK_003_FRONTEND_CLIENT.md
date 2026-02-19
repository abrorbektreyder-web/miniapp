# 📁 TASK 003: Frontend Client qismi

**Bosqich:** 3 - Frontend Development  
**Muddat:** 4-5 kun  
**Prioritet:** ⭐⭐⭐⭐⭐ (Juda muhim)

---

## 🎯 Maqsad

Telegram Mini App uchun foydalanuvchi interfeysini yaratish, barcha sahifalar va komponentlarni ishlab chiqish va Telegram SDK bilan integratsiya qilish.

---

## 📋 Tasklar ro'yxati

### 3.1. Telegram SDK integratsiyasi
- [ ] `useTelegram.ts` hook yaratish
- [ ] `Telegram.WebApp` initialize qilish
- [ ] Theme params olish va qo'llash
- [ ] `initDataUnsafe` dan user ma'lumotlarini olish
- [ ] `WebApp.ready()` chaqirish
- [ ] Type definitions yaratish (`types/telegram.ts`)

### 3.2. Layout komponentlar
- [ ] `Layout.tsx` - Asosiy layout
- [ ] `Header.tsx` - Header qismi
- [ ] `BottomNav.tsx` - Pastki navigatsiya (Home, Cart, Profile)
- [ ] `Loading.tsx` - Loading spinner/skeleton
- [ ] `ErrorBoundary.tsx` - Xatoliklarni ushlash

### 3.3. Telegram UI komponentlar
- [ ] `MainButton.tsx` - Telegram MainButton wrapper
- [ ] `BackButton.tsx` - Telegram BackButton wrapper
- [ ] `Popup.tsx` - Telegram popup wrapper
- [ ] `HapticFeedback.ts` - Haptic feedback utiliti

### 3.4. Home Page (Bosh sahifa)
- [ ] Mahsulotlar grid ko'rinishi
- [ ] Kategoriya filtri (tabs/chips)
- [ ] Qidiruv input
- [ ] Narx filtri (slider yoki range)
- [ ] Sorting (arzon, qimmat, rating)
- [ ] Pagination/Infinite scroll
- [ ] Empty state (mahsulot yo'q bo'lsa)

### 3.5. ProductCard komponenti
- [ ] Rasm (lazy loading)
- [ ] Mahsulot nomi
- [ ] Narx (so'mda, formatlash)
- [ ] Rating (yulduzchalar)
- [ ] "Batafsil" tugmasi
- [ ] Hover/active effektlar
- [ ] Skeleton loading state

### 3.6. Product Detail Page
- [ ] `ProductGallery.tsx` - Rasm galereyasi (swipe)
- [ ] Mahsulot nomi va narxi
- [ ] Tavsif (accordion yoki expandable)
- [ ] O'lcham tanlash (S, M, L, XL, XXL)
- [ ] Rang tanlash (color circles)
- [ ] Soni tanlash (+/-)
- [ ] "Savatga qo'shish" tugmasi
- [ ] Related products (o'xshash mahsulotlar)

### 3.7. Comments komponenti
- [ ] Izohlar ro'yxati
- [ ] Har bir izoh:
  - User avatar + ism
  - Rating (yulduzchalar)
  - Matn
  - Sana
  - Tahrirlash/O'chirish (faqat o'zi)
- [ ] Izoh qoldirish formasi:
  - Rating input (1-5 yulduz)
  - Textarea
  - Yuborish tugmasi
- [ ] Pagination
- [ ] Empty state

### 3.8. Cart Page (Savatcha)
- [ ] Savatchadagi mahsulotlar ro'yxati
- [ ] Har bir item:
  - Rasm
  - Nomi
  - O'lcham/rang
  - Narxi
  - Soni (+/- tugmalari)
  - O'chirish tugmasi
- [ ] Jami summa
- [ ] "Buyurtma berish" tugmasi (MainButton)
- [ ] Empty cart state
- [ ] Savatchani tozalash

### 3.9. Cart State Management (Zustand)
- [ ] `cartStore.ts` yaratish
- [ ] Add to cart funksiyasi
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Clear cart
- [ ] Total hisoblash
- [ ] LocalStorage persist

### 3.10. Checkout formasi
- [ ] Buyurtma detallari ko'rish
- [ ] Yetkazib berish manzili (ixtiyoriy)
- [ ] Izoh qoldirish (optional comment)
- [ ] Telegram Contact ulash (telefon raqam)
- [ ] Tasdiqlash popup
- [ ] Buyurtma muvaffaqiyati sahifasi

### 3.11. Profile Page
- [ ] User ma'lumotlari (Telegram'dan):
  - Avatar
  - Ism
  - Username
- [ ] Buyurtmalar tarixi
- [ ] Har bir buyurtma:
  - Status badge
  - Sana
  - Jami summa
  - Detallarni ko'rish
- [ ] Sevimli mahsulotlar (ixtiyoriy)
- [ ] Sozlamalar (theme, language)
- [ ] Chiqish tugmasi

### 3.12. State Management
- [ ] `userStore.ts` - User ma'lumotlari
- [ ] `productStore.ts` - Product state (ixtiyoriy)
- [ ] `uiStore.ts` - UI state (modal, loading)
- [ ] React Query sozlash:
  - API client
  - Query keys
  - Cache time
  - Retry logic

### 3.13. API Client
- [ ] `api/client.ts` - Axios instance
- [ ] Request interceptor (initData qo'shish)
- [ ] Response interceptor (error handling)
- [ ] API functions:
  - `products.ts`
  - `orders.ts`
  - `comments.ts`
  - `user.ts`

### 3.14. Routing
- [ ] React Router sozlash
- [ ] Routes:
  - `/` - Home
  - `/product/:slug` - Product detail
  - `/cart` - Cart
  - `/profile` - Profile
  - `/orders/:id` - Order detail
- [ ] Protected routes
- [ ] Navigate funksiyalari

### 3.15. Theme & Styling
- [ ] Telegram theme CSS variables
- [ ] Dark mode support
- [ ] Responsive dizayn (mobile-first)
- [ ] Tailwind config
- [ ] Custom fonts
- [ ] Animatsiyalar (Framer Motion yoki CSS)

### 3.16. Utilities
- [ ] `formatPrice.ts` - Narxni formatlash (10 000 so'm)
- [ ] `formatDate.ts` - Sanani formatlash
- [ ] `validators.ts` - Form validation
- [ ] `constants.ts` - Constants (sizes, colors)

### 3.17. Types
- [ ] `types/index.ts` - Umumiy types
- [ ] `types/product.ts` - Product types
- [ ] `types/order.ts` - Order types
- [ ] `types/user.ts` - User types
- [ ] `types/api.ts` - API response types

---

## ✅ Qabul qilish mezonlari

1. Barcha sahifalar ishlaydi
2. Telegram theme integratsiyasi to'g'ri
3. MainButton va BackButton ishlaydi
4. Savatcha funksional to'liq
5. Izoh qoldirish ishlaydi
6. Responsive dizayn
7. Loading va error states bor

---

## 📦 Natijalar

- [ ] To'liq ishlaydigan Frontend
- [ ] Telegram integratsiyasi
- [ ] Savatcha tizimi
- [ ] Izoh tizimi
- [ ] Profile sahifasi

---

## 🎨 Dizayn talablari

- Minimal va toza dizayn
- Telegram ranglariga mos
- Mobil birinchi (mobile-first)
- Smooth animatsiyalar
- Accessibility (a11y)

---

## 🧪 Test qilish

```bash
# Development server
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

---

## 🔗 Foydali linklar

- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
