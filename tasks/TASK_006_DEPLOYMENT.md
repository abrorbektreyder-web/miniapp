# 📁 TASK 006: Deployment

**Bosqich:** 6 - Deployment  
**Muddat:** 1 kun  
**Prioritet:** ⭐⭐⭐⭐⭐ (Juda muhim)

---

## 🎯 Maqsad

Loyihani production muhitga joylashtirish, Telegram botga ulash va final testing o'tkazish.

---

## 📋 Tasklar ro'yxati

### 6.1. Frontend Deployment (Vercel)

#### Tayyorgarlik
- [ ] Production build test: `npm run build`
- [ ] Build errors yo'qligini tekshirish
- [ ] Environment variables sozlash
- [ ] `.env.production` faylini yaratish

#### Vercel Deploy
- [ ] Vercel account yaratish/kirish
- [ ] GitHub repo ulash
- [ ] Project import qilish
- [ ] Build settings:
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Environment variables qo'shish:
  - `VITE_API_URL`
  - `VITE_TELEGRAM_BOT_USERNAME`
- [ ] Deploy qilish
- [ ] Custom domain ulash (ixtiyoriy)
- [ ] HTTPS avtomatik yoqiladi

```bash
# Vercel CLI orqali
npm install -g vercel
vercel login
vercel --prod
```

### 6.2. Backend Deployment (Railway)

#### Tayyorgarlik
- [ ] Production build test: `npm run build`
- [ ] `.env.production` faylini yaratish
- [ ] Database migration tayyorlash

#### Railway Deploy
- [ ] Railway account yaratish/kirish
- [ ] GitHub repo ulash
- [ ] New Project yaratish
- [ ] Deploy from GitHub
- [ ] Environment variables qo'shish:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `TELEGRAM_BOT_TOKEN`
  - `PORT`
  - `NODE_ENV=production`
  - `CORS_ORIGIN` (Vercel URL)
- [ ] Deploy qilish
- [ ] Auto-deploy yoqish

```bash
# Railway CLI orqali
npm install -g @railway/cli
railway login
railway up
```

### 6.3. Database Deployment (Neon/Supabase)

#### Neon (Serverless PostgreSQL)
- [ ] Neon account yaratish
- [ ] Yangi project yaratish
- [ ] Database URL olish
- [ ] `.env` ga qo'shish
- [ ] Migration ishga tushirish:
  ```bash
  npx prisma migrate deploy
  npx prisma generate
  ```

#### Supabase (Alternative)
- [ ] Supabase account yaratish
- [ ] Project yaratish
- [ ] Database URL olish
- [ ] Migration ishga tushirish

### 6.4. Image Storage (Cloudflare R2 / AWS S3)

#### Cloudflare R2 (Tavsiya etiladi - arzon)
- [ ] Cloudflare account yaratish
- [ ] R2 bucket yaratish
- [ ] API token yaratish
- [ ] Environment variables:
  - `R2_ACCOUNT_ID`
  - `R2_BUCKET_NAME`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_PUBLIC_URL`

#### AWS S3 (Alternative)
- [ ] AWS account yaratish
- [ ] S3 bucket yaratish
- [ ] IAM user yaratish
- [ ] Credentials sozlash

### 6.5. Telegram Bot Sozlash (Production)

#### BotFather
- [ ] @BotFather ga kirish
- [ ] Botni tanlash
- [ ] `/newapp` command
- [ ] Web App URL ni Vercel linkiga o'zgartirish
- [ ] Short name belgilash
- [ ] Bot username tekshirish

#### Menu Button
- [ ] `/setmenubutton` command
- [ ] Botni tanlash
- [ ] "Open" tugmasi matni
- [ ] Web App URL kiritish

#### Direct Link
- [ ] Bot username va app nomini birlashtirish:
  ```
  https://t.me/yourbot/appname
  ```
- [ ] Linkni test qilish

### 6.6. Domain va SSL
- [ ] Custom domain sotib olish (ixtiyoriy)
- [ ] DNS sozlash
- [ ] SSL sertifikat (Vercel/Railway avtomatik beradi)
- [ ] HTTPS tekshirish

### 6.7. Environment Variables (Production)

#### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com
VITE_TELEGRAM_BOT_USERNAME=yourbot
```

