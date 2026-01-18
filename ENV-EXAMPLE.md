# Environment Variables for Backend

Tạo file `.env` trong thư mục `server-nodejs` với nội dung sau:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=rag_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password_here

# Or use DATABASE_URL for production (Render provides this)
# DATABASE_URL=postgresql://user:password@host:port/database

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d

# Vector Storage Service
VECTOR_STORAGE_URL=http://localhost:8000

# Google AI (if using)
GOOGLE_API_KEY=your_google_api_key_here

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Cho Production (Render.com):

Thêm các biến sau vào Environment Variables trong Render Dashboard:

- `NODE_ENV=production`
- `PORT=10000`
- `DATABASE_URL=<your_postgres_url_from_render>`
- `JWT_SECRET=<generate_a_strong_random_string>`
- `JWT_EXPIRES_IN=7d`
- `VECTOR_STORAGE_URL=<your_vector_storage_url>`
- `GOOGLE_API_KEY=<your_google_api_key>`
- `CORS_ORIGIN=<your_frontend_url>`
