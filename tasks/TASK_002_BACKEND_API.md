# 📁 TASK 002: Backend API yaratish

**Bosqich:** 2 - Backend Development  
**Muddat:** 3-4 kun  
**Prioritet:** ⭐⭐⭐⭐⭐ (Juda muhim)

---

## 🎯 Maqsad

Barcha kerakli API endpointlarni yaratish, autentifikatsiya tizimini sozlash va Telegram initData validatsiyasini amalga oshirish.

---

## 📋 Tasklar ro'yxati

### 2.1. Telegram autentifikatsiya middleware
- [ ] `validateTelegramData.ts` utiliti yaratish
- [ ] `telegramAuth.ts` middleware yozish
- [ ] InitData ni serverda tekshirish funksiyasi
- [ ] User ni avtomatik yaratish/yangilash
- [ ] Test yozish

### 2.2. JWT Auth middleware (Admin panel uchun)
- [ ] `auth.ts` middleware yaratish
- [ ] JWT token generatsiya qilish
- [ ] Token verify qilish
- [ ] Admin role check
- [ ] Refresh token mexanizmi

### 2.3. Category API
```
GET    /api/categories          - Barcha kategoriyalar
POST   /api/admin/categories    - Yangi kategoriya qo'shish
PUT    /api/admin/categories/:id - Kategoriya tahrirlash
DELETE /api/admin/categories/:id - Kategoriya o'chirish
```
- [ ] Controller yaratish
- [ ] Route yaratish
- [ ] Service qatlam yozish
- [ ] Validation (zod/yup)

### 2.4. Product API
```
GET    /api/products            - Mahsulotlar ro'yxati (public)
GET    /api/products/:slug      - Mahsulot detallari (public)
GET    /api/admin/products      - Admin uchun mahsulotlar
POST   /api/admin/products      - Mahsulot qo'shish
PUT    /api/admin/products/:id  - Mahsulot tahrirlash
DELETE /api/admin/products/:id  - Mahsulot o'chirish
```
- [ ] Controller yaratish
- [ ] Route yaratish
- [ ] Service qatlam yozish
- [ ] Filter va search funksiyalari
- [ ] Pagination (limit/offset)
- [ ] Sorting (narx, sana, rating)

### 2.5. Product Image Upload
```
POST   /api/admin/upload        - Rasm yuklash
DELETE /api/admin/images/:id    - Rasm o'chirish
```
- [ ] Multer sozlash
- [ ] Fayl validatsiyasi (format, size)
- [ ] Sharp bilan optimizatsiya (resize, WebP)
- [ ] S3/R2 ga yuklash yoki local storage
- [ ] URL generatsiyasi

### 2.6. Comment API
```
GET    /api/products/:id/comments  - Mahsulot izohlari (public)
POST   /api/comments               - Izoh qoldirish
PUT    /api/comments/:id           - Izohni tahrirlash
DELETE /api/comments/:id           - Izohni o'chirish
GET    /api/admin/comments         - Admin uchun barcha izohlar
PUT    /api/admin/comments/:id     - Izohni moderatsiya qilish
```
- [ ] Controller yaratish
- [ ] Route yaratish
- [ ] Service qatlam yozish
- [ ] Rating hisoblash (o'rtacha yulduz)
- [ ] Spam filter (ixtiyoriy)

### 2.7. Order API
```
POST   /api/orders            - Buyurtma yaratish
GET    /api/orders            - O'z buyurtmalari
GET    /api/orders/:id        - Buyurtma detallari
GET    /api/admin/orders      - Admin uchun buyurtmalar
PUT    /api/admin/orders/:id  - Buyurtma holatini o'zgartirish
DELETE /api/admin/orders/:id  - Buyurtmani o'chirish
```
- [ ] Controller yaratish
- [ ] Route yaratish
- [ ] Service qatlam yozish
- [ ] OrderItem yaratish
- [ ] Status management (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
- [ ] Total amount hisoblash

### 2.8. User Profile API
```
GET  /api/me    - O'z profili
```
- [ ] Controller yaratish
- [ ] User ma'lumotlarini qaytarish
- [ ] Buyurtmalar tarixi
- [ ] Sevimli mahsulotlar (ixtiyoriy)

### 2.9. Admin Dashboard API
```
GET  /api/admin/dashboard    - Dashboard statistikasi
GET  /api/admin/me           - Admin ma'lumotlari
POST /api/admin/login        - Admin login
POST /api/admin/logout       - Admin logout
```
- [ ] Dashboard statistikasi:
  - Jami mahsulotlar
  - Jami buyurtmalar
  - Jami daromad
  - Oxirgi buyurtmalar
  - Eng ko'p sotilgan mahsulotlar
- [ ] Admin login (username + password)
- [ ] JWT token berish

### 2.10. Settings API (ixtiyoriy)
```
GET  /api/admin/settings     - Sozlamalar
PUT  /api/admin/settings     - Sozlamalarni o'zgartirish
```
- [ ] Do'kon nomi
- [ ] Aloqa ma'lumotlari
- [ ] Yetkazib berish shartlari

### 2.11. Error handling
- [ ] Global error handler middleware
- [ ] Custom error classes
- [ ] Error response format
- [ ] Logging (winston/morgan)

### 2.12. Security
- [ ] Helmet.js ulash
- [ ] CORS sozlash
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization
- [ ] SQL injection himoyasi (Prisma ORM)

### 2.13. API Documentation
- [ ] Swagger/OpenAPI sozlash
- [ ] Barcha endpointlarni dokumentatsiya qilish
- [ ] Request/Response namunalari

---

## ✅ Qabul qilish mezonlari

1. Barcha endpointlar ishlaydi
2. Telegram initData validatsiyasi to'g'ri ishlaydi
3. JWT autentifikatsiya xavfsiz
4. Rasm yuklash va optimizatsiya ishlaydi
5. Error handling to'g'ri sozlangan
6. API documentation tayyor
7. Testlar yozilgan (unit + integration)

---

## 📦 Natijalar

- [ ] To'liq ishlaydigan Backend API
- [ ] Autentifikatsiya tizimi
- [ ] File upload tizimi
- [ ] Dashboard API
- [ ] API Documentation (Swagger)

---

## 🧪 Test qilish

```bash
# API testlarini ishga tushirish
npm run test:api

# Postman/Insomnia collection import qilish
```

---

## 🔗 Foydali linklar

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Multer GitHub](https://github.com/expressjs/multer)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [JWT.io](https://jwt.io/)
