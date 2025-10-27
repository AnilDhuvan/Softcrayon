# 🚀 Google Sheets + Apps Script Integration

## Overview

Hero slides aur inquiries ab Google Sheets mein store hongi. Bilkul simple aur free solution!

---

## 📋 Step 1: Google Sheet Setup

### Create New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: **"SoftCrayons Database"**

### Sheet 1: **HeroSlides**

Create columns (A to I):

| A   | B     | C        | D           | E     | F       | G       | H        | I     |
| --- | ----- | -------- | ----------- | ----- | ------- | ------- | -------- | ----- |
| id  | title | subtitle | description | image | ctaText | ctaLink | isActive | order |

**Sample Data:**

```
slide-1 | Transform Your Future | WELCOME TO SOFTCRAYONS | Join India's leading... | https://... | Get Started | /frontend/courses | TRUE | 1
slide-2 | Expert Learning      | QUALITY EDUCATION     | Learn from industry... | https://... | Explore     | /frontend/about   | TRUE | 2
```

### Sheet 2: **Inquiries**

Create columns (A to F):

| A         | B    | C     | D     | E       | F      |
| --------- | ---- | ----- | ----- | ------- | ------ |
| timestamp | name | email | phone | message | status |

**Note:** Data automatically add hoga jab user inquiry submit karega!

---

## 💻 Step 2: Apps Script Setup

### Add Script

1. Google Sheet mein **Extensions** → **Apps Script** click karo
2. `Code.gs` file open hogi
3. Existing code DELETE karo
4. `APPS_SCRIPT_CODE.gs` file ka saara code COPY karo
5. Apps Script editor mein PASTE karo

### Configure Script

Line 5 aur 9 pe update karo:

```javascript
const SECRET_TOKEN = "APNA_STRONG_PASSWORD_123"; // Change this!
const SHEET_ID = "YOUR_ACTUAL_SHEET_ID_HERE"; // Sheet ID add karo
```

**Sheet ID kaise find kare?**

- Google Sheet URL dekho:
- `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`
- Sheet ID hai: `1ABC123XYZ456`

### Save & Deploy

1. **Save** button click karo (💾 icon)
2. **Deploy** → **New deployment**
3. **Select type** → **Web app**
4. Settings:
   - **Description:** "SoftCrayons API"
   - **Execute as:** Me
   - **Who has access:** Anyone
5. **Deploy** click karo
6. **Authorize access** → Your Google account select karo
7. **Allow** all permissions
8. **Copy** the Web App URL:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## 🔧 Step 3: Next.js Configuration

### Update `.env.local`

File already updated hai, bas values change karo:

```bash
# Paste your Web App URL here
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec

# Same token as Apps Script
NEXT_PUBLIC_APPS_SCRIPT_TOKEN=APNA_STRONG_PASSWORD_123
```

### Restart Server

```bash
npm run dev
```

---

## ✅ Step 4: Testing

### Test Hero Slides

1. Google Sheet mein **HeroSlides** tab mein sample data add karo
2. Website refresh karo
3. Hero slider mein slides dikhengi! 🎉

### Test Inquiry Form

1. Website pe inquiry form fill karo
2. Submit karo
3. Google Sheet ke **Inquiries** tab mein check karo
4. Data automatically add ho jayega! ✨

---

## 🎯 How It Works

```
┌─────────────┐
│  Next.js    │
│  Website    │
└──────┬──────┘
       │
       │ fetch()
       ▼
┌──────────────────┐
│  Apps Script     │
│  Web App (API)   │
└──────┬───────────┘
       │
       │ read/write
       ▼
┌──────────────────┐
│  Google Sheets   │
│  (Database)      │
└──────────────────┘
```

### On Page Load:

1. Frontend calls Apps Script URL
2. Apps Script reads Google Sheets
3. Returns hero slides data as JSON
4. Frontend displays slides in Swiper

### On Inquiry Submit:

1. Frontend sends inquiry data to Apps Script
2. Apps Script writes to Google Sheets
3. Returns success response
4. User sees success message

---

## 🔐 Security Features

✅ **Token Authentication** - Only requests with correct token work
✅ **Server-side Validation** - Apps Script validates all data
✅ **HTTPS Only** - All communication encrypted
✅ **No Direct Sheet Access** - Users can't modify sheet directly

---

## 📱 Features

### Hero Slides Management

- ✅ Add/Edit/Delete slides directly in Google Sheet
- ✅ Set active/inactive status
- ✅ Control display order
- ✅ No code changes needed!

### Inquiry Collection

- ✅ Auto-saves to Google Sheets
- ✅ Timestamp added automatically
- ✅ Easy to export/analyze data
- ✅ No database setup needed!

---

## 🎨 Benefits

| Feature             | Benefit                                    |
| ------------------- | ------------------------------------------ |
| **No Database**     | Free, no MongoDB/PostgreSQL needed         |
| **Easy Updates**    | Edit Google Sheet = instant website update |
| **Team Access**     | Multiple people can manage content         |
| **Version History** | Google Sheets tracks all changes           |
| **Export Data**     | Download as Excel/CSV anytime              |
| **No Coding**       | Non-technical team can manage              |

---

## 🔧 Troubleshooting

### Slides not showing?

1. Check browser console for errors
2. Verify `.env.local` has correct URL and token
3. Check Apps Script deployment is active
4. Ensure Google Sheet has data in **HeroSlides** tab
5. Restart dev server: `npm run dev`

### Inquiry not saving?

1. Check Apps Script token matches `.env.local`
2. Verify **Inquiries** sheet exists (or will auto-create)
3. Check Apps Script execution log for errors
4. Test Apps Script URL in browser

### Apps Script errors?

1. Go to Apps Script → **Executions** tab
2. Check error messages
3. Verify SHEET_ID is correct
4. Ensure permissions are granted

---

## 📊 Sample Google Sheet Structure

### HeroSlides Tab:

```
| id      | title             | subtitle         | description              | image                | ctaText     | ctaLink          | isActive | order |
|---------|-------------------|------------------|--------------------------|----------------------|-------------|------------------|----------|-------|
| slide-1 | Transform Future  | WELCOME TO SC    | Join India's leading...  | https://img.url/1    | Get Started | /frontend/courses| TRUE     | 1     |
| slide-2 | Expert Learning   | QUALITY EDUCATION| Learn from industry...   | https://img.url/2    | Explore     | /frontend/about  | TRUE     | 2     |
```

### Inquiries Tab:

```
| timestamp           | name        | email              | phone      | message          | status |
|---------------------|-------------|--------------------|------------|------------------|--------|
| 2025-01-15 10:30:00 | Anil Kumar  | anil@example.com   | 9876543210 | Want to join...  | new    |
| 2025-01-15 11:45:00 | Priya Shah  | priya@example.com  | 9876543211 | Course details..| new    |
```

---

## 🚀 Next Steps

1. ✅ Add real hero slides data in Google Sheet
2. ✅ Upload images to Cloudinary
3. ✅ Test inquiry form
4. ✅ Share Google Sheet with team members (Viewer/Editor access)
5. ✅ Deploy website to production

---

## 💡 Pro Tips

- **Backup**: Google Sheets auto-saves and has version history
- **Collaboration**: Share sheet with team for content updates
- **Analytics**: Use Google Sheets formulas to analyze inquiries
- **Export**: Download data as Excel for reporting
- **Updates**: Changes in sheet reflect on website instantly (with cache)

Happy Coding! 🎉
