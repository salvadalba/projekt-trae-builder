# Pre-Deployment Checklist

## Content & Customization

- [ ] **Portfolio Name** - Replace "John Doe" with your name
  - Update in all HTML files (index, about, contact, projects)
  - Update in footer copyright notice
  - Update in page titles

- [ ] **Profile Information**
  - [ ] Update email address
  - [ ] Update phone number
  - [ ] Update location
  - [ ] Update social media links (LinkedIn, GitHub, Twitter)
  - [ ] Update resume PDF link
  - [ ] Write about/bio section

- [ ] **Projects**
  - [ ] Add at least 3-4 projects
  - [ ] Add project images (recommended: 600x400px)
  - [ ] Write project descriptions
  - [ ] Add technology tags
  - [ ] Add project links
  - [ ] Ensure images are in `/images/` folder

- [ ] **Contact Information**
  - [ ] Verify email is correct
  - [ ] Verify all social links work
  - [ ] Test contact form validation

## Technical Setup

- [ ] **Environment Configuration**
  - [ ] Create `.env.local` from `.env.example`
  - [ ] Add Supabase URL and keys
  - [ ] Add Sentry DSN (if using)
  - [ ] Update DEPLOY_ENV variable
  - [ ] **NEVER commit `.env.local` to Git**

- [ ] **Supabase Setup** (if using contact form)
  - [ ] Create Supabase project
  - [ ] Create messages table with RLS
  - [ ] Deploy Edge Function for form submission
  - [ ] Get API credentials
  - [ ] Test form submission locally

- [ ] **GitHub Repository**
  - [ ] Initialize Git repository
  - [ ] Add `.gitignore` file
  - [ ] Create initial commit
  - [ ] Push to GitHub
  - [ ] Verify repository is public or private as desired

- [ ] **GitHub Secrets** (for CI/CD)
  - [ ] Add `VERCEL_TOKEN`
  - [ ] Add `VERCEL_ORG_ID`
  - [ ] Add `VERCEL_PROJECT_ID`
  - [ ] Verify secrets are not exposed

## Local Testing

- [ ] **Development Server**
  - [ ] Run local server (Python/Node)
  - [ ] Verify site loads without errors
  - [ ] Check browser console for warnings

- [ ] **Functionality Testing**
  - [ ] Test dark/light theme toggle
  - [ ] Test theme persistence on reload
  - [ ] Test all navigation links
  - [ ] Test smooth scrolling
  - [ ] Test mobile menu on small screens
  - [ ] Test form validation (empty fields)
  - [ ] Test form validation (invalid email)
  - [ ] Test form submission
  - [ ] Test particle animations

- [ ] **Browser Testing**
  - [ ] Chrome/Chromium
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - [ ] Mobile Safari (iOS)
  - [ ] Chrome Mobile (Android)

- [ ] **Responsive Design Testing**
  - [ ] Mobile: 375px width
  - [ ] Tablet: 768px width
  - [ ] Desktop: 1024px+ width
  - [ ] Test all pages on each breakpoint
  - [ ] Verify images scale properly
  - [ ] Verify text is readable
  - [ ] Verify buttons are clickable

- [ ] **Accessibility Testing**
  - [ ] Test keyboard navigation (Tab key)
  - [ ] Test focus states visible
  - [ ] Test screen reader compatibility
  - [ ] Verify color contrast ratios
  - [ ] Check ARIA labels

- [ ] **Performance Testing**
  - [ ] Run Lighthouse audit
  - [ ] Check Core Web Vitals
  - [ ] Verify images are optimized
  - [ ] Check page load time
  - [ ] Test on slow 3G connection

## Vercel Deployment Setup

- [ ] **Create Vercel Project**
  - [ ] Sign up for Vercel account (if needed)
  - [ ] Connect GitHub repository
  - [ ] Select project
  - [ ] Click "Import"

