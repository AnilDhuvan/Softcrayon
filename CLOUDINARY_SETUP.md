# 📸 Cloudinary Image Upload Guide

## Step-by-Step Instructions to Upload Images to Cloudinary

### 1️⃣ Create Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up" (Free account available)
3. Complete registration

### 2️⃣ Get Your Cloudinary Credentials

1. Login to [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. Go to **Dashboard**
3. You'll see:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Show" to reveal)

### 3️⃣ Configure Environment Variables

1. Open `.env.local` file in project root
2. Replace with your actual values:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

Example:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dmyxxx123
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrs
```

### 4️⃣ Upload All Images

Run this command in terminal:

```bash
npm run upload-images
```

This will:

- ✅ Find all images in `src/assets/images/` folder
- ✅ Upload them to Cloudinary
- ✅ Organize them in folders (hero, courses, about, etc.)
- ✅ Generate `cloudinary-urls.json` with all URLs

### 5️⃣ Check Upload Results

1. Open `scripts/cloudinary-urls.json` to see all uploaded URLs
2. Login to [Cloudinary Console](https://console.cloudinary.com/)
3. Go to **Media Library** > **softcrayons** folder
4. You'll see all your images organized by folders!

### 6️⃣ Use Cloudinary URLs in Your Project

After upload, you can use the URLs from `cloudinary-urls.json`:

**Before:**

```typescript
image: "/images/hero/hero1.jpg";
```

**After:**

```typescript
image: "https://res.cloudinary.com/your-cloud/image/upload/v123/softcrayons/hero/hero1.jpg";
```

---

## 🎯 What Gets Uploaded?

All images from these folders:

- `src/assets/images/hero/` → Cloudinary: `softcrayons/hero/`
- `src/assets/images/courses/` → Cloudinary: `softcrayons/courses/`
- `src/assets/images/about/` → Cloudinary: `softcrayons/about/`
- `src/assets/images/avatar/` → Cloudinary: `softcrayons/avatar/`
- `src/assets/images/client/` → Cloudinary: `softcrayons/client/`
- And all other subfolders...

---

## 🔧 Troubleshooting

**Error: "Cloud name not found"**

- Check your `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
- Make sure there are no quotes or extra spaces

**Error: "Invalid API credentials"**

- Verify `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
- Click "Show" on Cloudinary dashboard to see API Secret

**No images found**

- Check if images exist in `src/assets/images/`
- Supported formats: .jpg, .jpeg, .png, .gif, .webp, .svg

---

## 📦 Cloudinary Features You Get:

✅ **Free Plan Includes:**

- 25 GB storage
- 25 GB monthly bandwidth
- Image optimization
- Automatic format conversion
- Responsive images
- CDN delivery

✅ **Benefits:**

- Fast image loading worldwide
- Automatic image optimization
- Responsive images for different devices
- No need to store images in your repository
- Easy image transformations (resize, crop, etc.)

---

## 🚀 Next Steps

After upload, update your data files:

1. **Hero Slides** (`src/assets/data/heroSlides.ts`):

   ```typescript
   image: "https://res.cloudinary.com/your-cloud/...";
   ```

2. **Courses** (`src/assets/data/courses.ts`):

   ```typescript
   image: "https://res.cloudinary.com/your-cloud/...";
   ```

3. **All other data files** with image references

---

## 💡 Pro Tips

1. **Image Transformations**: Cloudinary URL can auto-resize:

   ```
   https://res.cloudinary.com/.../w_400,h_300,c_fill/image.jpg
   ```

2. **Automatic Format**: Use `f_auto` for best format:

   ```
   https://res.cloudinary.com/.../f_auto,q_auto/image.jpg
   ```

3. **Lazy Loading**: Images load faster with Cloudinary CDN

---

Need help? Check [Cloudinary Docs](https://cloudinary.com/documentation) 📚
