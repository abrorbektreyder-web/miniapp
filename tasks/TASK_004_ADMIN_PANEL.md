# 📁 TASK 004: Admin Panel

**Bosqich:** 4 - Admin Panel  
**Muddat:** 2-3 kun  
**Prioritet:** ⭐⭐⭐⭐ (Muhim)

---

## 🎯 Maqsad

Admin panel yaratish orqali mahsulotlar, buyurtmalar va izohlarni boshqarish imkoniyatini ta'minlash.

---

## 📋 Tasklar ro'yxati

### 4.1. Admin Authentication
- [ ] Login sahifasi (`/admin/login`)
- [ ] Username + password input
- [ ] Form validation
- [ ] JWT token saqlash (localStorage/cookie)
- [ ] Protected route wrapper
- [ ] Logout funksiyasi
- [ ] Auto-logout (token expires)

### 4.2. Admin Layout
- [ ] `AdminLayout.tsx` - Sidebar + Header
- [ ] Sidebar navigation:
  - Dashboard
  - Mahsulotlar
  - Buyurtmalar
  - Izohlar
  - Sozlamalar
- [ ] Mobile responsive sidebar
- [ ] User dropdown menu
- [ ] Dark mode toggle

### 4.3. Dashboard sahifasi
- [ ] Statistika kartalari:
  - 📦 Jami mahsulotlar
  - 🛒 Jami buyurtmalar
  - 💰 Jami daromad (kun/hafta/oy)
  - ⭐ O'rtacha rating
- [ ] Chart/Graph (Recharts yoki Chart.js):
  - Daromad dinamikasi
  - Buyurtmalar soni
- [ ] Oxirgi buyurtmalar jadvali (5 ta)
- [ ] Eng ko'p sotilgan mahsulotlar (top 5)
- [ ] Tezkor harakatlar tugmalari

### 4.4. Products Management

#### Products List
- [ ] Jadval ko'rinishi
- [ ] Columns:
  - Rasm (thumbnail)
  - Nomi
  - Kategoriya
  - Narx
  - Rating
  - Holat (aktiv/nofaol)
  - Actions (edit, delete)
