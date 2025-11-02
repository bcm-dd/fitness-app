# 🚀 Quick Deploy to Vercel (2 minutes)

The fastest way to get your Fitness App live!

---

## Method 1: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/fitness-app)

1. Click the button above
2. Sign in with GitHub
3. Click "Deploy"
4. Done! Your app is live 🎉

---

## Method 2: Import from GitHub

### Prerequisites
- GitHub account
- Your code pushed to GitHub

### Steps

**1. Push to GitHub** (if not already done)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Click "Import Project"
- Select your repository: `fitness-app`
- Click "Import"

**3. Configure (Auto-detected)**
```
Framework Preset: Next.js ✅ (auto-detected)
Root Directory: ./ ✅
Build Command: npm run build ✅
Output Directory: .next ✅
```

**4. Deploy**
- Click "Deploy"
- Wait 2-3 minutes ☕
- Your app is live at: `https://fitness-app-XXXXX.vercel.app`

**5. (Optional) Set Environment Variables**
- Go to: Settings → Environment Variables
- Add:
  ```
  NEXT_PUBLIC_APP_NAME=Fitness App
  NEXT_PUBLIC_APP_VERSION=1.0.0
  ```

---

## Method 3: CLI Deploy (For Developers)

### Prerequisites
```bash
# Install Vercel CLI
npm i -g vercel
```

### Deploy

**Preview deployment:**
```bash
vercel
```

**Production deployment:**
```bash
vercel --prod
```

That's it! 🎉

---

## After Deployment

### Verify Deployment

**1. Test your app**
```bash
# Open your deployment
vercel open

# Or visit manually
https://your-app.vercel.app
```

**2. Test health endpoint**
```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "uptime": 123.456,
  "message": "OK",
  "timestamp": 1699000000000,
  "environment": "production",
  "version": "1.0.0"
}
```

**3. Test main routes**
- `/` → Redirects to `/home`
- `/home` → Home screen ✅
- `/workout` → Workout logging ✅
- `/progress` → Progress dashboard ✅
- `/onboarding` → Onboarding flow ✅

### Add Custom Domain (Optional)

**1. In Vercel Dashboard**
- Go to: Settings → Domains
- Add: `your-domain.com`

**2. Configure DNS**
- Add CNAME: `www` → `cname.vercel-dns.com`
- Add A record: `@` → `76.76.21.21`

**3. Wait for SSL**
- Automatic HTTPS via Let's Encrypt
- Usually ready in 24 hours

---

## Continuous Deployment (Automatic)

Once deployed, Vercel automatically:

✅ **Production deploys** on push to `main`
- URL: `https://fitness-app.vercel.app`

✅ **Preview deploys** on push to any branch
- URL: `https://fitness-app-branch.vercel.app`

✅ **PR comments** with preview URL
- Automatic on every pull request

---

## Troubleshooting

### Build fails?

**Check locally first:**
```bash
npm run build
```

If it works locally but fails on Vercel:
- Check Node.js version (should be 18+)
- Verify environment variables
- Check build logs in Vercel dashboard

### 404 on routes?

- Next.js App Router handles routing automatically
- Make sure you deployed the correct branch
- Clear Vercel cache and redeploy

### Environment variables not working?

- Prefix with `NEXT_PUBLIC_` for client-side vars
- Redeploy after adding env vars
- Check you added them to the correct environment

---

## Next Steps

✅ App deployed
✅ Health check working

**Now:**
1. Share your app: `https://your-app.vercel.app`
2. (Optional) Add custom domain
3. (Optional) Enable Vercel Analytics
4. (Optional) Set up monitoring

---

## Resources

- **Full Deployment Guide:** See `DEPLOYMENT.md`
- **GitHub Setup:** See `.github/VERCEL_SETUP.md`
- **Vercel Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support

---

**Your app is live! 🎉**

Need help? Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide.
