# 📁 TASK 001: Loyihani sozlash (Setup)

**Bosqich:** 1 - Setup  
**Muddat:** 1-2 kun  
**Prioritet:** ⭐⭐⭐⭐⭐ (Juda muhim)

---

## 🎯 Maqsad

Loyiha uchun frontend va backend muhitini tayyorlash, kerakli kutubxonalarni o'rnatish va Telegram botni sozlash.

---

## 📋 Tasklar ro'yxati

### 1.1. Repository yaratish
- [ ] GitHub/GitLab da yangi repo ochish
- [ ] `.gitignore` faylini qo'shish
- [ ] `README.md` faylini yaratish
- [ ] Loyiha litsenziyasini tanlash (MIT recommended)

### 1.2. Frontend setup
- [ ] Vite + React + TypeScript loyihasini yaratish
- [ ] Kerakli dependency'larni o'rnatish:
  ```bash
  npm install react-router-dom zustand @tanstack/react-query axios
  npm install -D tailwindcss postcss autoprefixer
  ```
- [ ] Tailwind CSS ni sozlash (`tailwind.config.js`)
- [ ] Telegram WebApp SDK ni ulash
- [ ] ESLint va Prettier ni sozlash
- [ ] Husky va lint-staged ni o'rnatish (git hooks)

### 1.3. Backend setup
- [ ] Node.js + Express + TypeScript loyihasini yaratish
- [ ] Kerakli dependency'larni o'rnatish:
  ```bash
  npm install express cors helmet dotenv jsonwebtoken bcryptjs multer sharp
  npm install -D @types/express @types/node @types/cors @types/multer ts-node nodemon
  ```
- [ ] Prisma ORM ni o'rnatish va sozlash
- [ ] PostgreSQL database ulash
- [ ] `.env.example` faylini yaratish
- [ ] TypeScript konfiguratsiyasini sozlash (`tsconfig.json`)

### 1.4. Database schema yaratish
- [ ] `schema.prisma` faylini yaratish
- [ ] Barcha modellarni yozish:
  - User
  - Category
  - Product
  - ProductImage
  - ProductSize
  - ProductColor
  - Comment
  - Order
  - OrderItem
  - Admin
- [ ] Migration yaratish va bazani ishga tushirish:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```

### 1.5. Telegram bot sozlash
- [ ] @BotFather orqali yangi bot yaratish (`/newbot`)
- [ ] Bot token ni olish va `.env` ga saqlash
- [ ] Mini App yaratish (`/newapp`)
- [ ] Web App URL ni sozlash (Vercel/Netlify deploy link)
- [ ] Menu button sozlash (`/setmenubutton`)
- [ ] Bot username va nomini to'g'irlash

### 1.6. Folder struktura yaratish
- [ ] Frontend folder strukturasini yaratish:
  ```
  frontend/src/
  ├── components/
  ├── pages/
  ├── hooks/
  ├── store/
  ├── api/
  ├── utils/
  ├── types/
  └── assets/
  ```
- [ ] Backend folder strukturasini yaratish:
  ```
  backend/src/
  ├── controllers/
  ├── routes/
  ├── middleware/
  ├── services/
  ├── utils/
  ├── prisma/
  └── types/
  ```

### 1.7. Docker sozlash (ixtiyoriy)
- [ ] `docker-compose.yml` yaratish
- [ ] PostgreSQL container sozlash
- [ ] Backend container sozlash
- [ ] Development environment tayyorlash

---

## ✅ Qabul qilish mezonlari (Acceptance Criteria)

1. Frontend loyihasi ishga tushadi: `npm run dev`
2. Backend loyihasi ishga tushadi: `npm run dev`
3. Database migration muvaffaqiyatli bajarildi
4. Telegram bot yaratildi va Mini App URL ulandi
5. `.env` fayllari to'g'ri sozlangan
6. Git hooks ishlayapti (pre-commit linting)

---

## 📦 Natijalar

- [ ] Ishlaydigan frontend shablon
- [ ] Ishlaydigan backend shablon
- [ ] Database schema yaratilgan
- [ ] Telegram bot tayyor
- [ ] Development environment tayyor

---

## 🔗 Foydali linklar

- [Telegram BotFather](https://t.me/botfather)
- [Telegram WebApp Docs](https://core.telegram.org/bots/webapps)
- [Vite + React](https://vitejs.dev/guide/)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

## 📝 Eslatmalar

- Bot tokenni hech qachon GitHub ga commit qilmang!
- Development va production `.env` fayllarini alohida saqlang
- Database URL ni maxfiy saqlang (Supabase/Neon recommended)
