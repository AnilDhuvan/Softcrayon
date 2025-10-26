# 🚀 Quick Start: Upload Images to Cloudinary

## ⚡ 5-Minute Setup

### Step 1: Get Cloudinary Account (2 minutes)

```
1. Open: https://cloudinary.com/users/register_free
2. Sign up (Free account - no credit card needed)
3. Verify email
```

### Step 2: Copy Your Credentials (1 minute)

```
1. Login: https://console.cloudinary.com/
2. Dashboard shows:
   Cloud Name: dxxxxxxx
   API Key: 123456789012345
   API Secret: (click "Show" to reveal)
```

### Step 3: Update .env.local File (1 minute)

```bash
# Open: .env.local
# Replace these values with YOUR credentials:

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_secret_here
```

### Step 4: Upload All Images (1 minute)

```bash
npm run upload-images
```

### Step 5: Check Results

```
✅ Images uploaded to Cloudinary
✅ URLs saved in: scripts/cloudinary-urls.json
✅ View on: https://console.cloudinary.com/console/media_library
```

---

## 📝 Example .env.local File

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dmyexample123
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefGHIJKLmnopQRST
```

---

## 🎯 What Happens?

**Before:** Images stored locally

```
src/assets/images/hero/hero1.jpg  → Only on your computer
```

**After:** Images on Cloudinary CDN

```
https://res.cloudinary.com/dmyexample/image/upload/softcrayons/hero/hero1.jpg
→ Available worldwide, super fast!
```

---

## 💡 Using Cloudinary URLs

### Option 1: Manual Update

Open data files and replace URLs:

**Hero Slides** (`src/assets/data/heroSlides.ts`):

```typescript
// Before
image: "/images/hero/hero1.jpg";

// After
image: "https://res.cloudinary.com/your-cloud/image/upload/softcrayons/hero/hero1.jpg";
```

### Option 2: Use Helper Functions

```typescript
import { getHeroImage, getCourseImage } from "@/utils/cloudinary";

// Automatically converts to Cloudinary URL
const heroUrl = getHeroImage("/images/hero/hero1.jpg");
const courseUrl = getCourseImage("/images/courses/course1.jpg");
```

---

## ✅ Benefits

✨ **Fast Loading**: Images load from CDN (worldwide)
✨ **Auto Optimization**: Automatic format & size optimization  
✨ **Responsive**: Different sizes for mobile/desktop
✨ **Free**: 25GB storage & bandwidth
✨ **Easy Management**: Edit/delete from Cloudinary dashboard

---

## 🆘 Common Issues

**❌ "Cloud name not found"**

```
Fix: Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local
     No quotes, no spaces, just the value
```

**❌ "Invalid credentials"**

```
Fix: Verify API Key & Secret from Cloudinary dashboard
     Click "Show" to reveal API Secret
```

**❌ "No images found"**

```
Fix: Ensure images exist in src/assets/images/ folder
     Supported: .jpg, .png, .webp, .gif, .svg
```

---

## 📞 Need Help?

- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Support**: https://support.cloudinary.com
- **Community**: https://community.cloudinary.com

---

**Ready? Run:** `npm run upload-images` 🚀
