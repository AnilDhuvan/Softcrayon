# 🧪 Apps Script Testing Guide

## Problem: Inquiry local mein add ho rahi but Google Sheet mein nahi

### ✅ Step-by-Step Fix:

---

## 1️⃣ Check Apps Script Configuration

### Open Apps Script Editor:

1. Google Sheet → **Extensions** → **Apps Script**
2. Check `Code.gs` file

### Update These Values:

```javascript
// Line 6: Your secret token
const SECRET_TOKEN = "SOFTCRAYONS_SECRET_2025";

// Line 10: YOUR ACTUAL GOOGLE SHEET ID
const SHEET_ID = "YOUR_ACTUAL_SHEET_ID_HERE"; // ⚠️ CHANGE THIS!
```

### How to Get Sheet ID:

```
URL: https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit
                                            ↑ This is your SHEET_ID
```

**Example:**

```javascript
const SHEET_ID = "1ABC123XYZ456"; // ✅ Replace with your actual ID
```

---

## 2️⃣ Test Apps Script (Critical!)

### Add Test Function in Apps Script:

Copy this code at the **END** of your `Code.gs`:

```javascript
/**
 * Test function - Run this to verify everything works
 */
function testInquiry() {
  try {
    Logger.log("🧪 Starting test...");

    const ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log("✅ Sheet opened successfully");

    let sheet = ss.getSheetByName("Inquiries");

    if (!sheet) {
      Logger.log("⚠️ Creating Inquiries sheet...");
      sheet = ss.insertSheet("Inquiries");
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Message",
        "Status",
      ]);
      Logger.log("✅ Inquiries sheet created");
    }

    // Add test data
    sheet.appendRow([
      new Date(),
      "Test User",
      "test@example.com",
      "1234567890",
      "This is a test inquiry",
      "new",
    ]);

    Logger.log("✅ Test inquiry added successfully!");
    Logger.log("📊 Total rows: " + sheet.getLastRow());
  } catch (error) {
    Logger.log("❌ Error: " + error.toString());
  }
}
```

### Run Test Function:

1. Select `testInquiry` from function dropdown (top of editor)
2. Click **Run** (▶️ button)
3. First time: Authorize access → Allow permissions
4. Check **Execution log** (View → Logs or Ctrl+Enter)

### Expected Output:

```
🧪 Starting test...
✅ Sheet opened successfully
✅ Inquiries sheet created (or already exists)
✅ Test inquiry added successfully!
📊 Total rows: 2
```

### If Error Shows:

- ❌ **"Cannot find sheet"** → SHEET_ID wrong hai
- ❌ **"Permission denied"** → Re-authorize
- ❌ **"Unauthorized"** → Token mismatch

---

## 3️⃣ Verify Deployment

### Check Web App Deployment:

1. Apps Script → **Deploy** → **Manage deployments**
2. Ensure Web App is **Active**
3. Settings should be:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Copy the **Web App URL**

### URL Format:

```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Update `.env.local`:

```bash
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
NEXT_PUBLIC_APPS_SCRIPT_TOKEN=SOFTCRAYONS_SECRET_2025
```

---

## 4️⃣ Test from Browser Console

### Open Browser Console (F12):

Paste this code to test directly:

```javascript
// Test inquiry submission
async function testInquiry() {
  const url = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

  const payload = {
    token: "SOFTCRAYONS_SECRET_2025",
    type: "inquiry",
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210",
    message: "Testing from browser console",
  };

  console.log("🚀 Sending:", payload);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log("📊 Result:", result);

  if (result.success) {
    console.log("✅ SUCCESS! Check your Google Sheet Inquiries tab");
  } else {
    console.log("❌ FAILED:", result.error);
  }
}

// Run test
testInquiry();
```

### Expected Console Output:

```
🚀 Sending: {token: "***", type: "inquiry", name: "Test User", ...}
📊 Result: {success: true, message: "Inquiry submitted successfully"}
✅ SUCCESS! Check your Google Sheet Inquiries tab
```

---

## 5️⃣ Common Issues & Solutions

### Issue 1: "Unauthorized" Error

**Cause:** Token mismatch
**Fix:**

```javascript
// Apps Script Code.gs
const SECRET_TOKEN = "SOFTCRAYONS_SECRET_2025";

// .env.local
NEXT_PUBLIC_APPS_SCRIPT_TOKEN = SOFTCRAYONS_SECRET_2025;
```

Both must match exactly!

### Issue 2: "Cannot find sheet"

**Cause:** Wrong SHEET_ID
**Fix:**

1. Open your Google Sheet
2. Copy ID from URL
3. Update Apps Script:

```javascript
const SHEET_ID = "1ABC123XYZ456"; // Your actual ID
```

### Issue 3: CORS Error

**Cause:** Apps Script not deployed as Web App
**Fix:**

1. Apps Script → Deploy → New deployment
2. Type: Web app
3. Execute as: Me
4. Access: Anyone
5. Deploy → Copy URL

### Issue 4: Data not appearing

**Cause:** Sheet name mismatch
**Fix:** Ensure sheet is named exactly **"Inquiries"** (case-sensitive)

---

## 6️⃣ Quick Checklist

Before submitting inquiry from website:

- [ ] Apps Script `SHEET_ID` is correct
- [ ] Apps Script `SECRET_TOKEN` matches `.env.local`
- [ ] Apps Script is deployed as Web App
- [ ] Google Sheet has "Inquiries" tab (or will auto-create)
- [ ] `.env.local` has correct Web App URL
- [ ] Dev server restarted after .env changes
- [ ] Test function in Apps Script runs successfully

---

## 7️⃣ Final Test

### From Website:

1. Go to: `http://localhost:3000/frontend`
2. Scroll to inquiry form
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Message: Testing inquiry
4. Click Submit
5. Open **Browser Console (F12)**
6. Check logs:
   ```
   📝 Submitting inquiry: {...}
   🚀 Sending to Apps Script: https://...
   📡 Response status: 200
   ✅ Response data: {success: true, ...}
   ```
7. Check **Google Sheet → Inquiries tab**
8. New row should appear!

---

## 🎯 Success Indicators

✅ Console shows: `✅ Inquiry submitted successfully`
✅ Toast message appears: "Thank you for your inquiry!"
✅ Google Sheet Inquiries tab has new row
✅ Row has: timestamp, name, email, phone, message, status

---

## 💡 Pro Tip

If still not working:

1. Check Apps Script **Execution log**:
   - Apps Script Editor → View → Executions
   - See detailed error messages
2. Re-deploy Apps Script:
   - Deploy → New deployment
   - Get fresh URL
3. Clear browser cache
4. Restart dev server

**Good luck! 🚀**
