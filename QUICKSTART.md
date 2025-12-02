# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free, optional for contact form)

---

## Step 1: Local Setup (1 minute)

```bash
# Clone your repository (if not already done)
cd projekt_trae_builder

# Create environment file
cp .env.example .env.local

# Edit .env.local with your credentials
# (Supabase URL, API keys, etc.)
```

---

## Step 2: Local Testing (1 minute)

```bash
# Option A: Python 3
python -m http.server 8000

# Option B: Node.js
npx http-server

# Visit: http://localhost:8000
```

**Test these:**
- [ ] Theme toggle works (🌙/☀️)
- [ ] All pages load
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] Contact form validates

---

## Step 3: Push to GitHub (1 minute)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 4: Deploy to Vercel (1 minute)

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select your GitHub repository
4. Click **"Import"**
5. In settings, add **Environment Variables:**
   ```
   SUPABASE_URL = your-url
   SUPABASE_FUNCTIONS_URL = your-functions-url
   SUPABASE_ANON_KEY = your-anon-key
   DEPLOY_ENV = production
   ```
6. Click **"Deploy"**

**Your site is now live!** 🎉

---

## Step 5: Test Production (1 minute)

Visit your Vercel deployment URL (shown in dashboard)

- [ ] Theme toggle works
- [ ] All pages load
- [ ] Navigation works
- [ ] Contact form works

---

## Custom Domain (Optional)

In Vercel project settings → **Domains**:
1. Add your domain
2. Follow DNS instructions
3. Done! (24-48 hours to propagate)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Theme not working | Check if `data-theme` in DevTools |
| Form not submitting | Verify Supabase credentials in `.env.local` |
| Site not loading | Check Vercel deployment logs |
| Images not showing | Verify images in `/images/` folder |

---

## Common Commands

```bash
# Test locally
python -m http.server 8000

# Validate setup
node validate-setup.js

# Check pre-deployment items
cat CHECKLIST.md

# View full deployment guide
cat DEPLOYMENT.md
```

---

## Files to Customize

1. **`index.html`** - Update your name and bio
2. **`projects.html`** - Add your projects
3. **`about.html`** - Update about section
4. **`contact.html`** - Update contact info
5. **`/images/`** - Add project screenshots

---

## Important Notes

⚠️ **Never commit:**
- `.env.local` (contains secret keys)
- `node_modules/` (if using build tools)

✅ **Always:**
- Use environment variables for secrets
- Test locally before deploying
- Check Vercel deployment logs
- Monitor error logs after deployment

---

## Need Help?

1. Check `DEPLOYMENT.md` for detailed instructions
2. Run `node validate-setup.js` to check setup
3. See `CHECKLIST.md` for complete pre-deployment guide
4. Review `README.md` for feature documentation

---

## Success! 🎊

Your portfolio is now deployed and accessible online.

**Next steps:**
- Monitor performance
- Update content regularly
- Share your portfolio
- Track visitor analytics

---

**Estimated time to deployment: 5 minutes ⏱️**

*For detailed instructions, see DEPLOYMENT.md*
