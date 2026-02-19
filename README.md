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

1. **@BotFather** ga kiring
2. `/newbot` - Yangi bot yaratish
3. `/newapp` - Mini App yaratish
4. Web App URL ni Vercel linkiga o'zgartirish
5. `/setmenubutton` - Menu button sozlash

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
