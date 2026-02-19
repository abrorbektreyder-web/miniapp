# 🚀 Telegram Mini App - Kiyim Do'koni

Telegram platformasida ishlaydigan professional kiyim-kechak do'koni Mini App.

## 📚 Hujjatlar

- [Texnik Topshiriq (TZ)](docs/TECHNICAL_SPECIFICATION.md)
- [Loyiha Qoidalari](.qwen/qoidalari.md)

## 📋 Tasklar

| # | Task | Fayl | Branch | Status |
|---|------|------|--------|--------|
| 001 | Loyihani sozlash | [TASK_001_SETUP.md](tasks/TASK_001_SETUP.md) | `task-001` | 🔄 In Progress |
| 002 | Backend API | [TASK_002_BACKEND_API.md](tasks/TASK_002_BACKEND_API.md) | `task-002` | ⏳ Pending |
| 003 | Frontend Client | [TASK_003_FRONTEND_CLIENT.md](tasks/TASK_003_FRONTEND_CLIENT.md) | `task-003` | ⏳ Pending |
| 004 | Admin Panel | [TASK_004_ADMIN_PANEL.md](tasks/TASK_004_ADMIN_PANEL.md) | `task-004` | ⏳ Pending |
| 005 | Testing | [TASK_005_TESTING.md](tasks/TASK_005_TESTING.md) | `task-005` | ⏳ Pending |
| 006 | Deployment | [TASK_006_DEPLOYMENT.md](tasks/TASK_006_DEPLOYMENT.md) | `task-006` | ⏳ Pending |

## 🏗 Loyiha Tuzilishi

```
telegram-mini-app/
├── docs/                    # Hujjatlar
│   └── TECHNICAL_SPECIFICATION.md
├── tasks/                   # Task fayllari
│   ├── TASK_001_SETUP.md
│   ├── TASK_002_BACKEND_API.md
│   ├── TASK_003_FRONTEND_CLIENT.md
│   ├── TASK_004_ADMIN_PANEL.md
│   ├── TASK_005_TESTING.md
│   └── TASK_006_DEPLOYMENT.md
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── types/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── .qwen/
│   └── qoidalari.md        # Loyiha qoidalari
├── .gitignore
├── README.md
└── docker-compose.yml
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

### 4. Docker bilan (alternativa)

```bash
docker-compose up -d
```

## 📞 Telegram Bot Sozlash

1. **@BotFather** ga kiring
2. `/newbot` - Yangi bot yaratish
3. `/newapp` - Mini App yaratish
4. Web App URL ni sozlash

## 📝 Muhim Eslatmalar

- ⚠️ `.env` fayllarini **hech qachon** commit qilmang
- 🔐 Bot tokenlarni maxfiy saqlang
- 📋 Har bir task alohida branchda bajariladi
- ✅ Task fayllaridagi talablarga qat'iy rioya qiling

## 📄 Litsenziya

MIT

---

**Loyiha qoidalari:** [.qwen/qoidalari.md](.qwen/qoidalari.md)
