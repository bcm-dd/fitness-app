# Vercel GitHub Integration Setup

Complete guide for setting up Vercel with GitHub Actions.

## Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

## Step 2: Get Vercel Credentials

### A. Get Vercel Token

1. Go to [Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions - Fitness App`
4. Copy the token (you'll only see it once!)
5. Save it as: `VERCEL_TOKEN`

### B. Get Organization ID

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (run in project directory)
vercel link

# Get Org ID
cat .vercel/project.json | grep orgId
```

Or from dashboard:
1. Go to Settings → General
2. Copy "Organization ID"
3. Save it as: `VERCEL_ORG_ID`

### C. Get Project ID

From the same `project.json`:
```bash
cat .vercel/project.json | grep projectId
```

Or from dashboard:
1. Go to Project Settings → General
2. Copy "Project ID"
3. Save it as: `VERCEL_PROJECT_ID`

## Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings → Secrets and variables → Actions**
3. Click "New repository secret"
4. Add these three secrets:

| Name | Value | Description |
|------|-------|-------------|
| `VERCEL_TOKEN` | `abc123...` | Vercel API token |
| `VERCEL_ORG_ID` | `team_xxx` | Your Vercel org ID |
| `VERCEL_PROJECT_ID` | `prj_xxx` | Your project ID |

## Step 4: Configure Vercel Project

### Option 1: Via Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

4. Set environment variables:
   ```
   NEXT_PUBLIC_APP_NAME=Fitness App
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NODE_ENV=production
   ```

5. Deploy!

### Option 2: Via CLI

```bash
# Link project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_APP_NAME
# Enter value: Fitness App

vercel env add NEXT_PUBLIC_APP_VERSION
# Enter value: 1.0.0

# Deploy
vercel --prod
```

## Step 5: Configure Branch Settings

In Vercel Dashboard → Settings → Git:

### Production Branch
- **Branch:** `main`
- **Auto-deploy:** ✅ Enabled

### Preview Branches
- **All branches:** ✅ Enabled
- **Auto-deploy:** ✅ Enabled
- Creates preview URL for each branch

### Pull Request Comments
- ✅ Enable Vercel for GitHub comments
- Automatically comments with preview URL

## Step 6: Test GitHub Actions

Push to a branch:
```bash
git checkout -b test-deployment
git push origin test-deployment
```

Expected workflow:
1. ✅ CI workflow runs (lint, typecheck, build)
2. ✅ Vercel creates preview deployment
3. ✅ GitHub Actions workflow completes
4. ✅ Comment appears on PR with preview URL

## Step 7: Test Production Deployment

Merge to main:
```bash
git checkout main
git merge test-deployment
git push origin main
```

Expected workflow:
1. ✅ CI workflow runs
2. ✅ Production deployment workflow runs
3. ✅ Deployed to `https://fitness-app.vercel.app`
4. ✅ Deployment summary in GitHub Actions

## Troubleshooting

### "Error: No token specified"
- Make sure `VERCEL_TOKEN` is set in GitHub Secrets
- Token must be valid and not expired

### "Error: Project not found"
- Make sure `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` are correct
- Run `vercel link` locally to get correct IDs

### Build fails on Vercel but works locally
- Check environment variables are set in Vercel dashboard
- Verify Node.js version matches (18.x)
- Check build logs in Vercel dashboard

### GitHub Actions workflow not triggering
- Make sure workflow files are in `.github/workflows/`
- Check branch protection rules
- Verify GitHub Actions is enabled for repository

## Optional: Advanced Configuration

### A. Environment-specific Variables

Set different values for preview vs production:

```bash
# Production only
vercel env add DATABASE_URL production

# Preview only
vercel env add DATABASE_URL preview

# All environments
vercel env add API_URL production preview development
```

### B. Deploy Protection

In Vercel Dashboard → Settings → Deployment Protection:
- ✅ Enable "Vercel Authentication" for preview deployments
- Requires login to view preview URLs
- Good for staging environments

### C. Custom Domains

1. Go to Settings → Domains
2. Add domain: `fitnessapp.com`
3. Configure DNS (see DEPLOYMENT.md)
4. SSL automatically provisioned

## Monitoring Deployments

### View Logs
- **Dashboard:** Vercel Dashboard → Deployments → [Click deployment] → Function Logs
- **CLI:** `vercel logs [deployment-url]`

### View Analytics
- Go to Project → Analytics
- Real-time traffic data
- Web Vitals scores
- Error tracking

## Complete! 🎉

Your Vercel + GitHub integration is now complete!

Every push will:
- ✅ Run automated checks
- ✅ Create preview deployments
- ✅ Deploy to production (when merged to main)
- ✅ Comment on PRs with preview URLs

**Next Steps:**
- Set up custom domain (optional)
- Enable Vercel Analytics
- Configure monitoring/alerts
- Set up error tracking (Sentry)
