# ✅ Render Deploy Checklist

## Trước khi deploy:

### 1. Kiểm tra Git Repository
- [ ] Đã commit Dockerfile
- [ ] Đã commit tất cả code changes
- [ ] Đã push lên Git (GitHub/GitLab/Bitbucket)

### 2. Kiểm tra Files quan trọng
```bash
# Chạy từ root của repo
ls -la

# Phải thấy:
# ✓ Dockerfile
# ✓ package.json
# ✓ package-lock.json
# ✓ src/
# ✓ tsconfig.json
```

### 3. Config trên Render Dashboard

#### A. Chọn đúng Runtime:
```
Build & Deploy:
  Runtime: Docker ✅
```

#### B. Root Directory:
```
# Nếu repo structure là:
your-repo/
├── Dockerfile        → Root Directory: . (hoặc để trống)
├── package.json
└── src/

# Nếu repo structure là:
your-repo/
├── server-nodejs/
│   ├── Dockerfile    → Root Directory: server-nodejs
│   ├── package.json
│   └── src/
└── client/
```

**Cho project của bạn:** Root Directory = `.` hoặc **để trống**

#### C. Không cần config Build/Start commands:
```
Build Command: (để trống - Docker tự build)
Start Command: (để trống - Docker dùng CMD từ Dockerfile)
```

### 4. Environment Variables

Thêm các biến sau vào Render:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
VECTOR_STORAGE_URL=http://...
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend.com
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
GOOGLE_API_KEY=your_api_key_here
```

### 5. Database Setup (nếu cần)

- [ ] Tạo PostgreSQL database trên Render
- [ ] Copy DATABASE_URL vào environment variables
- [ ] Sau khi deploy xong, chạy sync: `curl -X PATCH https://your-app.onrender.com/api/sync`

---

## Sau khi deploy:

### Kiểm tra deployment logs:
1. Vào tab "Logs" trong Render dashboard
2. Xem có error không
3. Tìm dòng: "App is running at..."

### Test API endpoints:
```bash
# Health check
curl https://your-app.onrender.com/

# Sync database
curl -X PATCH https://your-app.onrender.com/api/sync

# Test API
curl https://your-app.onrender.com/api/v1/health
```

---

## 🐛 Troubleshooting

### Lỗi: "Dockerfile not found"
→ Sai Root Directory, đổi thành `.` hoặc để trống

### Lỗi: "npm ci failed" 
→ Dockerfile đang dùng --only=production, cần bỏ flag đó

### Lỗi: "Port already in use"
→ Check environment variable PORT (Render tự inject)

### Lỗi: "Database connection failed"
→ Check DATABASE_URL environment variable

### App deploy xong nhưng không chạy:
→ Check logs xem có missing environment variables không
