# 📋 TEXNIK TOPSHIRIQ (TZ)
## Kiyim-kechak do'koni uchun Telegram Mini App

---

## 1. LOYIHANING MAQSADI

Telegram platformasida ishlaydigan, kiyim-kechak do'koni uchun mo'ljallangan **Mini App** yaratish. Ilova orqali foydalanuvchilar mahsulotlarni ko'rish, narxlarni o'rganish, izohlar qoldirish va buyurtma berishlari mumkin.

---

## 2. LOYIHA TEXNOLOGIYALARI

### Frontend
| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| **React** | 18+ | UI komponentlar |
| **TypeScript** | 5+ | Type safety |
| **Telegram WebApp SDK** | 7.0+ | Telegram integratsiyasi |
| **Tailwind CSS** | 3+ | Responsive dizayn |
| **React Query** | 5+ | Server state management |
| **React Router** | 6+ | Navigatsiya |
| **Zustand** | 4+ | State management |

### Backend
| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| **Node.js** | 20+ | Runtime |
| **Express.js** | 4+ | Web framework |
| **PostgreSQL** | 15+ | Ma'lumotlar bazasi |
| **Prisma ORM** | 5+ | Database client |
| **JWT** | - | Autentifikatsiya |
| **Multer** | - | Fayl yuklash |
| **Sharp** | - | Rasm optimizatsiya |

### Infrastruktura
| Xizmat | Maqsad |
|--------|--------|
| **Vercel / Netlify** | Frontend hosting |
| **Railway / Render** | Backend hosting |
| **Supabase / Neon** | PostgreSQL database |
| **Cloudflare R2 / AWS S3** | Rasm saqlash |

---

## 3. FUNKSIONAL TALABLAR

### 3.1. Foydalanuvchi paneli (Client Side)

