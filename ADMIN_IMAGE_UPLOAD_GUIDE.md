# Admin Panel - Image Upload Guide (Hindi/English)

## 🎯 Admin ke liye - Hero Image Upload kaise kare

### Step 1: Cloudinary Setup (Ek baar karna hai)

1. **Cloudinary Account banaye**:

   - Website: https://cloudinary.com
   - Sign up karke free account banaye

2. **Credentials copy kare**:

   - Dashboard → Settings → API Keys
   - Teen values copy kare:
     - Cloud Name
     - API Key
     - API Secret

3. **Project mein credentials set kare**:
   - File open kare: `.env.local`
   - Copy kiye values paste kare:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=apka_cloud_name
   CLOUDINARY_API_KEY=apki_api_key
   CLOUDINARY_API_SECRET=apki_api_secret
   ```
   - Save kare aur server restart kare

### Step 2: Hero Image Upload kare (Admin Panel se)

1. **Admin Panel kholen**:

   - Login kare admin panel mein
   - Left sidebar mein "Hero Slides" click kare

2. **New Hero Slide add kare**:

   - "Add Hero Slide" button click kare
   - Dialog open hoga

3. **Image Upload kare**:

   - **Title**, **Subtitle**, **Description** fill kare
   - **Hero Image** section mein:
     - "Click to select image" button dikhega
     - Button click kare
     - Computer se image choose kare (JPG, PNG, WebP)
     - Maximum size: 5MB
   - Image upload hoga automatically Cloudinary par
   - Success message aayega: "Image uploaded successfully!"
   - Image URL automatically fill ho jayega

4. **Baaki fields fill kare**:

   - Button Text (e.g., "Start Learning")
   - Button Link (e.g., "#courses")
   - Order number (slide ka order)
   - Active/Inactive toggle

5. **Save kare**:

   - "Add" button click kare
   - Hero slide save ho jayega

6. **Frontend par dekhe**:
   - Homepage par jaye
   - Hero section mein aapka image slider mein dikhega

### Step 3: Existing Slide ka Image Update kare

1. Hero Slides list mein Edit (pencil) icon click kare
2. Existing image dikhega with X button
3. Options:
   - **Image remove kare**: X button click kare
   - **Naya image upload kare**: "Click to select image" button use kare
4. Update button click kare

---

## 📸 Image Upload Features

### Supported Formats

- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF

### Image Requirements

- **Maximum Size**: 5MB
- **Recommended Size**: 1920x1080px (landscape)
- **Aspect Ratio**: 16:9 (best for hero section)

### Upload Process

1. **Select Image** → Image preview dikhega
2. **Auto Upload** → Cloudinary par automatic upload hoga
3. **URL Auto-fill** → Image URL field mein automatically bhara jayega
4. **Save Slide** → Database mein save hoga

### Upload Status Messages

- 🔄 **"Uploading..."** → Image upload ho raha hai
- ✅ **"Image uploaded successfully!"** → Upload complete
- ❌ **Error messages** → Agar koi problem ho

---

## 🔧 Troubleshooting (Agar problem aaye)

### Problem 1: Upload Failed

**Solution**:

- Internet connection check kare
- .env.local mein credentials sahi hain ya nahi dekhe
- Server restart kare: `npm run dev` stop karke fir se start kare

### Problem 2: Image Not Showing

**Solution**:

- Browser refresh kare (Ctrl+F5)
- Slide "Active" hai ya nahi check kare
- Image URL field check kare - URL properly filled hai ya nahi

### Problem 3: "Please select an image file"

**Solution**:

- Sirf image files select kare (JPG, PNG, WebP)
- Video ya PDF files nahi chalenge

### Problem 4: "Image size should be less than 5MB"

**Solution**:

- Image compress kare online tool se (tinypng.com)
- Ya chhoti size ki image use kare

---

## 📁 Cloudinary File Organization

### Folder Structure

Images automatically organize hote hain:

```
softcrayons/
  ├── hero/         ← Hero slider images
  ├── courses/      ← Course images (future)
  ├── instructors/  ← Instructor photos (future)
  └── blog/         ← Blog post images (future)
```

### File Naming

- Automatic unique filename generation
- Original filename preserved
- No duplicate files

---

## 🚀 Quick Start Checklist

**Pehli baar setup:**

- [ ] Cloudinary account bana liya
- [ ] API credentials copy kar liye
- [ ] .env.local file mein credentials paste kar diye
- [ ] Server restart kar diya

**Image upload karne ke liye:**

- [ ] Admin panel mein login kiya
- [ ] Hero Slides page khola
- [ ] Add Hero Slide click kiya
- [ ] Image select karke upload kiya
- [ ] Form fill karke save kiya
- [ ] Frontend par check kiya

---

## 📞 Support

Agar koi problem aaye toh:

1. Error message screenshot le
2. Browser console check kare (F12)
3. .env.local credentials verify kare
4. Server logs dekhe

---

## 🎨 Image Best Practices

### Hero Images ke liye:

- **Size**: 1920x1080px ya similar 16:9 ratio
- **File Format**: WebP (best) ya JPG (good compression)
- **Content**: Clear, high-quality, relevant to coaching institute
- **Text Overlay**: Image mein zyada text na ho (hero section mein text alag se add hota hai)

### Quality vs Size:

- High quality: Professional look
- Optimized size: Fast loading
- Balance: Cloudinary automatically optimize karta hai

---

## ✨ Advanced Features (Coming Soon)

- [ ] Image cropping tool
- [ ] Multiple image upload
- [ ] Image gallery browser
- [ ] Drag & drop upload
- [ ] Automatic image optimization
- [ ] Alt text for SEO

---

**Version**: 1.0  
**Last Updated**: 2025  
**Platform**: Next.js 16 + Cloudinary
