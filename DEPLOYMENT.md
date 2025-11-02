# Deployment Guide - Vercel

Complete guide for deploying the Fitness App to Vercel.

---

## Prerequisites

- [Vercel Account](https://vercel.com/signup) (free tier available)
- [Vercel CLI](https://vercel.com/cli) (optional, for local testing)
- GitHub repository connected to Vercel

---

## Quick Deploy (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Visit Vercel Dashboard**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Set Environment Variables** (Optional for now)
   - Add from `.env.production.example`
   - Click "Add" for each variable

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Environment Variables

### Required Variables (Set in Vercel Dashboard)

Go to: **Project Settings → Environment Variables**

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_APP_NAME` | `Fitness App` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_VERSION` | `1.0.0` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### Optional Variables (Future)

```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate-random-secret>

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Generate secrets:**
```bash
# For NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## Vercel Configuration Files

### `vercel.json`
Main configuration file with:
- Security headers (XSS, CSP, etc.)
- Caching rules for static assets
- Redirects and rewrites
- Region configuration

### `.vercelignore`
Files excluded from deployment:
- `node_modules/`
- Test files
- Development configs
- Large assets not needed in production

---

## Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to: Project Settings → Domains
   - Enter your domain: `fitnessapp.com`
   - Click "Add"

2. **Configure DNS**

   **Option A: Vercel Nameservers (Recommended)**
   - Update nameservers at your domain registrar:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

   **Option B: CNAME Record**
   - Add CNAME record:
     ```
     CNAME  www  cname.vercel-dns.com
     A      @    76.76.21.21
     ```

3. **Enable SSL**
   - Automatic via Vercel (Let's Encrypt)
   - Takes ~24 hours for DNS propagation

---

## Continuous Deployment (Automatic)

Vercel automatically deploys on:

### Production Deploys
- Triggered by: Pushes to `main` branch
- URL: `https://fitness-app.vercel.app`
- Environment: Production

### Preview Deploys
- Triggered by: Pull requests and pushes to other branches
- URL: `https://fitness-app-<hash>.vercel.app`
- Environment: Preview
- Automatically comment on PR with preview URL

### Configuration
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": true
    }
  }
}
```

---

## Build Configuration

### Build Settings (Auto-detected)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Build Optimization

**Automatic optimizations:**
- ✅ Image optimization (Next.js Image component)
- ✅ Code splitting by route
- ✅ Static page generation
- ✅ Incremental Static Regeneration (ISR)
- ✅ Edge caching
- ✅ Compression (Brotli/Gzip)

**Bundle Analysis:**
```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Analyze
ANALYZE=true npm run build
```

---

## Performance Monitoring

### Vercel Analytics (Free)

1. **Enable in Dashboard**
   - Project Settings → Analytics
   - Toggle "Enable Analytics"

2. **View Metrics**
   - Real User Monitoring (RUM)
   - Web Vitals (LCP, FID, CLS)
   - Page load times
   - Geographic distribution

### Speed Insights

Add to `app/layout.tsx`:
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Install:
```bash
npm install @vercel/speed-insights
```

---

## Edge Functions & Middleware

### Enable Edge Runtime (Optional)

For ultra-fast API routes:

```ts
// app/api/workout/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ data: 'fast!' }));
}
```

### Middleware Example

Create `middleware.ts` in root:
```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## Health Checks

### Endpoint
```
GET https://your-app.vercel.app/api/health
GET https://your-app.vercel.app/healthz (alias)
```

### Response
```json
{
  "uptime": 123.456,
  "message": "OK",
  "timestamp": 1699000000000,
  "environment": "production",
  "version": "1.0.0"
}
```

### Monitoring
Set up external monitoring:
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [Better Uptime](https://betteruptime.com/)

---

## Rollback & Versioning

### Instant Rollback

1. **Via Dashboard**
   - Go to: Deployments
   - Find previous working deployment
   - Click "⋯" → "Promote to Production"

2. **Via CLI**
   ```bash
   vercel rollback
   ```

### Deployment History
- All deployments saved forever (free tier: 100GB storage)
- Instant rollback to any previous version
- Compare deployments side-by-side

---

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to: Deployments → Failed deployment → Build Logs
2. Look for errors in npm install or build step

**Common issues:**
```bash
# Missing dependencies
npm install --save <package-name>

# Type errors
npm run build  # Test locally first

# Out of memory
# Increase Node memory in package.json:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Runtime Errors

**Check Function logs:**
1. Go to: Deployments → Production → Functions
2. Click on function to see logs

**Enable detailed logging:**
```ts
console.log('[DEBUG]', data);  // Shows in Vercel logs
```

### Environment Variables Not Working

- ✅ Prefix public vars with `NEXT_PUBLIC_`
- ✅ Redeploy after changing env vars
- ✅ Check correct environment (Production/Preview/Development)

---

## Security Best Practices

### Headers (Already configured in `vercel.json`)
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### Additional Security

**Enable DDoS Protection:**
- Automatically enabled on Vercel Pro
- Free tier has basic protection

**Enable Preview Deployment Protection:**
1. Go to: Project Settings → Deployment Protection
2. Enable "Password Protection" for previews
3. Set password

**Audit dependencies:**
```bash
npm audit
npm audit fix
```

---

## Cost Optimization

### Free Tier Limits
- ✅ 100 GB bandwidth
- ✅ Unlimited deployments
- ✅ Unlimited preview deployments
- ✅ Automatic HTTPS
- ✅ 100 GB-hours serverless function execution

### Pro Tips
- Use static generation where possible (cheaper than SSR)
- Optimize images (use Next.js Image component)
- Enable edge caching
- Monitor usage in dashboard

### Upgrade When Needed
**Pro Plan ($20/month):**
- 1 TB bandwidth
- Advanced analytics
- DDoS protection
- Team collaboration

---

## CI/CD Integration

See `.github/workflows/deploy.yml` for automated:
- ✅ Linting
- ✅ Type checking
- ✅ Build testing
- ✅ Automatic deployment

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Discord:** https://vercel.com/discord
- **Status Page:** https://vercel-status.com

---

## Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] Custom domain set up (optional)
- [ ] Analytics enabled
- [ ] Build succeeds locally (`npm run build`)
- [ ] Type check passes (`npx tsc --noEmit`)
- [ ] Lint passes (`npm run lint`)
- [ ] Health check endpoint works
- [ ] Error tracking configured (optional)
- [ ] Performance monitoring enabled

---

**Your app is production-ready! 🚀**

Deploy with confidence knowing you have:
- Automatic HTTPS
- Global CDN
- Edge caching
- Instant rollbacks
- Preview deployments
- Zero-config deployment
