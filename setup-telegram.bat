@echo off
echo 🚀 Telegram Mini App - Tezkor Sozlash
echo ======================================
echo.

REM ngrok tekshirish
where ngrok >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ngrok topilmadi. O'rnatish kerak...
    echo npm install -g ngrok
    echo.
    echo Yoki: https://ngrok.com/download
    pause
    exit /b 1
)

echo ✓ ngrok topildi

REM Backend/.env tekshirish
if not exist "backend\.env" (
    echo backend\.env topilmadi. Yaratish...
    copy "backend\.env.example" "backend\.env"
    echo backend\.env yaratildi. TELEGRAM_BOT_TOKEN ni o'zgartiring!
)

echo ✓ backend\.env mavjud

REM Frontend/.env tekshirish
if not exist "frontend\.env" (
    echo frontend\.env topilmadi. Yaratish...
    copy "frontend\.env.example" "frontend\.env"
)

echo ✓ frontend\.env mavjud

echo.
echo ======================================
echo 📋 Keyingi qadamlar:
echo ======================================
echo.
echo 1. Telegram bot yarating (@BotFather)
echo    /newbot -^> Bot nomini kiriting -^> Token oling
echo.
echo 2. Token ni backend\.env ga qo'shing:
echo    TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
echo.
echo 3. Backend va Frontend ni ishga tushiring:
echo    cd backend ^&^& npm run dev
echo    cd frontend ^&^& npm run dev
echo.
echo 4. ngrok tunnel yarating (yangi terminal):
echo    ngrok http 5173
echo.
echo 5. ngrok URL ni BotFather'da sozlang:
echo    /newapp -^> Bot tanlang -^> URL kiriting
echo.
echo 6. Telegram'da botni test qiling!
echo.
echo Batafsil: TELEGRAM_SETUP.md
echo.
pause
