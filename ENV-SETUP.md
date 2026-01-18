# 🔧 Environment Variables Setup

## Local Development

Create a `.env` file in this directory with:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Vector Storage Service URL
VECTOR_STORAGE_URL=http://localhost:8000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Google AI Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Logging
LOG_LEVEL=info
```

## Railway Deployment

Add these environment variables in Railway dashboard:

```env
NODE_ENV=production
PORT=3000
VECTOR_STORAGE_URL=https://your-vector-storage.railway.app
JWT_SECRET=<generate-random-string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-app.vercel.app
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
GOOGLE_API_KEY=your_google_api_key
```

## Generate JWT Secret

### Windows PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### macOS/Linux:
```bash
openssl rand -base64 32
```

### Online:
Visit: https://randomkeygen.com/ and use "CodeIgniter Encryption Keys"

## Environment Variables Explained

- `NODE_ENV`: Environment (development, production)
- `PORT`: Port to run the service
- `VECTOR_STORAGE_URL`: URL of vector storage service
- `JWT_SECRET`: Secret key for JWT tokens (MUST be random and secure)
- `JWT_EXPIRES_IN`: JWT token expiration time
- `CORS_ORIGIN`: Allowed origin for CORS (frontend URL)
- `CORS_METHODS`: Allowed HTTP methods
- `CORS_ALLOWED_HEADERS`: Allowed HTTP headers
- `GOOGLE_API_KEY`: Google Generative AI API key (get from https://makersuite.google.com)

## Important Notes

1. **Never commit `.env` file to Git!** (Already in .gitignore)
2. **JWT_SECRET must be random and secure** in production
3. **Update CORS_ORIGIN** to your actual frontend URL after deploying
4. **Get Google API Key** from: https://makersuite.google.com/app/apikey
