# Deployment Guide

## Pre-Deployment Checklist

### 1. Content Verification
- [ ] Update portfolio name (replace "John Doe")
- [ ] Add real project images to `/images/`
- [ ] Update project descriptions and links
- [ ] Verify all social media links work
- [ ] Update contact information
- [ ] Add/update resume PDF

### 2. Configuration
- [ ] Create `.env.local` from `.env.example`
- [ ] Add Supabase credentials
- [ ] Configure custom domain
- [ ] Update site URL in settings

### 3. Testing
- [ ] Test all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Test form submission
- [ ] Test theme switching
- [ ] Test all navigation links
- [ ] Check image loading
- [ ] Test on different browsers

## Vercel Deployment Steps

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### Step 2: Configure Project

1. **Project Name**: Enter your project name
2. **Framework**: Select "Other"
3. **Root Directory**: `.` (current)
4. Click "Continue"

### Step 3: Environment Variables

Add these in Vercel dashboard under "Environment Variables":

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your-anon-key
SENTRY_DSN=your-sentry-dsn (optional)
DEPLOY_ENV=production
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your site is now live at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `vercel.json` with your domain

## GitHub Actions Setup

### Enable Workflows

1. Go to your GitHub repository
2. Settings → Actions → General
3. Enable "All actions and reusable workflows"
4. Save

### Configure Secrets

Add these in repository settings under "Secrets and variables" → "Actions":

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

Get these values:
- **VERCEL_TOKEN**: Vercel Account Settings → Tokens
- **VERCEL_ORG_ID**: Vercel dashboard URL shows org ID
- **VERCEL_PROJECT_ID**: Vercel project settings

## Supabase Setup (Contact Form)

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Enter project details
4. Wait for setup to complete

### 2. Create Messages Table

```sql
-- In Supabase SQL Editor, run:

CREATE TABLE messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  newsletter BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy for inserts
CREATE POLICY "Allow public inserts" ON messages
  FOR INSERT WITH CHECK (true);
```

### 3. Get API Keys

1. Go to Supabase project settings
2. API → Project API Keys
3. Copy:
   - Project URL
   - anon/public key
   - Create edge function URL

### 4. Create Edge Function (Optional)

For backend processing, create an Edge Function:

```typescript
// supabase/functions/contact-submit/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message, budget, newsletter } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    )

    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, subject, message, budget, newsletter }])

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
```

Deploy with:
```bash
supabase functions deploy contact-submit
```

## DNS Configuration

### For Custom Domain

1. **Vercel suggests nameservers** - Update your domain registrar
2. **Add CNAME record** - Point to Vercel's hosting
3. **SSL Certificate** - Automatically issued by Let's Encrypt

Example CNAME:
```
CNAME: www.yourdomain.com → cname.vercel-dns.com.
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Visit your domain
- [ ] Test all pages
- [ ] Check mobile responsiveness
- [ ] Verify form submission works
- [ ] Check console for errors

### 2. Setup Monitoring

1. **Vercel Analytics**
   - Dashboard → Analytics
   - Enable Web Vitals

2. **Sentry (optional)**
   - Create account at [Sentry.io](https://sentry.io)
   - Get DSN
   - Add to environment variables

### 3. Performance Testing

1. Run Lighthouse audit in DevTools
2. Check Core Web Vitals
3. Monitor with PageSpeed Insights

### 4. Maintenance

- Monitor uptime
- Check error logs
- Update content regularly
- Keep dependencies updated
- Review analytics

## Troubleshooting

### Deployment Fails

**Check:**
- GitHub Actions logs
- Environment variables set
- HTML files valid
- No build errors

### Site Not Loading

**Check:**
- Domain DNS configuration
- Vercel deployment status
- Browser cache cleared
- Network connectivity

### Form Not Working

**Check:**
- Supabase credentials correct
- Table created successfully
- RLS policies correct
- Function deployed (if using)
- Browser console for errors

### Performance Issues

**Optimize:**
- Compress images
- Minify CSS/JS
- Enable caching headers
- Use CDN for assets
- Check file sizes

## Rollback Procedure

If deployment has issues:

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click three dots → "Promote to Production"
4. Confirm

## Security Best Practices

- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Validate form input
- [ ] Use Row Level Security (RLS) in Supabase
- [ ] Regularly update dependencies
- [ ] Monitor for vulnerabilities

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
