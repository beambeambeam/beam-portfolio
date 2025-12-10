# Pre-Deployment SEO Checklist

Before deploying your improved Beam Portfolio, complete these critical tasks:

## 🔴 CRITICAL - Must Complete Before Deploy

### 1. Update Domain References
Search and replace `https://yourwebsite.com` with your actual domain in:
- [ ] `apps/web/src/routes/__root.tsx` (2 locations)
- [ ] `apps/web/src/routes/index.tsx` (1 location)
- [ ] `apps/web/src/routes/blogs/index.tsx` (1 location)
- [ ] `apps/web/src/routes/blogs/$id.tsx` (2 locations)
- [ ] `apps/web/public/sitemap.xml` (3 locations)
- [ ] `apps/web/scripts/generate-sitemap.ts` (1 location)

**Quick Command:**
```bash
cd apps/web
grep -r "yourwebsite.com" src/
grep -r "yourwebsite.com" public/
grep -r "yourwebsite.com" scripts/
```

### 2. Add Favicon Files
Place these files in `apps/web/public/`:
- [ ] `favicon.ico`
- [ ] `favicon-16x16.png`
- [ ] `favicon-32x32.png`
- [ ] `apple-touch-icon.png`

**Generate at:** https://favicon.io/

### 3. Add Open Graph Image
- [ ] Create image (1200x630px recommended)
- [ ] Save as `apps/web/public/og-image.jpg` or `.png`
- [ ] Update meta tags in `__root.tsx` to reference it:
```tsx
{
  property: "og:image",
  content: "https://YOURDOMAIN.com/og-image.jpg"
}
```

## 🟡 HIGH PRIORITY - Complete Soon After Deploy

### 4. Google Search Console Setup
- [ ] Go to https://search.google.com/search-console
- [ ] Add your domain
- [ ] Verify ownership (DNS or HTML file method)
- [ ] Submit sitemap: `https://YOURDOMAIN.com/sitemap.xml`
- [ ] Request indexing for main pages

### 5. Update Sitemap with Blog Posts
- [ ] Open `apps/web/scripts/generate-sitemap.ts`
- [ ] Uncomment the blog posts section (around line 46-55)
- [ ] Update SITE_URL to your actual domain
- [ ] Add script to package.json:
```json
{
  "scripts": {
    "generate-sitemap": "bun run scripts/generate-sitemap.ts",
    "predeploy": "bun run generate-sitemap"
  }
}
```
- [ ] Run: `bun run generate-sitemap`

### 6. Set Up Analytics
- [ ] Create Google Analytics 4 property
- [ ] Add tracking code to your project
- [ ] Verify tracking is working
- [ ] Set up basic goals/conversions

## 🟢 NICE TO HAVE - Improve Over Time

### 7. Implement JSON-LD Structured Data
Use the components from `apps/web/src/components/seo/json-ld.tsx`:

**In `__root.tsx`:**
```tsx
import { Scripts, HeadContent } from "@tanstack/react-router"
import { WebsiteSchema, PersonSchema } from "@/components/seo/json-ld"

function RootDocument() {
  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
        <WebsiteSchema
          url="https://YOURDOMAIN.com"
          name="Beam Portfolio"
          description="Full-stack developer portfolio..."
        />
        <PersonSchema
          name="Beam"
          url="https://YOURDOMAIN.com"
          jobTitle="Full-Stack Developer"
          sameAs={["https://github.com/beambeambeam"]}
        />
      </head>
      <body>
        {/* ... */}
        <Scripts />
      </body>
    </html>
  )
}
```

**In blog detail page (`apps/web/src/routes/blogs/$id.tsx`):**
```tsx
import { BlogPostingSchema } from "@/components/seo/json-ld"

// In component:
<head>
  <HeadContent />
  <BlogPostingSchema
    headline={post.title}
    description={post.description || post.title}
    author="Beam"
    datePublished={post.publishedAt}
    url={`https://YOURDOMAIN.com/blogs/${id}`}
  />
