# Deployment Guide: Aryals Car Dealership

This guide covers deploying the frontend to Vercel and the backend to Railway.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (https://vercel.com)
- Railway account (https://railway.app)
- MySQL database on Railway

---

## Part 1: Deploy Backend to Railway

### Step 1: Create MySQL Database on Railway

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Provision MySQL"**
4. Wait for the database to be created
5. Click on the MySQL service
6. Go to **"Variables"** tab and copy these values:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

### Step 2: Import Database Schema

1. Connect to your Railway MySQL database using a tool like:
   - MySQL Workbench
   - phpMyAdmin
   - DBeaver
   - Or Railway's web SQL client

2. Run the SQL file: `backend/config/schema.sql`

3. Verify tables are created:
   ```sql
   SHOW TABLES;
   ```

### Step 3: Deploy Backend Application

1. In Railway dashboard, click **"New"** → **"GitHub Repo"**
2. Select your repository
3. Railway will auto-detect it's a Node.js app
4. Go to **"Settings"** and configure:
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js`

### Step 4: Add Environment Variables

1. Go to **"Variables"** tab in your backend service
2. Add these variables:

```env
DB_HOST=[Your MYSQLHOST from Step 1]
DB_USER=[Your MYSQLUSER from Step 1]
DB_PASSWORD=[Your MYSQLPASSWORD from Step 1]
DB_NAME=[Your MYSQLDATABASE from Step 1]
DB_PORT=[Your MYSQLPORT from Step 1]
PORT=5000
NODE_ENV=production
FRONTEND_URL=[Will add this after deploying frontend]
JWT_SECRET=[Generate a random secure string]
```

**To generate JWT_SECRET**, run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Get Your Backend URL

1. After deployment completes, go to **"Settings"** → **"Domains"**
2. Copy your Railway app URL (e.g., `https://your-app.up.railway.app`)
3. **Save this URL** - you'll need it for frontend deployment

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Update `.env.production` with your Railway backend URL:

```env
VITE_API_BASE_URL=https://your-backend-app.railway.app/api
VITE_UPLOAD_URL=https://your-backend-app.railway.app/uploads
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New"** → **"Project"**
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables

In Vercel project settings → **"Environment Variables"**, add:

```env
VITE_API_BASE_URL=https://your-backend-app.railway.app/api
VITE_UPLOAD_URL=https://your-backend-app.railway.app/uploads
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 5: Update Backend CORS

1. Go back to Railway backend service
2. Add/update the **FRONTEND_URL** variable:
```env
FRONTEND_URL=https://your-app.vercel.app
```
3. Railway will automatically redeploy

---

## Part 3: Verify Deployment

### Test Backend

1. Visit: `https://your-backend-app.railway.app/health`
2. Should return: `{"status":"OK","message":"Aryals Dealer API is running"}`

### Test Frontend

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Check:
   - Home page loads
   - Inventory page shows vehicles
   - Admin login works (admin/admin123)
   - Vehicle CRUD operations work
   - Banner management works
   - Image uploads work

---

## Part 4: Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to Project Settings → **Domains**
2. Add your domain (e.g., `www.aryalsdealer.com`)
3. Follow DNS configuration instructions

### For Railway (Backend)

1. Go to Service Settings → **Domains**
2. Add custom domain (e.g., `api.aryalsdealer.com`)
3. Configure DNS with provided values
4. Update frontend env variables with new backend domain

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Check Railway logs for CORS-related errors
- Redeploy backend after changing CORS settings

### Database Connection Failed
- Verify all DB credentials in Railway are correct
- Check Railway MySQL service is running
- Test connection using MySQL Workbench

### Images Not Loading
- Ensure Railway backend has write permissions for uploads
- Check `VITE_UPLOAD_URL` points to correct backend
- Consider using cloud storage (AWS S3, Cloudinary) for production

### Build Failures

**Frontend:**
- Check all dependencies are in `package.json`
- Verify Node version compatibility
- Check build logs in Vercel dashboard

**Backend:**
- Ensure `package.json` has correct start script
- Check Node version in Railway settings
- Review Railway deployment logs

---

## Environment Variables Reference

### Backend (Railway)
```env
DB_HOST=               # Railway MySQL host
DB_USER=               # Railway MySQL user
DB_PASSWORD=           # Railway MySQL password
DB_NAME=               # Railway MySQL database name
DB_PORT=               # Railway MySQL port
PORT=5000             # Backend server port
NODE_ENV=production   # Environment
FRONTEND_URL=         # Your Vercel frontend URL
JWT_SECRET=           # Secure random string
```

### Frontend (Vercel)
```env
VITE_API_BASE_URL=    # Railway backend URL + /api
VITE_UPLOAD_URL=      # Railway backend URL + /uploads
```

---

## Post-Deployment Checklist

- [ ] Backend health check responds
- [ ] Frontend loads without errors
- [ ] API calls work from frontend to backend
- [ ] Admin login functions
- [ ] Vehicle CRUD operations work
- [ ] Banner management works
- [ ] Image uploads successful
- [ ] All images display correctly
- [ ] Custom domains configured (if applicable)
- [ ] SSL certificates active
- [ ] Database backups configured on Railway

---

## Maintenance

### Update Application

**Frontend:**
1. Push changes to Git
2. Vercel auto-deploys from main branch

**Backend:**
1. Push changes to Git
2. Railway auto-deploys from main branch

### Database Backups

1. In Railway, go to MySQL service
2. Use "Backups" feature to schedule automatic backups
3. Or manually export via MySQL client

### Monitor Logs

**Vercel:** Project → Deployments → View Logs
**Railway:** Service → Deployments → View Logs

---

## Support

If you encounter issues:
1. Check deployment logs in Vercel/Railway
2. Verify all environment variables are set correctly
3. Test locally with production environment variables
4. Check browser console for frontend errors
5. Check Railway logs for backend errors

---

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT_SECRET
- Change default admin password after first deployment
- Enable Railway/Vercel security features
- Keep dependencies updated
- Use HTTPS for all communications
