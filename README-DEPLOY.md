# 🟢 Backend Service

Node.js + Express + TypeScript backend cho RAG application.

## 🚀 Chạy Local

```bash
# Cài dependencies
npm install

# Tạo file .env
# Xem ENV-EXAMPLE.md để biết cần gì

# Chạy dev server
npm run dev
```

Truy cập: http://localhost:3000

## 🏗️ Build

```bash
# Build TypeScript
npm run build

# Run production
npm start
```

## 🔧 Environment Variables

Tạo file `.env`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/rag_db
VECTOR_STORAGE_URL=http://localhost:8000
JWT_SECRET=your_secret_key
GOOGLE_API_KEY=your_google_api_key
CORS_ORIGIN=http://localhost:5173
```

Xem chi tiết trong `ENV-EXAMPLE.md`

## 🗄️ Database

Cần PostgreSQL database. 

**Local:**
```bash
# Tạo database
createdb rag_db

# Sync models
curl -X PATCH http://localhost:3000/api/sync
```

**Production:**
Database URL sẽ được cung cấp bởi Render.

## 🐳 Docker

```bash
# Build
docker build -t backend .

# Run
docker run -p 3000:3000 --env-file .env backend
```

## 🌐 Deploy

Service này sẽ được deploy tự động khi dùng `render.yaml`.

### Manual Deploy trên Render:

1. New → Web Service
2. Root Directory: `server-nodejs`
3. Runtime: Node
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add environment variables (xem ENV-EXAMPLE.md)

### Environment Variables Cần Thiết:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<from Render PostgreSQL>
VECTOR_STORAGE_URL=<vector storage URL>
JWT_SECRET=<random string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=<frontend URL>
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
GOOGLE_API_KEY=<your key>
```

Xem hướng dẫn đầy đủ:
- `../BAT-DAU-O-DAY.md`
- `../DEPLOY-GUIDE-SIMPLE.md`

## 📁 Cấu Trúc

```
src/
├── app.ts              # Express app setup
├── server.ts           # Server entry point
├── config/             # Configuration
├── controllers/        # Route controllers
├── database/           # Database & models
├── middleware/         # Express middleware
├── routes/             # API routes
├── services/           # Business logic
├── types/              # TypeScript types
├── utils/              # Utilities
└── validation/         # Input validation
```

## 🔍 API Endpoints

- `GET /` - Health check
- `POST /api/v1/auth/...` - Authentication
- `POST /api/v1/knowledge/...` - Knowledge management
- `POST /api/v1/chat/...` - Chat with RAG
- `PATCH /api/sync` - Sync database

Xem Swagger docs (nếu có) hoặc code trong `src/routes/`
