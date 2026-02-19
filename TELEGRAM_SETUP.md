# 📱 Telegram Mini App - Integratsiya Qo'llanmasi

## 📋 Umumiy Ma'lumot

Telegram Mini App ishga tushirish uchun quyidagi bosqichlarni bajaring:

---

## 1️⃣ BOSQICH: HTTPS Tunnel Sozlash (Local Development)

Telegram WebApp **HTTPS** talab qiladi. Localhost uchun tunnel kerak.

### Variant A: ngrok (Tavsiya etiladi)

```bash
# ngrok o'rnatish
npm install -g ngrok

# Frontend uchun tunnel (port 5173)
ngrok http 5173

# Backend uchun tunnel (port 3000)
ngrok http 3000
```

Natija:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:5173
```

### Variant B: Cloudflare Tunnel

```bash
# Cloudflare CLI o'rnatish
npm install -g @cloudflare/cloudflared

# Tunnel ishga tushirish
cloudflared tunnel --url http://localhost:5173
```

### Variant C: localtunnel

```bash
npm install -g localtunnel

lt --port 5173
```

---

## 2️⃣ BOSQICH: Telegram Bot Yaratish

### @BotFather da bot yaratish

1. **Telegram'da @BotFather ga kiring**
   ```
   https://t.me/botfather
   ```

2. **Yangi bot yarating:**
   ```
   /newbot
   ```

3. **Bot nomini kiriting:**
   ```
   Kiyim Do'koni
   ```

4. **Bot username kiriting (bot bilan tugashi kerak):**
   ```
   yourshop_bot
   ```

5. **Bot token oling:**
   ```
   123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```

6. **Token ni backend/.env ga qo'shing:**
   ```env
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```

---

## 3️⃣ BOSQICH: Mini App Sozlash

### Web App yaratish

1. **@BotFather da:**
   ```
   /newapp
   ```

2. **Botni tanlang:**
   ```
   yourshop_bot
   ```

3. **Web App URL kiriting (ngrok URL):**
   ```
   https://abc123.ngrok.io
   ```

4. **Short name kiriting:**
   ```
   shop
   ```

5. **Natija:**
   ```
   https://t.me/yourshop_bot/shop
   ```

### Menu Button Sozlash

1. **@BotFather da:**
   ```
   /setmenubutton
   ```

2. **Botni tanlang**

3. **Web App ni tanlang**

---

## 4️⃣ BOSQICH: Frontend URL Yangilash

### Production URL uchun

`frontend/.env` faylni yangilang:

```env
# ngrok URL
VITE_API_URL=https://xyz789.ngrok.io/api

# Telegram bot username
VITE_TELEGRAM_BOT_USERNAME=yourshop_bot
```

### Yoki Vercel deploy uchun:

```env
VITE_API_URL=https://your-api.railway.app/api
VITE_TELEGRAM_BOT_USERNAME=yourshop_bot
```

---

## 5️⃣ BOSQICH: BotFather To'liq Sozlamalari

### Bot ma'lumotlarini sozlash

```
/setname - Bot nomini o'zgartirish
/setdescription - Bot tavsifi
/setuserpic - Bot avatari
/setcommands - Bot buyruqlari
```

### Buyruqlar misoli:

```
start - Botni boshlash
shop - Do'konni ochish
help - Yordam
```

---

## 6️⃣ BOSQICH: Test Qilish

### Telegram'da test

1. **Botni oching:** `@yourshop_bot`

2. **/start** bosing

3. **Menu button** orqali Mini App ni oching

4. **Telegram WebApp SDK** ishlashini tekshiring:
   - Theme colors
   - MainButton
   - BackButton
   - User data

### Console log tekshirish

Frontend console'da:

```javascript
// Telegram WebApp mavjudligi
console.log(window.Telegram?.WebApp);

// User ma'lumotlari
console.log(window.Telegram?.WebApp?.initDataUnsafe?.user);

// Theme params
console.log(window.Telegram?.WebApp?.themeParams);
```

---

## 🔧 Troubleshooting

### ❌ "WebApp URL is invalid"

**Sabab:** HTTPS emas yoki URL noto'g'ri

**Yechim:**
- ngrok ishlatayotganingizni tekshiring
- URL https:// bilan boshlanishi kerak
- BotFather'da URL ni to'g'ri kiriting

---

### ❌ "Init data invalid"

**Sabab:** Backend token noto'g'ri

**Yechim:**
```bash
# Backend/.env tekshiring
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11

# Backend restart
npm run dev
```

---

### ❌ "CORS error"

**Sabab:** Backend CORS origin noto'g'ri

**Yechim:**
```bash
# Backend/.env
CORS_ORIGIN=https://abc123.ngrok.io

# Yoki barcha originlarga ruxsat (development)
CORS_ORIGIN=*
```

---

### ❌ "MainButton ko'rinmayapti"

**Sabab:** Telegram WebApp SDK to'g'ri ulanmagan

**Yechim:**
```typescript
// Frontend code tekshiring
useEffect(() => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.MainButton.show();
  }
}, []);
```

---

## 📝 Checklist

Local development uchun:

- [ ] ngrok o'rnatilgan
- [ ] Frontend tunnel ishlayapti (https://...ngrok.io)
- [ ] Backend tunnel ishlayapti (yoki local:3000)
- [ ] BotFather'da bot yaratilgan
- [ ] Bot token backend/.env ga qo'shilgan
- [ ] WebApp URL sozlangan
- [ ] Menu button sozlangan
- [ ] Frontend/.env da API_URL yangilangan

Production uchun:

- [ ] Frontend Vercel'da deploy qilingan
- [ ] Backend Railway'da deploy qilingan
- [ ] Database Neon/Supabase'da
- [ ] BotFather'da production URL sozlangan
- [ ] HTTPS barcha joyda yoqilgan

---

## 🎯 Tezkor Test Script

```bash
# 1. Backend ishga tushirish
cd backend
npm run dev

# 2. Frontend ishga tushirish (boshqa terminal)
cd frontend
npm run dev

# 3. ngrok ishga tushirish (uchinchi terminal)
ngrok http 5173

# 4. ngrok URL ni frontend/.env ga qo'shing
# VITE_API_URL=https://YOUR-NGROK-URL.ngrok.io/api

# 5. ngrok URL ni BotFather'da WebApp URL sifatida qo'shing

# 6. Telegram'da botni oching va test qiling
```

---

## 📞 Yordam

Savollar bo'lsa:
1. `docs/TECHNICAL_SPECIFICATION.md` ni o'qing
2. `tasks/TASK_006_DEPLOYMENT.md` ni tekshiring
3. Telegram WebApp docs: https://core.telegram.org/bots/webapps

---

**Muvaffaqiyat! 🎉**