- [ ] **Configure Vercel Project**
  - [ ] Set project name
  - [ ] Set root directory to `.`
  - [ ] Add environment variables
  - [ ] Set build command (none needed for static site)
  - [ ] Set output directory (none needed)

- [ ] **Add Environment Variables in Vercel**
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_FUNCTIONS_URL`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `SENTRY_DSN` (optional)
  - [ ] `DEPLOY_ENV=production`

- [ ] **Deploy**
  - [ ] Click "Deploy"
  - [ ] Wait for deployment to complete
  - [ ] Verify deployment URL works
  - [ ] Check that site loads correctly

## Domain & DNS

- [ ] **Custom Domain** (if applicable)
  - [ ] Verify domain ownership
  - [ ] Add domain in Vercel project settings
  - [ ] Configure DNS records:
    - [ ] Add CNAME or update nameservers
    - [ ] Verify DNS propagation (24-48 hours)
  - [ ] Verify HTTPS certificate is issued
  - [ ] Test custom domain loads correctly

- [ ] **Update Links**
  - [ ] Update domain in `vercel.json`
  - [ ] Update Open Graph meta tags
  - [ ] Update sitemap if applicable

## Post-Deployment Verification

- [ ] **Test Deployment**
  - [ ] Visit production domain
  - [ ] Test all pages load
  - [ ] Test dark/light theme
  - [ ] Test form submission
  - [ ] Test all links
  - [ ] Check console for errors

- [ ] **Performance Verification**
  - [ ] Run Lighthouse audit on production
  - [ ] Check Core Web Vitals
  - [ ] Verify images load quickly
  - [ ] Check page load metrics

- [ ] **SEO & Meta Tags**
  - [ ] Verify page titles are unique
  - [ ] Verify meta descriptions exist
  - [ ] Verify Open Graph tags
  - [ ] Test social media sharing preview
  - [ ] Check robots.txt exists

- [ ] **Security Verification**
  - [ ] Verify HTTPS is enabled
  - [ ] Verify no console errors
  - [ ] Check Security headers
  - [ ] Verify environment variables are hidden

- [ ] **Analytics & Monitoring** (if configured)
  - [ ] Verify Vercel Analytics working
  - [ ] Verify Sentry is tracking errors
  - [ ] Set up alerts for errors

## CI/CD Verification

- [ ] **GitHub Actions**
  - [ ] Workflow file is valid
  - [ ] Secrets are configured
  - [ ] Test workflow by pushing to main
  - [ ] Verify automatic deployment works
  - [ ] Check workflow logs for errors

- [ ] **Branch Protection** (optional)
  - [ ] Require PR reviews
  - [ ] Require status checks
  - [ ] Restrict who can push to main

## Monitoring & Maintenance

- [ ] **Setup Monitoring**
  - [ ] Enable Vercel Analytics
  - [ ] Set up error notifications
  - [ ] Configure log viewing

- [ ] **Backup & Version Control**
  - [ ] Ensure Git history is preserved
  - [ ] Tag production release
  - [ ] Document deployment details

- [ ] **Documentation**
  - [ ] README.md is complete
  - [ ] DEPLOYMENT.md is complete
  - [ ] All configuration is documented
  - [ ] Setup instructions are clear

## Troubleshooting Preparation

- [ ] Create list of common issues
- [ ] Document rollback procedure
- [ ] Test rollback process
- [ ] Document emergency contacts

## Final Review

- [ ] All items in this checklist completed
- [ ] No warnings or errors in console
- [ ] Site works on all tested browsers
- [ ] Performance meets standards
- [ ] Ready to announce/publish

---

## Quick Deployment Command

After completing checklist, deploy with:

```bash
# Push to main branch to trigger CI/CD
git push origin main

# Or manual Vercel deployment:
vercel --prod
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Web Vitals Guide](https://web.dev/vitals/)

## Version Info

- Created: 2024
- Last Updated: December 2024
- Portfolio Framework: HTML/CSS/JavaScript
- Deployment Platform: Vercel
- Database: Supabase
