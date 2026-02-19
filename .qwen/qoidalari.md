# 📜 LOYIHA QOIDALARI

## ⚠️ MUHIM QOIDALAR

### 1. Fayl Tuzilmasi
- **Faqat** quyidagi papkalarga ishlash:
  - `docs/` - Faqat Texnik Topshiriq (TZ)
  - `tasks/` - Faqat task fayllari
- Boshqa papkalarga **o'zgartirish kiritmaslik**

### 2. Tasklarni Bajarish
- Har bir taskni **alohida branch**da bajarish
- Branch nomlash qoidasi: `task-001`, `task-002`, ...
- Task fayllariga **qat'iy rioya qilish**
- Tasklarda yozilgan talablardan **og'ishmaslik**

### 3. Branch Strategiyasi
```
main (production)
├── task-001-setup
├── task-002-backend-api
├── task-003-frontend-client
├── task-004-admin-panel
├── task-005-testing
└── task-006-deployment
```

### 4. Commit Qoidalari
- Har bir commit aniq va tushunarli bo'lishi kerak
- Commit formati:
  ```
  [TASK-XXX] Qisqa tavsif
  
  Batafsil ma'lumot (ixtiyoriy)
  ```
- Misol:
  ```
  [TASK-001] Frontend loyihasini sozlash
  
  - Vite + React + TypeScript yaratildi
  - Tailwind CSS o'rnatildi
  - Telegram WebApp SDK ulandi
  ```

### 5. Pull Request Qoidalari
- Har bir task tugagach PR yaratish
- PR da task faylidagi barcha checkboxlarni tekshirish
- Kamida 1 tasdiq kerak
- Barcha testlar o'tishi kerak

### 6. Kod Sifati
- TypeScript ishlatish
- ESLint va Prettier qoidalari
- Har bir funksiya uchun type definitions
- Kod commentlarini minimal darajada ushlash

### 7. Xavfsizlik
- `.env` fayllarini **hech qachon** commit qilmaslik
- API tokenlarni maxfiy saqlash
- Sensitive ma'lumotlarni GitHub ga yuklamaslik

### 8. Documentation
- Har bir o'zgarishni `CHANGELOG.md` ga yozish
- README.md ni yangilab borish
- API documentation (Swagger) to'liq bo'lishi

---

## 📋 TASKLAR RO'YXATI

| Task | Fayl | Branch | Status |
|------|------|--------|--------|
| 001 | `tasks/TASK_001_SETUP.md` | `task-001` | ⏳ Pending |
| 002 | `tasks/TASK_002_BACKEND_API.md` | `task-002` | ⏳ Pending |
| 003 | `tasks/TASK_003_FRONTEND_CLIENT.md` | `task-003` | ⏳ Pending |
| 004 | `tasks/TASK_004_ADMIN_PANEL.md` | `task-004` | ⏳ Pending |
| 005 | `tasks/TASK_005_TESTING.md` | `task-005` | ⏳ Pending |
| 006 | `tasks/TASK_006_DEPLOYMENT.md` | `task-006` | ⏳ Pending |

---

## 🚀 ISH BOSHLASH

1. Har bir taskni boshlashdan oldin:
   - Task faylini o'qish
   - Yangi branch ochish
   - Taskdagi barcha punktlarni bajarish

2. Task tugagach:
   - Barcha checkboxlarni tekshirish
   - Testlarni ishga tushirish
   - PR yaratish
   - Code review o'tkazish
   - Main branch ga merge qilish

3. Keyingi taskga o'tish

---

## 📞 ALOQA

- Har bir task bo'yicha savollar bo'lsa, oldin task faylini qayta o'qish
- Noaniqliklar bo'lsa, TZ faylini tekshirish (`docs/TECHNICAL_SPECIFICATION.md`)

---

**Qoidalar: Qat'iy rioya qilish majburiy!** ✅