#### Backend (.env.production)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
TELEGRAM_BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
R2_ACCOUNT_ID="..."
R2_BUCKET_NAME="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_PUBLIC_URL="..."
```

### 6.8. Database Migration
```bash
# Production database migrate
npx prisma migrate deploy

# Prisma client generate
npx prisma generate

# Seed database (agar kerak bo'lsa)
npx prisma db seed
```

### 6.9. Final Testing (Production)

#### Frontend Testing
- [ ] Home page ochiladi
- [ ] Mahsulotlar yuklanadi
- [ ] Mahsulot detallari ishlaydi
- [ ] Savatcha ishlaydi
- [ ] Izoh qoldirish ishlaydi
- [ ] Telegram integratsiya ishlaydi
- [ ] Mobile responsive tekshirish

#### Backend Testing
- [ ] API endpoints ishlaydi
- [ ] Autentifikatsiya ishlaydi
- [ ] Rasm yuklash ishlaydi
- [ ] Database queries ishlaydi

#### Telegram Testing
- [ ] Bot orqali Mini App ochiladi
- [ ] MainButton ishlaydi
- [ ] BackButton ishlaydi
- [ ] Theme params to'g'ri
- [ ] User ma'lumotlari to'g'ri

### 6.10. Monitoring va Logging

#### Error Tracking
- [ ] Sentry account yaratish
- [ ] Sentry SDK ulash (frontend + backend)
- [ ] DSN sozlash
- [ ] Error reporting test

#### Analytics
- [ ] Google Analytics ulash (ixtiyoriy)
- [ ] Telegram analytics
- [ ] Custom events tracking

#### Logging
- [ ] Backend logging (Winston)
- [ ] Log level sozlash (production: error, warn)
- [ ] Log aggregation (ixtiyoriy)

### 6.11. Backup Strategy
- [ ] Database auto-backup sozlash
- [ ] Backup schedule (kunlik)
- [ ] Backup test (qayta tiklash)
- [ ] Image backup strategy

### 6.12. Documentation Yangilash
- [ ] README.md production URL bilan yangilash
- [ ] Deployment guide yozish
- [ ] Admin user guide
- [ ] API documentation (Swagger production)
- [ ] CHANGELOG.md yangilash

---

## ✅ Qabul qilish mezonlari

1. Frontend production da ishlaydi
2. Backend production da ishlaydi
3. Database migration bajarildi
4. Telegram Mini App ochiladi
5. HTTPS yoqilgan
6. Barcha funksiyalar ishlaydi
7. Error tracking sozlangan

---

## 📦 Natijalar

- [ ] Production frontend (Vercel)
- [ ] Production backend (Railway)
- [ ] Production database (Neon/Supabase)
- [ ] Telegram Mini App ishlaydi
- [ ] Monitoring sozlangan
- [ ] Documentation tayyor

---

## 🚀 Deploy Checklist

```
□ Frontend build muvaffaqiyatli
□ Backend build muvaffaqiyatli
□ Database migrated
□ Environment variables set
□ CORS sozlangan
□ HTTPS yoqilgan
□ Telegram bot updated
□ Mini App URL to'g'ri
□ Error tracking active
□ Backup strategy ready
```

---

## 🧪 Production Test Commands

```bash
# Frontend production build test
npm run build
npm run preview

# Backend production build test
npm run build
node dist/index.js

# Lighthouse production URL da
lighthouse https://yourdomain.com --view

# API health check
curl https://api.yourdomain.com/health
```

---

## 📞 Support va Maintenance

- **Daily**: Database backup tekshirish
- **Weekly**: Error logs review
- **Monthly**: Performance audit
- **Quarterly**: Security audit

---

## 🔗 Foydali linklar

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Neon Documentation](https://neon.tech/docs)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Sentry Documentation](https://docs.sentry.io/)
