# 👕 Telegram Mini App - Kiyim-kechak Do'koni

Telegram platformasida ishlaydigan professional kiyim-kechak do'koni Mini App.

## 📋 Loyiha Haqida

Ushbu loyiha Telegram Mini App sifatida ishlaydi va quyidagi imkoniyatlarni taqdim etadi:

- 🛍 Mahsulotlarni ko'rish va buyurtma qilish
- 💬 Izohlar qoldirish
- 🛒 Savatcha tizimi
- 👤 Foydalanuvchi profili
- 🔐 Admin panel (mahsulotlar, buyurtmalar, izohlar boshqaruvi)

## 📚 Hujjatlar

| Fayl | Tavsif |
|------|--------|
| [docs/TECHNICAL_SPECIFICATION.md](docs/TECHNICAL_SPECIFICATION.md) | To'liq Texnik Topshiriq (TZ) |
| [tasks/](tasks/) | Barcha tasklar ro'yxati |
| [.qwen/qoidalari.md](.qwen/qoidalari.md) | Loyiha qoidalari |

## 📋 Tasklar

| # | Task | Fayl | Branch | Status |
|---|------|------|--------|--------|
| 001 | Loyihani sozlash | [TASK_001_SETUP.md](tasks/TASK_001_SETUP.md) | `task-001` | ✅ Completed |
| 002 | Backend API | [TASK_002_BACKEND_API.md](tasks/TASK_002_BACKEND_API.md) | `task-002` | ✅ Completed |
| 003 | Frontend Client | [TASK_003_FRONTEND_CLIENT.md](tasks/TASK_003_FRONTEND_CLIENT.md) | `task-003` | ✅ Completed |
| 004 | Admin Panel | [TASK_004_ADMIN_PANEL.md](tasks/TASK_004_ADMIN_PANEL.md) | `task-004` | ✅ Completed |
| 005 | Testing | [TASK_005_TESTING.md](tasks/TASK_005_TESTING.md) | `task-005` | ✅ Completed |
| 006 | Deployment | [TASK_006_DEPLOYMENT.md](tasks/TASK_006_DEPLOYMENT.md) | `task-006` | ✅ Completed |

## 🚀 Quick Start

### 1. Repository clone qilish

```bash
git clone <repository-url>
cd telegram-mini-app
```

### 2. Frontend sozlash

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Backend sozlash

```bash
cd backend
npm install
cp .env.example .env
# Database URL ni .env da o'zgartiring
npx prisma migrate dev
npm run dev
```

### 4. Docker bilan

```bash
docker-compose up -d
```

## 🛠 Texnologiyalar

### Frontend
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Telegram WebApp SDK** - Telegram integratsiyasi
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Server state
- **React Router** - Navigation
- **Vite** - Build tool

### Backend
- **Node.js 20+** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database client
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer + Sharp** - File upload & optimization

### Infrastruktura
- **Docker** - Containerization
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **Neon/Supabase** - PostgreSQL

## 📦 Deployment

### Frontend (Vercel)

1. Vercel da account yarating
2. GitHub repo ni import qiling
3. Frontend papkani tanlang
4. Environment variables ni sozlang:
   - `VITE_API_URL`
   - `VITE_TELEGRAM_BOT_USERNAME`
5. Deploy tugmasini bosing

### Backend (Railway)

1. Railway da account yarating
2. GitHub repo ni import qiling
3. Backend papkani tanlang
4. Environment variables ni sozlang:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `TELEGRAM_BOT_TOKEN`
   - `PORT`
   - `NODE_ENV`
   - `CORS_ORIGIN`
5. Deploy tugmasini bosing

### Database (Neon)

1. Neon da account yarating
2. Yangi database yarating
3. Connection URL ni oling
4. `DATABASE_URL` environment variable ga qo'shing

## 📞 Telegram Bot Sozlash

### Tezkor sozlash (Windows)

```bash
setup-telegram.bat
```

### Tezkor sozlash (Linux/Mac)

```bash
chmod +x setup-telegram.sh
./setup-telegram.sh
```

### Batafsil qo'llanma

[TELEGRAM_SETUP.md](TELEGRAM_SETUP.md) faylida to'liq yo'riqnoma mavjud.

#### 1. Telegram bot yaratish

1. **@BotFather** ga kiring: https://t.me/botfather
2. `/newbot` buyrug'ini yuboring
3. Bot nomini kiriting (masalan: `Kiyim Do'koni`)
4. Bot username kiriting (`yourshop_bot`)
5. Token oling va `backend/.env` ga qo'shing:
   ```env
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```

#### 2. HTTPS Tunnel (ngrok)

```bash
# ngrok o'rnatish
npm install -g ngrok

# Frontend uchun tunnel
ngrok http 5173
```

Natijada `https://xxxx.ngrok.io` URL olasiz.

#### 3. Mini App yaratish

1. @BotFather da `/newapp`
2. Botni tanlang
3. ngrok URL ni kiriting
4. Short name kiriting (`shop`)

**Natija:** `https://t.me/yourshop_bot/shop`

---

## 🧪 Test Qilish

### Frontend
```bash
cd frontend
npm test
npm run test:coverage
```

### Backend
```bash
cd backend
npm test
npm run test:coverage
```

## 📝 Muhim Eslatmalar

- ⚠️ `.env` fayllarini **hech qachon** commit qilmang
- 🔐 Bot tokenlarni maxfiy saqlang
- 📋 Har bir task alohida branchda bajariladi
- ✅ Task fayllaridagi talablarga qat'iy rioya qiling

## 📄 Litsenziya

MIT

---

**Loyiha qoidalari:** [.qwen/qoidalari.md](.qwen/qoidalari.md)
