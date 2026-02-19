#!/bin/bash

echo "🚀 Telegram Mini App - Tezkor Sozlash"
echo "======================================"
echo ""

# Ranglar
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ngrok tekshirish
if ! command -v ngrok &> /dev/null; then
    echo -e "${YELLOW}ngrok topilmadi. O'rnatish kerak...${NC}"
    echo "npm install -g ngrok"
    echo ""
    echo "Yoki: https://ngrok.com/download"
    exit 1
fi

echo -e "${GREEN}✓ ngrok topildi${NC}"

# Backend/.env tekshirish
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}backend/.env topilmadi. Yaratish...${NC}"
    cp backend/.env.example backend/.env
    echo "backend/.env yaratildi. Iltimos, TELEGRAM_BOT_TOKEN ni o'zgartiring!"
fi

echo -e "${GREEN}✓ backend/.env mavjud${NC}"

# Frontend/.env tekshirish
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}frontend/.env topilmadi. Yaratish...${NC}"
    cp frontend/.env.example frontend/.env
fi

echo -e "${GREEN}✓ frontend/.env mavjud${NC}"

echo ""
echo "======================================"
echo "📋 Keyingi qadamlar:"
echo "======================================"
echo ""
echo "1. Telegram bot yarating (@BotFather)"
echo "   /newbot -> Bot nomini kiriting -> Token oling"
echo ""
echo "2. Token ni backend/.env ga qo'shing:"
echo "   TELEGRAM_BOT_TOKEN=123456:ABC-DEF..."
echo ""
echo "3. Backend va Frontend ni ishga tushiring:"
echo "   cd backend && npm run dev"
echo "   cd frontend && npm run dev"
echo ""
echo "4. ngrok tunnel yarating (yangi terminal):"
echo "   ngrok http 5173"
echo ""
echo "5. ngrok URL ni BotFather'da sozlang:"
echo "   /newapp -> Bot tanlang -> URL kiriting"
echo ""
echo "6. Telegram'da botni test qiling!"
echo ""
echo -e "${GREEN}Batafsil: TELEGRAM_SETUP.md${NC}"
echo ""
