# 🔧 Image Upload Troubleshooting Guide

## ❌ Common Problems & Solutions

### Problem 1: "Cloudinary not configured" Error

**Kya check kare:**

1. `.env.local` file workspace root mein hai
2. Credentials sahi hain:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. Server restart kiya hai upload ke baad: `npm run dev`

**Cloudinary Cloud Name kaise find kare:**

1. https://console.cloudinary.com/console/ par login kare
2. Dashboard par **Cloud Name** dikhega
3. Usually lowercase hota hai (e.g., `dxxxxx123` ya `your-company-name`)

### Problem 2: Upload Failed with 401 Error

**Reason:** Invalid API credentials

**Solution:**

1. Cloudinary dashboard mein jaye
2. **Settings** → **Access Keys** tab
3. **API Key** aur **API Secret** verify kare
4. `.env.local` mein exact copy/paste kare
5. **IMPORTANT:** Koi extra spaces nahi hone chahiye
6. Server restart kare

### Problem 3: Upload Failed with Network Error

**Reason:** Internet connection ya CORS issue

**Solution:**

1. Internet connection check kare
2. Cloudinary console check kare - account active hai?
3. Browser console (F12) mein errors dekhe

### Problem 4: "Image size should be less than 5MB"

**Solution:**

1. Image compress kare: https://tinypng.com
2. Ya resize kare: https://squoosh.app
3. Recommended size: 1920x1080px ya usse chhota

---

## 🧪 Test Your Setup

### Step 1: Visit Test Page

1. Browser mein jaye: `http://localhost:3000/admin/test-upload`
2. Cloudinary configuration status dekhe
3. Test image upload try kare

### Step 2: Check Logs

**Browser Console (F12):**

```
🔄 Starting upload for: image.jpg Size: 123456
📡 Response status: 200
📦 Response data: {success: true, url: "..."}
✅ Upload successful: https://res.cloudinary.com/...
```

**Terminal/Server Logs:**

```
📥 Upload API called
✅ Cloudinary config found
📁 File received: {name: 'image.jpg', size: 123456}
🔄 File converted to buffer
☁️ Starting Cloudinary upload...
✅ Cloudinary upload success
```

### Step 3: Agar Errors Dikhe

**Error Format:**

- ❌ = Problem hai
- ✅ = Sab theek hai

**Common Error Messages:**

1. **"Missing cloud name"**
   - `.env.local` mein `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` set kare
2. **"Missing API key"**
   - `.env.local` mein `CLOUDINARY_API_KEY` set kare
3. **"Missing API secret"**

   - `.env.local` mein `CLOUDINARY_API_SECRET` set kare

4. **"Invalid credentials"**
   - Cloudinary dashboard se credentials fir se copy kare
   - Spelling mistakes check kare

---

## ✅ Correct .env.local Format

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123

# ❌ WRONG - Extra spaces
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dxxxxxx

# ❌ WRONG - Quotes
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dxxxxxx"

# ✅ CORRECT - No spaces, no quotes
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxx
```

---

## 🔍 How to Find Your Cloudinary Credentials

1. **Visit:** https://console.cloudinary.com/console/
2. **Login** with your account
3. **Dashboard** page par automatically khulega
4. **Top section** mein dikhega:

   - **Cloud Name** (e.g., dxxxxxx)
   - **API Key** (number)
   - Click **"API Secret"** → **"Reveal"** to see secret

5. **Copy** each value exactly:
   - No extra spaces
   - No quotes
   - Complete value

---

## 🚀 Quick Fix Checklist

Upload fail ho raha hai? Ye steps follow kare:

- [ ] `.env.local` file exists in project root
- [ ] Cloud name correct hai (usually lowercase)
- [ ] API key aur secret correct hain
- [ ] No extra spaces in .env.local
- [ ] Server restart kiya after adding credentials
- [ ] Internet connection working
- [ ] Test page try kiya: `/admin/test-upload`
- [ ] Browser console checked for errors
- [ ] Terminal logs checked for errors
- [ ] Image size < 5MB
- [ ] Image format supported (JPG, PNG, WebP)

---

## 📞 Still Having Issues?

1. **Test page kholo:** `http://localhost:3000/admin/test-upload`
2. **Console logs copy kare** (Browser F12)
3. **Terminal logs copy kare**
4. **Screenshot le** error message ka
5. **Check kare:** Cloudinary account active hai?

---

## 🎯 Example of Working Setup

**`.env.local`:**

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxy7z8abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

**Expected Logs (Success):**

```
Browser Console:
🔄 Starting upload for: hero.jpg Size: 234567
📡 Response status: 200
✅ Upload successful: https://res.cloudinary.com/dxy7z8abc/image/upload/...

Server Terminal:
📥 Upload API called
✅ Cloudinary config found: { cloud_name: 'dxy7z8abc', api_key: '12345...' }
📁 File received: { name: 'hero.jpg', size: 234567 }
☁️ Starting Cloudinary upload...
✅ Cloudinary upload success: https://res.cloudinary.com/...
```

---

**Last Updated:** 2025-10-26