</head>
```

### 8. Additional Pages
Create these pages for better SEO:
- [ ] About page (`/about`)
- [ ] Contact page (`/contact`)
- [ ] Projects page (`/projects`)
- [ ] Custom 404 page

### 9. Content Improvements
- [ ] Add featured images to blog posts
- [ ] Add alt text to all images
- [ ] Implement blog categories/tags
- [ ] Add social sharing buttons
- [ ] Create RSS feed

## 🧪 Testing After Deploy

### Test These URLs:
- [ ] `https://YOURDOMAIN.com/` - Homepage loads correctly
- [ ] `https://YOURDOMAIN.com/blogs` - Blog listing loads
- [ ] `https://YOURDOMAIN.com/blogs/[post-id]` - Blog post loads
- [ ] `https://YOURDOMAIN.com/sitemap.xml` - Sitemap accessible
- [ ] `https://YOURDOMAIN.com/robots.txt` - Robots.txt accessible

### SEO Validation Tools:
Run your deployed URLs through these:

1. **Open Graph & Twitter Cards**
   - [ ] https://www.opengraph.xyz/
   - [ ] https://cards-dev.twitter.com/validator

2. **Structured Data**
   - [ ] https://search.google.com/test/rich-results
   - [ ] https://validator.schema.org/

3. **Performance**
   - [ ] https://pagespeed.web.dev/
   - [ ] https://www.webpagetest.org/

4. **Mobile Friendly**
   - [ ] https://search.google.com/test/mobile-friendly

5. **Security**
   - [ ] https://www.ssllabs.com/ssltest/

### Expected Test Results:
- ✅ Open Graph preview shows title, description, image
- ✅ Twitter Card preview displays correctly
- ✅ Rich Results Test detects BlogPosting schema on posts
- ✅ PageSpeed score: 90+ (mobile and desktop)
- ✅ Mobile-Friendly Test passes
- ✅ SSL Test: Grade A

## 📊 Post-Launch Monitoring

### First Week:
- [ ] Check Google Search Console for crawl errors
- [ ] Verify pages are being indexed
- [ ] Monitor initial traffic in Analytics
- [ ] Check for any console errors in browser

### First Month:
- [ ] Review organic search traffic trends
- [ ] Check which keywords are driving traffic
- [ ] Identify top-performing content
- [ ] Look for improvement opportunities

### Ongoing:
- [ ] Weekly: Review Search Console
- [ ] Monthly: Analyze GA4 reports
- [ ] Quarterly: Full SEO audit

## 🚨 Common Issues & Fixes

### Issue: Pages Not Indexing
**Fix:** 
- Verify sitemap is accessible
- Check robots.txt isn't blocking
- Submit URL inspection in Search Console

### Issue: OG Images Not Showing
**Fix:**
- Verify image is accessible (try URL directly)
- Check image dimensions (1200x630px recommended)
- Use absolute URLs, not relative
- Clear social media cache (use debugger tools)

### Issue: Low PageSpeed Score
**Fix:**
- Optimize images (use WebP format)
- Enable caching on Cloudflare
- Minimize JavaScript
- Use code splitting

### Issue: Rich Results Not Showing
**Fix:**
- Validate JSON-LD syntax
- Ensure all required properties present
- Wait 1-2 weeks for Google to process
- Check Search Console for errors

## 📝 Deployment Commands

```bash
# Generate sitemap
cd apps/web
bun run generate-sitemap

# Build project
cd ../..
bun run build

# Deploy to Cloudflare
cd apps/web
bun run deploy
```

## ✅ Final Pre-Deploy Checklist

Before running `bun run deploy`:

- [ ] All `yourwebsite.com` replaced with actual domain
- [ ] Favicon files added
- [ ] OG image created and added
- [ ] Sitemap generated with actual domain
- [ ] Tested locally with `bun run dev`
- [ ] No TypeScript errors
- [ ] All SEO meta tags verified
- [ ] Git committed and pushed

## 🎉 Post-Deploy Success Checklist

After deploy completes:

- [ ] Visit homepage - everything loads
- [ ] Check blog posts - meta tags correct
- [ ] Test social sharing - preview looks good
- [ ] Verify sitemap accessible
- [ ] Submit to Google Search Console
- [ ] Share on social media to test OG tags
- [ ] Set up Analytics tracking
- [ ] Monitor for 24 hours for any issues

## 📞 Support Resources

- **Documentation**: See `apps/web/SEO_README.md`
- **Full Details**: See `apps/web/SEO_IMPROVEMENTS.md`
- **Task List**: See `apps/web/SEO_CHECKLIST.md`

---

**Remember:** SEO is a marathon, not a sprint. Focus on completing the critical items first, then improve over time.

Good luck with your launch! 🚀