#### 🏠 Bosh sahifa (Main Page)
- [ ] Telegram tema ranglariga moslashuvchan dizayn (light/dark mode)
- [ ] Mahsulotlar grid ko'rinishida (2-3 ustun mobil)
- [ ] Har bir mahsulot kartasi:
  - Rasm (slider yoki asosiy rasm)
  - Nomi
  - Narxi (so'mda)
  - Reyting (yulduzchalar)
  - "Batafsil" tugmasi
- [ ] Kategoriya filtri (erkaklar, ayollar, bolalar, aksessuarlar)
- [ ] Qidiruv funksiyasi
- [ ] Narx bo'yicha filtrlash
- [ ] Telegram MainButton integratsiyasi (Savatga qo'shish)

#### 📦 Mahsulot batafsil sahifasi
- [ ] Rasm galereyasi (swipe bilan)
- [ ] Mahsulot nomi va narxi
- [ ] Tavsif (o'lcham, rang, material)
- [ ] O'lcham tanlash (S, M, L, XL, XXL)
- [ ] Rang tanlash (color picker)
- [ ] Izohlar bo'limi
- [ ] Izoh qoldirish formasi
- [ ] "Savatga qo'shish" tugmasi
- [ ] Telegram BackButton navigatsiyasi

#### 💬 Izohlar tizimi
- [ ] Izoh qoldirish (matn + rating 1-5 yulduz)
- [ ] Izohlarni saralash (yangi, eski, yuqori rating)
- [ ] Foydalanuvchi ismi va Telegram avataridan olish
- [ ] Izohni tahrirlash (faqat o'z izohi)
- [ ] Izohni o'chirish (faqat o'z izohi)

#### 🛒 Savatcha (Cart)
- [ ] Tanlangan mahsulotlar ro'yxati
- [ ] Har bir mahsulot uchun:
  - Rasm
  - Nomi
  - O'lcham/rang
  - Narxi
  - Soni (+/- tugmalari)
  - O'chirish tugmasi
- [ ] Jami summa hisoblash
- [ ] "Buyurtma berish" tugmasi (Telegram MainButton)
- [ ] Savatchani tozalash

#### 👤 Profil sahifasi
- [ ] Telegram'dan foydalanuvchi ma'lumotlari:
  - Ism
  - Avatar
  - Username
- [ ] Buyurtmalar tarixi
- [ ] Sevimli mahsulotlar
- [ ] Sozlamalar

### 3.2. Admin panel (Admin Side)

#### 🔐 Autentifikatsiya
- [ ] Admin login/parol
- [ ] JWT token autentifikatsiya
- [ ] Session muddati (7 kun)
- [ ] Faqat ro'yxatdan o'tgan adminlar kirishi mumkin

#### 📊 Admin Dashboard
- [ ] Statistika:
  - Jami mahsulotlar soni
  - Jami buyurtmalar
  - Jami daromad (oy/hafta/kun)
  - Eng ko'p sotilgan mahsulotlar
- [ ] Oxirgi buyurtmalar ro'yxati
- [ ] Tezkor harakatlar tugmalari

#### 🛍 Mahsulotlar boshqaruvi

**Mahsulot qo'shish:**
- [ ] Nomi (input)
- [ ] Tavsif (textarea)
- [ ] Narxi (number input)
- [ ] Kategoriya tanlash (dropdown)
- [ ] O'lchamlar (checkbox: S, M, L, XL, XXL)
- [ ] Ranglar (color picker + nom)
- [ ] Rasmlar yuklash (drag & drop, max 5 ta)
- [ ] Rasm tartibini o'zgartirish
- [ ] Aktiv/nofaol holati (toggle)
- [ ] Saqlash tugmasi

**Mahsulotlar ro'yxati:**
- [ ] Jadval ko'rinishi
- [ ] Rasm, nom, narx, kategoriya
- [ ] Holat (aktiv/nofaol)
- [ ] Tahrirlash tugmasi
- [ ] O'chirish tugmasi (tasdiqlash bilan)
- [ ] Qidiruv va filtrlar

**Mahsulot tahrirlash:**
- [ ] Barcha maydonlarni o'zgartirish
- [ ] Yangi rasm qo'shish
- [ ] Eski rasmni o'chirish
- [ ] O'zgarishlarni saqlash

#### 💬 Izohlar boshqaruvi
- [ ] Barcha izohlar ro'yxati
- [ ] Foydalanuvchi, mahsulot, matn, rating
- [ ] Izohni o'chirish
- [ ] Izohni yashirish/ko'rsatish
- [ ] Spam belgilash

#### 📦 Buyurtmalar boshqaruvi
- [ ] Buyurtmalar ro'yxati (jadval)
- [ ] Buyurtma detallari:
  - Foydalanuvchi ma'lumotlari
  - Mahsulotlar ro'yxati
  - Jami summa
  - Holat (yangi, tasdiqlangan, jo'natildi, yetkazildi)
  - Izoh
- [ ] Holatni o'zgartirish
- [ ] Buyurtmani o'chirish
- [ ] PDF chek generatsiya (ixtiyoriy)

#### ⚙️ Sozlamalar
- [ ] Do'kon nomi
- [ ] Do'kon logotipi
- [ ] Aloqa ma'lumotlari
- [ ] Yetkazib berish shartlari
- [ ] Qaytarish siyosati

---

## 4. TELEGRAM INTEGRATSIYASI

### 4.1. WebApp SDK sozlamalari

```html
<!-- index.html -->
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

### 4.2. Asosiy integratsiya nuqtalari

| Funksiya | Telegram WebApp metodi |
|----------|------------------------|
| Tema ranglari | `Telegram.WebApp.themeParams` |
| MainButton | `Telegram.WebApp.MainButton` |
| BackButton | `Telegram.WebApp.BackButton` |
| Foydalanuvchi ma'lumotlari | `Telegram.WebApp.initDataUnsafe.user` |
| Haptic feedback | `Telegram.WebApp.HapticFeedback` |
| Popup oyna | `Telegram.WebApp.showPopup()` |
| Confirm | `Telegram.WebApp.showConfirm()` |
| Alert | `Telegram.WebApp.showAlert()` |
| Yopish tasdig'i | `Telegram.WebApp.enableClosingConfirmation()` |

### 4.3. Bot sozlamalari (@BotFather)

1. **Yangi bot yaratish:**
   ```
   /newbot
   ```

2. **Mini App ulash:**
   ```
   /newapp
   ```

3. **Menu button sozlash:**
   ```
   /setmenubutton
   ```

4. **Direct link:**
   ```
   https://t.me/yourbot/appname
   ```

### 4.4. InitData validatsiyasi (Backend)

```typescript
// utils/validateTelegramData.ts
import crypto from 'crypto';

export function validateInitData(initData: string, botToken: string): boolean {
  const secretKey = crypto
    .createHmac('sha256', botToken)
    .update('WebAppData')
    .digest();

  const data = new URLSearchParams(initData);
  const hash = data.get('hash');
  data.delete('hash');

  const dataCheckString = Array.from(data.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return computedHash === hash;
}
```

---

## 5. MA'LUMOTLAR BAZASI SHEMASI

```prisma
// schema.prisma

model User {
  id        Int      @id @default(autoincrement())
  telegramId BigInt   @unique
  username   String?
  firstName  String?
  lastName  String?
  photoUrl   String?
  comments   Comment[]
  orders     Order[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Category {
  id          Int        @id @default(autoincrement())
  name        String
  slug        String     @unique
  description String?
  products    Product[]
  createdAt   DateTime   @default(now())
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  slug        String   @unique
  description String?
  price       Int      // so'mda
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  sizes       ProductSize[]
  colors      ProductColor[]
  rating      Float    @default(0)
  isActive    Boolean  @default(true)
  comments    Comment[]
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ProductImage {
  id        Int     @id @default(autoincrement())
  url       String
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  order     Int     @default(0)
}

model ProductSize {
  id        Int     @id @default(autoincrement())
  size      String  // S, M, L, XL, XXL
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model ProductColor {
  id        Int     @id @default(autoincrement())
  name      String
  hexCode   String  // #RRGGBB
  productId Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Comment {
  id        Int      @id @default(autoincrement())
  text      String
  rating    Int      // 1-5
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  productId Int
  product   Product  @relation(fields: [productId], references: [id])
  isVisible Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Order {
  id         Int         @id @default(autoincrement())
  userId     Int
  user       User        @relation(fields: [userId], references: [id])
  items      OrderItem[]
  totalAmount Int
  status     OrderStatus @default(PENDING)
  comment    String?
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id])
  productId Int
  product   Product @relation(fields: [productId], references: [id])
  size      String?
  color     String?
  quantity  Int
  price     Int     // o'sha paytdagi narx
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

model Admin {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String   // hashed
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

---

## 6. API ENDPOINTS

### 6.1. Public endpoints (Auth talab qilmaydi)

```
GET  /api/products              - Mahsulotlar ro'yxati
GET  /api/products/:slug        - Mahsulot detallari
GET  /api/categories            - Kategoriyalar ro'yxati
GET  /api/products/:id/comments - Mahsulot izohlari
```

### 6.2. Protected endpoints (Telegram initData bilan)

```
POST /api/comments              - Izoh qoldirish
PUT  /api/comments/:id          - Izohni tahrirlash
DELETE /api/comments/:id        - Izohni o'chirish
POST /api/orders                - Buyurtma yaratish
GET  /api/orders                - O'z buyurtmalari
GET  /api/orders/:id            - Buyurtma detallari
GET  /api/me                    - O'z profili
```

### 6.3. Admin endpoints (JWT bilan)

```
# Auth
POST /api/admin/login           - Admin login
POST /api/admin/logout          - Admin logout
GET  /api/admin/me              - Admin ma'lumotlari

# Dashboard
GET  /api/admin/dashboard       - Dashboard statistikasi

# Products
GET    /api/admin/products      - Mahsulotlar ro'yxati
POST   /api/admin/products      - Mahsulot qo'sshish
GET    /api/admin/products/:id  - Mahsulot detallari
PUT    /api/admin/products/:id  - Mahsulot tahrirlash
DELETE /api/admin/products/:id  - Mahsulot o'chirish

# Images
POST   /api/admin/upload        - Rasm yuklash
DELETE /api/admin/images/:id    - Rasm o'chirish

# Categories
GET    /api/admin/categories    - Kategoriyalar
POST   /api/admin/categories    - Kategoriya qo'shish
PUT    /api/admin/categories/:id
DELETE /api/admin/categories/:id

# Comments
GET    /api/admin/comments      - Barcha izohlar
PUT    /api/admin/comments/:id  - Izohni tahrirlash/yashirish
DELETE /api/admin/comments/:id  - Izohni o'chirish

# Orders
GET    /api/admin/orders        - Buyurtmalar ro'yxati
GET    /api/admin/orders/:id    - Buyurtma detallari
PUT    /api/admin/orders/:id    - Holatni o'zgartirish
DELETE /api/admin/orders/:id    - Buyurtmani o'chirish

# Settings
GET    /api/admin/settings      - Sozlamalar
PUT    /api/admin/settings      - Sozlamalarni o'zgartirish
```

---

## 7. DIZAYN TALABLARI

### 7.1. Telegram tema integratsiyasi

```css
/* CSS variables from Telegram theme */
:root {
  --tg-theme-bg-color: #ffffff;
  --tg-theme-text-color: #000000;
  --tg-theme-hint-color: #999999;
  --tg-theme-link-color: #2481cc;
  --tg-theme-button-color: #2481cc;
  --tg-theme-button-text-color: #ffffff;
  --tg-theme-secondary-bg-color: #f0f0f0;
  --tg-theme-header-bg-color: #ffffff;
  --tg-theme-bottom-bar-bg-color: #ffffff;
}

/* Dark mode avtomatik */
@media (prefers-color-scheme: dark) {
  :root {
    --tg-theme-bg-color: #1c1c1d;
    --tg-theme-text-color: #ffffff;
    --tg-theme-hint-color: #98989d;
    --tg-theme-secondary-bg-color: #2c2c2e;
  }
}
```

### 7.2. UI Komponentlar

- **Mahsulot kartasi**: Minimal, toza, rasm markazda
- **Tugmalar**: Telegram ranglariga mos (button_color)
- **Grid**: Mobil 2 ustun, Desktop 4 ustun
- **Typography**: Telegram font oilasi (-apple-system, Roboto)
- **Spacing**: 8px grid sistema

### 7.3. Animatsiyalar

- Page transitions: 200ms ease
- Button press: scale(0.98)
- Loading skeleton: pulse animation
- Haptic feedback: Telegram HapticFeedback API

---

## 8. LOYIHA TUZILISHI

```
telegram-mini-app/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGallery/
│   │   │   ├── Comments/
│   │   │   ├── Cart/
│   │   │   ├── MainButton/
│   │   │   └── Layout/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── ProductDetail/
│   │   │   ├── Cart/
│   │   │   ├── Profile/
│   │   │   └── admin/
│   │   ├── hooks/
│   │   │   ├── useTelegram.ts
│   │   │   ├── useProducts.ts
│   │   │   └── useCart.ts
│   │   ├── store/
│   │   │   ├── cartStore.ts
│   │   │   └── userStore.ts
│   │   ├── api/
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── comments.ts
│   │   ├── utils/
│   │   │   ├── telegram.ts
│   │   │   └── format.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── commentController.ts
│   │   │   └── adminController.ts
│   │   ├── routes/
│   │   │   ├── productRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   └── adminRoutes.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── telegramAuth.ts
│   │   │   └── upload.ts
│   │   ├── services/
│   │   │   ├── productService.ts
│   │   │   └── telegramService.ts
│   │   ├── utils/
│   │   │   └── validateTelegramData.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── index.ts
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md
└── docker-compose.yml
```

---

## 9. XAVFSIZLIK TALABLARI

1. **InitData validatsiyasi**: Har bir so'rovda serverda tekshirish
2. **JWT token**: Admin panel uchun
3. **Rate limiting**: API abuse oldini olish
4. **CORS**: Faqat ishonchli domenlar
5. **Helmet.js**: HTTP security headers
6. **Input sanitization**: XSS oldini olish
7. **SQL injection**: Prisma ORM orqali himoya
8. **File upload**: Faqat rasm formatlari, max 5MB
9. **HTTPS**: Production muhitda majburiy

---

## 10. PERFORMANCE TALABLARI

| Ko'rsatkich | Maqsad |
|-------------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse score | > 90 |
| API response time | < 200ms |
| Image optimization | WebP format, lazy loading |

---

## 11. TEST QISMI

### Frontend tests
```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e
```

### Backend tests
```bash
# API tests
npm run test:api

# Integration tests
npm run test:integration
```

---

## 12. DEPLOYMENT

### Frontend (Vercel)
```bash
vercel deploy --prod
```

### Backend (Railway)
```bash
railway up
```

### Database (Neon/Supabase)
- Connection string .env da
- Prisma migrate: `npx prisma migrate deploy`

---

## 13. LOYIHA BOSQICHLARI

### Bosqich 1: Setup (1-2 kun)
- [ ] Repo yaratish
- [ ] Frontend backend setup
- [ ] Database schema yaratish
- [ ] Telegram bot sozlash

### Bosqich 2: Backend API (3-4 kun)
- [ ] Auth middleware
- [ ] Product CRUD
- [ ] Order CRUD
- [ ] Comment CRUD
- [ ] Admin endpoints

### Bosqich 3: Frontend Client (4-5 kun)
- [ ] Layout komponentlar
- [ ] Home page
- [ ] Product detail page
- [ ] Cart funksional
- [ ] Telegram integratsiya

### Bosqich 4: Admin Panel (2-3 kun)
- [ ] Admin login
- [ ] Dashboard
- [ ] Product management
- [ ] Order management

### Bosqich 5: Testing & Polish (2 kun)
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] UX improvements

### Bosqich 6: Deployment (1 kun)
- [ ] Production deploy
- [ ] Domain ulash
- [ ] Final testing

---

## 14. .ENV EXAMPLE

```env
# Backend
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
TELEGRAM_BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
PORT=3000
NODE_ENV=production

# Frontend
VITE_API_URL="https://api.yourdomain.com"
VITE_TELEGRAM_BOT_USERNAME="yourbot"

# Storage (optional)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="..."
AWS_REGION="auto"
```

---

## 15. QO'SHIMCHA ESLATMALAR

1. **Mobil birinchi**: Dizayn avvalo mobil qurilmalar uchun
2. **Offline support**: Service Worker bilan caching
3. **Analytics**: Google Analytics yoki Telegram analytics
4. **Error tracking**: Sentry integratsiyasi
5. **Logging**: Winston/Morgan backend da
6. **Backup**: Kunlik database backup

---

## ✅ XULOSA

Ushbu texnik topshiriq **professional darajadagi** Telegram Mini App yaratish uchun barcha kerakli ma'lumotlarni o'z ichiga oladi:

- ✅ To'liq funksional kiyim-kechak do'koni
- ✅ Admin panel bilan boshqaruv
- ✅ Telegram bilan to'liq integratsiya
- ✅ Zamonaviy texnologiyalar
- ✅ Xavfsizlik talablari
- ✅ Performance optimizatsiyasi

**Keyingi qadam:** Loyihani boshlash uchun frontend va backend repozitoriylarini yaratish va birinchi bosqichdan boshlash.