- [ ] Qidiruv (nom bo'yicha)
- [ ] Filter (kategoriya, holat)
- [ ] Sorting (nom, narx, sana)
- [ ] Pagination
- [ ] Bulk actions (ixtiyoriy)

#### Add/Edit Product Form
- [ ] Modal yoki alohida sahifa
- [ ] Form maydonlari:
  - Nomi (input)
  - Slug (auto-generate)
  - Tavsif (textarea/rich text)
  - Narx (number input)
  - Kategoriya (select dropdown)
  - O'lchamlar (checkbox group: S, M, L, XL, XXL)
  - Ranglar (color picker + nom input)
  - Rasmlar (drag & drop upload)
- [ ] Rasm yuklash:
  - Drag & drop zone
  - Preview
  - Rasm tartibini o'zgartirish (drag)
  - O'chirish tugmasi
  - Progress bar
- [ ] Aktiv/nofaol toggle
- [ ] Saqlash (create/update)
- [ ] Form validation
- [ ] Loading state

#### Product Delete
- [ ] Tasdiqlash modal
- [ ] O'chirish tugmasi
- [ ] Success notification

### 4.5. Categories Management
- [ ] Kategoriyalar ro'yxati (jadval)
- [ ] Yangi kategoriya qo'shish
- [ ] Tahrirlash
- [ ] O'chirish
- [ ] Slug auto-generate

### 4.6. Orders Management

#### Orders List
- [ ] Jadval ko'rinishi
- [ ] Columns:
  - Order ID
  - Foydalanuvchi
  - Mahsulotlar soni
  - Jami summa
  - Status (badge)
  - Sana
  - Actions
- [ ] Filter (status, sana)
- [ ] Qidiruv (user, ID)
- [ ] Sorting
- [ ] Pagination
- [ ] Export to CSV (ixtiyoriy)

#### Order Detail
- [ ] Alohida sahifa (`/admin/orders/:id`)
- [ ] Buyurtma ma'lumotlari:
  - Foydalanuvchi (ism, username, avatar)
  - Buyurtma sanasi
  - Mahsulotlar ro'yxati:
    - Rasm
    - Nomi
    - O'lcham/rang
    - Narxi
    - Soni
  - Jami summa
  - Status
  - Izoh (agar bor bo'lsa)
- [ ] Status o'zgartirish dropdown:
  - PENDING (Kutilmoqda)
  - CONFIRMED (Tasdiqlandi)
  - SHIPPED (Jo'natildi)
  - DELIVERED (Yetkazildi)
  - CANCELLED (Bekor qilindi)
- [ ] Status o'zgarishi sababi (ixtiyoriy)
- [ ] Saqlash tugmasi
- [ ] Buyurtmani o'chirish

### 4.7. Comments Management
- [ ] Izohlar ro'yxati (jadval)
- [ ] Columns:
  - Foydalanuvchi
  - Mahsulot
  - Rating (yulduzchalar)
  - Matn
  - Sana
  - Holat (ko'rsatilgan/yashirilgan)
  - Actions
- [ ] Filter (rating, holat, mahsulot)
- [ ] Qidiruv
- [ ] Izohni yashirish/ko'rsatish toggle
- [ ] Izohni o'chirish
- [ ] Spam belgilash

### 4.8. Settings Page
- [ ] Do'kon nomi (input)
- [ ] Do'kon logotipi (upload)
- [ ] Aloqa ma'lumotlari:
  - Telefon
  - Email
  - Manzil
- [ ] Yetkazib berish shartlari (textarea)
- [ ] Qaytarish siyosati (textarea)
- [ ] Ijtimoiy tarmoqlar links
- [ ] Saqlash tugmasi
- [ ] Success notification

### 4.9. UI Components (Admin)
- [ ] `DataTable.tsx` - Universal jadval
- [ ] `StatCard.tsx` - Statistika kartasi
- [ ] `StatusBadge.tsx` - Status badge
- [ ] `ImageUpload.tsx` - Rasm yuklash
- [ ] `ConfirmModal.tsx` - Tasdiqlash modali
- [ ] `SearchInput.tsx` - Qidiruv input
- [ ] `FilterDropdown.tsx` - Filter select

### 4.10. Notifications
- [ ] Toast notifications (react-hot-toast)
- [ ] Success messages
- [ ] Error messages
- [ ] Loading toasts
- [ ] Auto-dismiss

### 4.11. API Integration (Admin)
- [ ] `api/admin/products.ts`
- [ ] `api/admin/orders.ts`
- [ ] `api/admin/comments.ts`
- [ ] `api/admin/categories.ts`
- [ ] `api/admin/auth.ts`
- [ ] `api/admin/dashboard.ts`
- [ ] `api/admin/settings.ts`

### 4.12. State Management (Admin)
- [ ] `adminAuthStore.ts` - Admin auth state
- [ ] React Query for server state
- [ ] Optimistic updates

---

## ✅ Qabul qilish mezonlari

1. Admin login ishlaydi
2. Dashboard statistikasi to'g'ri
3. Mahsulot CRUD to'liq ishlaydi
4. Buyurtma statusini o'zgartirish ishlaydi
5. Izohlarni boshqarish ishlaydi
6. Rasm yuklash ishlaydi
7. Responsive dizayn
8. Protected routes ishlaydi

---

## 📦 Natijalar

- [ ] To'liq ishlaydigan Admin Panel
- [ ] Mahsulotlar boshqaruvi
- [ ] Buyurtmalar boshqaruvi
- [ ] Izohlar boshqaruvi
- [ ] Dashboard statistikasi

---

## 🎨 Admin Panel dizayni

- Professional va toza
- Sidebar navigation
- Data tables with sorting/filtering
- Modal forms
- Toast notifications
- Dark mode support

---

## 🧪 Test qilish

```bash
# Admin panelni ochish
http://localhost:5173/admin/login

# Default admin credentials (development)
Username: admin
Password: admin123
```

---

## 🔗 Foydali linklar

- [React Hot Toast](https://react-hot-toast.com/)
- [Recharts](https://recharts.org/)
- [React Table](https://tanstack.com/table/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
