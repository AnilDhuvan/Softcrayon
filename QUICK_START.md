# ⚡ Quick Start Guide - Apps Script Setup

## 🎯 Goal

Google Sheets se hero slides fetch karo aur inquiries save karo - 5 minutes mein!

---

## Step 1: Google Sheet Banao (1 min)

1. **Open**: [Google Sheets](https://sheets.google.com)
2. **Click**: Blank spreadsheet
3. **Name**: "SoftCrayons Database"
4. **Copy Sheet ID** from URL:
   ```
   URL: https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit
                                               ↑ This is your SHEET_ID
   ```

---

## Step 2: Apps Script Setup (2 min)

### A. Open Apps Script Editor

1. Your Google Sheet → **Extensions** → **Apps Script**
2. Delete all existing code in `Code.gs`

### B. Copy-Paste Code

1. Open file: `APPS_SCRIPT_CODE.gs` (in your project folder)
2. **Select All** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. Go back to Apps Script editor
5. **Paste** (Ctrl+V)

### C. Update SHEET_ID

Find line 18:

```javascript
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // ⚠️ CHANGE THIS!
```

Replace with your actual Sheet ID:

```javascript
const SHEET_ID = "1ABC123XYZ456"; // ✅ Your actual ID
```

### D. Save

Click **Save** (💾 icon) or press Ctrl+S

---

## Step 3: Run Tests (1 min)

### Test 1: Verify Connection

1. **Function dropdown** (top of editor) → Select `test1_VerifySheetConnection`
2. Click **Run** (▶️ button)
3. **First time**: Click "Review Permissions" → Choose your account → "Allow"
4. Check **Execution log** (View → Logs or Ctrl+Enter)
5. Should show: `✅ SUCCESS! Connected to sheet`

### Test 2: Create Sheets

1. Function dropdown → Select `test2_CreateRequiredSheets`
2. Click **Run**
3. Check logs: Should show `✅ Created HeroSlides sheet` and `✅ Created Inquiries sheet`
4. **Verify**: Go to your Google Sheet - you'll see 2 new tabs!

### Test 3: Add Sample Data

1. Function dropdown → Select `test5_RunAllTests`
2. Click **Run**
3. This will:
   - ✅ Verify connection
   - ✅ Create sheets (if not exists)
   - ✅ Add sample hero slide
   - ✅ Add sample inquiry
4. **Check your Google Sheet** - data should be there!

---

## Step 4: Deploy Web App (1 min)

1. Click **Deploy** → **New deployment**
2. **Settings icon** ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - **Description**: SoftCrayons API
   - **Execute as**: Me (your account)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy** the Web App URL (looks like):
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 5: Update Next.js Config (30 sec)

1. Open `.env.local` in your project
2. Update these lines:
   ```bash
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
   NEXT_PUBLIC_APPS_SCRIPT_TOKEN=SOFTCRAYONS_SECRET_2025
   ```
3. Paste your actual Web App URL
4. Save file

---

## Step 6: Test Website (30 sec)

1. **Restart dev server**:

   ```bash
   npm run dev
   ```

2. **Open browser**: `http://localhost:3000/frontend`

3. **Test Inquiry Form**:

   - Fill form
   - Submit
   - Open **Browser Console** (F12)
   - Should see: `✅ Inquiry submitted successfully`
   - **Check Google Sheet → Inquiries tab** - new row added!

4. **Test Hero Slides**:
   - Add data in **HeroSlides** tab of Google Sheet
   - Refresh website
   - Slides should appear!

---

## 🎉 Done!

Your website is now connected to Google Sheets!

---

## 📋 Checklist

Before going live:

- [ ] SHEET_ID updated in Apps Script (line 18)
- [ ] All 5 tests passed successfully
- [ ] Web App deployed (URL copied)
- [ ] `.env.local` updated with Web App URL
- [ ] Dev server restarted
- [ ] Inquiry form tested (data in Google Sheet)
- [ ] Hero slides tested (data showing on website)

---

## ❓ Troubleshooting

### "Cannot find sheet" error?

→ SHEET_ID is wrong. Copy again from URL.

### "Unauthorized" error?

→ Token mismatch. Check `.env.local` token = Apps Script token

### Inquiry not saving?

→ Run `test4_AddSampleInquiry` in Apps Script. Check logs.

### Hero slides not showing?

→ Add data in HeroSlides sheet. Make isActive = TRUE.

---

## 💡 Pro Tips

1. **Keep Apps Script editor open** - Easy to check logs
2. **Use test functions** - Quick way to verify everything works
3. **Check Executions tab** - Apps Script → View → Executions (see all API calls)
4. **Browser console** - Always keep F12 open when testing

---

## 📚 Files You Need

1. **APPS_SCRIPT_CODE.gs** - Copy-paste into Apps Script editor
2. **.env.local** - Update with Web App URL
3. **TEST_APPS_SCRIPT.md** - Detailed troubleshooting guide

---

**Ready? Let's go! 🚀**

Time needed: **5 minutes**
Difficulty: **Easy**
Cost: **FREE**
