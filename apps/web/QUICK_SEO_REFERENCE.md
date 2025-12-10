# Quick SEO Reference Card

## 🚀 Before You Deploy - 3 Critical Tasks

### 1️⃣ Update Domain (5 minutes)
Find & replace `yourwebsite.com` in these files:
```
apps/web/src/routes/__root.tsx
apps/web/src/routes/index.tsx
apps/web/src/routes/blogs/index.tsx
apps/web/src/routes/blogs/$id.tsx
apps/web/public/sitemap.xml
apps/web/scripts/generate-sitemap.ts
```

### 2️⃣ Add Favicon (2 minutes)
Generate at https://favicon.io/ and add to `apps/web/public/`:
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png

### 3️⃣ Add OG Image (5 minutes)
- Create 1200x630px image
- Save as `apps/web/public/og-image.jpg`
- Add to `__root.tsx`:
```tsx
{
  property: "og:image",
  content: "https://YOURDOMAIN.com/og-image.jpg"
}
```

---

## 📊 Quick Test Checklist

After deploying, test these 3 URLs:

### 1. Open Graph Preview
https://www.opengraph.xyz/
- Paste your URL
- Should show title, description, image

### 2. Twitter Card
https://cards-dev.twitter.com/validator
- Paste your URL
- Should show Twitter card preview

### 3. PageSpeed
https://pagespeed.web.dev/
- Paste your URL
- Aim for 90+ score

---

## 🔧 Quick Commands

```bash
# Generate sitemap
cd apps/web && bun run generate-sitemap

# Build
cd ../.. && bun run build

# Deploy
cd apps/web && bun run deploy
```

---

## 📁 SEO Files Overview

```
apps/web/
├── SEO_README.md              ← Start here! Quick guide
├── SEO_IMPROVEMENTS.md        ← Full details of changes
├── SEO_CHECKLIST.md           ← Complete task list
└── QUICK_SEO_REFERENCE.md     ← This file

/
└── DEPLOYMENT_SEO_CHECKLIST.md ← Pre-deploy checklist
```

---

## ✅ What Was Already Done

✓ Meta tags (title, description, keywords)
✓ Open Graph tags (Facebook, LinkedIn)
✓ Twitter Card tags
✓ Canonical URLs
✓ Sitemap.xml
✓ Schema.org markup on blog posts
✓ Semantic HTML
✓ Improved content descriptions
✓ JSON-LD components ready to use

---

## 🎯 Priority After Deploy

**Week 1:**
1. Set up Google Search Console
2. Submit sitemap
3. Set up Google Analytics

**Month 1:**
1. Add JSON-LD structured data
2. Create OG images for each blog post
3. Monitor Search Console for errors

**Ongoing:**
1. Write quality content
2. Share on social media
3. Monitor analytics monthly

---

## 💡 SEO Quick Tips

1. **Content is #1** - Write valuable, original content
2. **Be Patient** - SEO takes 3-6 months to show results
3. **Update Regularly** - Fresh content helps rankings
4. **Mobile First** - Test on mobile devices
5. **Speed Matters** - Optimize images, use caching
6. **Share Often** - Promote on social media
7. **Build Links** - Get other sites to link to you
8. **Monitor Weekly** - Check Search Console regularly

---

## 🆘 Common Issues

**Q: My pages aren't indexed**
A: Submit sitemap to Google Search Console, wait 1-2 weeks

**Q: OG images not showing**
A: Use absolute URLs, verify image is accessible, clear cache

**Q: Low PageSpeed score**
A: Optimize images, enable Cloudflare caching, minimize JS

**Q: No organic traffic yet**
A: SEO takes time. Keep creating quality content.

---

## 📞 Quick Links

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **OG Tester**: https://www.opengraph.xyz/
- **PageSpeed**: https://pagespeed.web.dev/
- **Favicon Generator**: https://favicon.io/

---

## 🎓 Learn More

- Read `SEO_README.md` for complete guide
- Check `SEO_IMPROVEMENTS.md` for technical details
- Follow `SEO_CHECKLIST.md` for task-by-task implementation

---

**Remember:** Complete the 3 critical tasks before deploying! 
Then test with the 3 quick tests after deploy.

Good luck! 🍀
