# 🟢 Backend Service

Node.js + Express + TypeScript backend for RAG application.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env
# Edit .env and fill in your values

# Run dev server
npm run dev
```

Visit: http://localhost:3000

## 📦 API Endpoints

- `GET /` - Health check
- `POST /api/v1/auth/...` - Authentication
- `POST /api/v1/knowledge/...` - Knowledge management
- `POST /api/v1/chat/...` - Chat with RAG
- `POST /api/v1/loader/...` - Document loading

## 🏗️ Build

```bash
# Build TypeScript
npm run build

# Run production
npm start
```

## 🐳 Docker

```bash
# Build
docker build -t backend .

# Run
docker run -p 3000:3000 --env-file .env backend
```

## 🌐 Deploy to Railway

1. Push this repo to GitHub
2. Create new service on Railway.app
3. Connect GitHub repo
4. Add environment variables (see below)
5. Railway auto-detects Dockerfile and deploys!

### Required Environment Variables for Railway:

```
NODE_ENV=production
PORT=3000
VECTOR_STORAGE_URL=<your-vector-storage-url>
JWT_SECRET=<random-string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=<your-frontend-url>
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
GOOGLE_API_KEY=<your-api-key>
```

## 📁 Project Structure

```
src/
├── app.ts              # Express app
├── server.ts           # Server entry
├── config/             # Configuration
├── controllers/        # Route controllers
├── middleware/         # Express middleware
├── routes/             # API routes
├── services/           # Business logic
├── types/              # TypeScript types
├── utils/              # Utilities
└── validation/         # Input validation
```

## 🔧 Tech Stack

- Node.js 20
- Express
- TypeScript
- Google Generative AI
- LangChain
- Winston (logging)
- Joi (validation)

## 📝 Scripts

- `npm run dev` - Development server with watch
- `npm run build` - Build TypeScript
- `npm start` - Run production server
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix lint issues

## 📄 License

MIT
