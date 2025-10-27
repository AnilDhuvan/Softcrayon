// ====================================
// Google Apps Script - Code.gs
// ====================================
//
// � SETUP INSTRUCTIONS:
// 1. Open your Google Sheet
// 2. Extensions → Apps Script
// 3. Delete all existing code
// 4. Copy-paste this ENTIRE file
// 5. Update SHEET_ID below (Line 18)
// 6. Save (Ctrl+S)
// 7. Deploy → New deployment → Web app
// 8. Execute as: Me, Access: Anyone
// 9. Deploy → Copy URL
// ====================================

// �🔐 Security Token - Change this to your own secret
const SECRET_TOKEN = "SOFTCRAYONS_SECRET_2025";

// 📝 Your Google Sheet ID
// Get from URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
// Example: If URL is https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit
// Then SHEET_ID = '1ABC123XYZ'
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // ⚠️ CHANGE THIS!

/**
 * Handle GET requests - Fetch data from Google Sheets
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const params = e.parameter;

    // Check auth token
    if (params.token !== SECRET_TOKEN) {
      return jsonResponse({ success: false, error: "Unauthorized" }, 401);
    }

    const type = params.type || "heroSlides";

    if (type === "heroSlides") {
      return getHeroSlides(ss);
    } else if (type === "inquiries") {
      return getInquiries(ss);
    } else {
      return jsonResponse({ success: false, error: "Unknown type" }, 400);
    }
  } catch (error) {
    Logger.log("Error in doGet: " + error.toString());
    return jsonResponse({ success: false, error: error.toString() }, 500);
  }
}

/**
 * Handle POST requests - Add data to Google Sheets
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    // Check auth token
    if (body.token !== SECRET_TOKEN) {
      return jsonResponse({ success: false, error: "Unauthorized" }, 401);
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const type = body.type;

    if (type === "inquiry") {
      return addInquiry(ss, body);
    } else if (type === "heroSlide") {
      return addHeroSlide(ss, body);
    } else if (type === "updateSlide") {
      return updateHeroSlide(ss, body);
    } else if (type === "deleteSlide") {
      return deleteHeroSlide(ss, body);
    } else {
      return jsonResponse({ success: false, error: "Unknown type" }, 400);
    }
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return jsonResponse({ success: false, error: error.toString() }, 500);
  }
}

/**
 * Get all hero slides
 */
function getHeroSlides(ss) {
  const sheet = ss.getSheetByName("HeroSlides");
  if (!sheet) {
    return jsonResponse({ success: true, data: [] });
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const slides = rows
    .filter((row) => row[0]) // Filter out empty rows
    .map((row) => ({
      id: row[0],
      title: row[1],
      subtitle: row[2],
      description: row[3],
      image: row[4],
      ctaText: row[5],
      ctaLink: row[6],
      isActive: row[7] === true || row[7] === "TRUE" || row[7] === "true",
      order: Number(row[8]) || 0,
    }))
    .sort((a, b) => a.order - b.order);

  return jsonResponse({ success: true, data: slides, count: slides.length });
}

/**
 * Get all inquiries
 */
function getInquiries(ss) {
  const sheet = ss.getSheetByName("Inquiries");
  if (!sheet) {
    return jsonResponse({ success: true, data: [] });
  }

  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1);

  const inquiries = rows
    .filter((row) => row[0])
    .map((row, index) => ({
      id: "inq-" + (index + 1),
      timestamp: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      message: row[4],
      status: row[5] || "new",
    }));

  return jsonResponse({
    success: true,
    data: inquiries,
    count: inquiries.length,
  });
}

/**
 * Add new inquiry
 */
function addInquiry(ss, body) {
  let sheet = ss.getSheetByName("Inquiries");

  // Create sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("Inquiries");
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Status",
    ]);
  }

  sheet.appendRow([
    new Date(),
    body.name || "",
    body.email || "",
    body.phone || "",
    body.message || "",
    "new",
  ]);

  return jsonResponse({
    success: true,
    message: "Inquiry submitted successfully",
  });
}

/**
 * Add new hero slide
 */
function addHeroSlide(ss, body) {
  let sheet = ss.getSheetByName("HeroSlides");

  // Create sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("HeroSlides");
    sheet.appendRow([
      "ID",
      "Title",
      "Subtitle",
      "Description",
      "Image",
      "CTA Text",
      "CTA Link",
      "Is Active",
      "Order",
    ]);
  }

  sheet.appendRow([
    body.id || "slide-" + new Date().getTime(),
    body.title || "",
    body.subtitle || "",
    body.description || "",
    body.image || "",
    body.ctaText || "",
    body.ctaLink || "",
    body.isActive === true || body.isActive === "true",
    Number(body.order) || 0,
  ]);

  return jsonResponse({ success: true, message: "Slide added successfully" });
}

/**
 * Update hero slide
 */
function updateHeroSlide(ss, body) {
  const sheet = ss.getSheetByName("HeroSlides");
  if (!sheet) {
    return jsonResponse(
      { success: false, error: "HeroSlides sheet not found" },
      404
    );
  }

  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(
    (row, index) => index > 0 && row[0] === body.id
  );

  if (rowIndex === -1) {
    return jsonResponse({ success: false, error: "Slide not found" }, 404);
  }

  // Update row (rowIndex is 0-based, sheet rows are 1-based)
  const sheetRow = rowIndex + 1;
  sheet
    .getRange(sheetRow, 1, 1, 9)
    .setValues([
      [
        body.id,
        body.title || "",
        body.subtitle || "",
        body.description || "",
        body.image || "",
        body.ctaText || "",
        body.ctaLink || "",
        body.isActive === true || body.isActive === "true",
        Number(body.order) || 0,
      ],
    ]);

  return jsonResponse({ success: true, message: "Slide updated successfully" });
}

/**
 * Delete hero slide
 */
function deleteHeroSlide(ss, body) {
  const sheet = ss.getSheetByName("HeroSlides");
  if (!sheet) {
    return jsonResponse(
      { success: false, error: "HeroSlides sheet not found" },
      404
    );
  }

  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(
    (row, index) => index > 0 && row[0] === body.id
  );

  if (rowIndex === -1) {
    return jsonResponse({ success: false, error: "Slide not found" }, 404);
  }

  // Delete row (rowIndex is 0-based, sheet rows are 1-based)
  sheet.deleteRow(rowIndex + 1);

  return jsonResponse({ success: true, message: "Slide deleted successfully" });
}

/**
 * Helper function to create JSON response
 */
function jsonResponse(data, statusCode = 200) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ====================================
// 🧪 TEST FUNCTIONS
// ====================================

/**
 * Test 1: Verify Sheet Connection
 * Run this first to check if SHEET_ID is correct
 */
function test1_VerifySheetConnection() {
  try {
    Logger.log("🧪 Test 1: Verifying Sheet Connection...");

    const ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log("✅ SUCCESS! Connected to sheet: " + ss.getName());
    Logger.log("📊 Sheet URL: " + ss.getUrl());

    const sheets = ss.getSheets();
    Logger.log("📋 Total sheets: " + sheets.length);
    sheets.forEach((sheet) => {
      Logger.log(
        "   - " + sheet.getName() + " (" + sheet.getLastRow() + " rows)"
      );
    });

    return "Test Passed!";
  } catch (error) {
    Logger.log("❌ FAILED: " + error.toString());
    Logger.log("💡 Fix: Update SHEET_ID on line 18");
    return "Test Failed!";
  }
}

/**
 * Test 2: Create Required Sheets
 * Creates HeroSlides and Inquiries sheets if they don't exist
 */
function test2_CreateRequiredSheets() {
  try {
    Logger.log("🧪 Test 2: Creating Required Sheets...");

    const ss = SpreadsheetApp.openById(SHEET_ID);

    // Create HeroSlides sheet
    let heroSheet = ss.getSheetByName("HeroSlides");
    if (!heroSheet) {
      heroSheet = ss.insertSheet("HeroSlides");
      heroSheet.appendRow([
        "id",
        "title",
        "subtitle",
        "description",
        "image",
        "ctaText",
        "ctaLink",
        "isActive",
        "order",
      ]);
      Logger.log("✅ Created HeroSlides sheet with headers");
    } else {
      Logger.log("✅ HeroSlides sheet already exists");
    }

    // Create Inquiries sheet
    let inquirySheet = ss.getSheetByName("Inquiries");
    if (!inquirySheet) {
      inquirySheet = ss.insertSheet("Inquiries");
      inquirySheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Message",
        "Status",
      ]);
      Logger.log("✅ Created Inquiries sheet with headers");
    } else {
      Logger.log("✅ Inquiries sheet already exists");
    }

    Logger.log("🎉 All required sheets ready!");
    return "Test Passed!";
  } catch (error) {
    Logger.log("❌ FAILED: " + error.toString());
    return "Test Failed!";
  }
}

/**
 * Test 3: Add Sample Hero Slide
 * Adds a test hero slide to verify write permissions
 */
function test3_AddSampleHeroSlide() {
  try {
    Logger.log("🧪 Test 3: Adding Sample Hero Slide...");

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName("HeroSlides");

    if (!sheet) {
      Logger.log(
        "❌ HeroSlides sheet not found. Run test2_CreateRequiredSheets first!"
      );
      return "Test Failed!";
    }

    // Add sample slide
    sheet.appendRow([
      "slide-test-" + Date.now(),
      "Test Slide - Transform Your Future",
      "WELCOME TO SOFTCRAYONS",
      "This is a test slide to verify Apps Script is working correctly",
      "https://via.placeholder.com/600x400",
      "Get Started",
      "/frontend/courses",
      "TRUE",
      999,
    ]);

    Logger.log("✅ Sample hero slide added successfully!");
    Logger.log("📊 Total slides: " + (sheet.getLastRow() - 1));
    Logger.log("💡 Check your Google Sheet HeroSlides tab");

    return "Test Passed!";
  } catch (error) {
    Logger.log("❌ FAILED: " + error.toString());
    return "Test Failed!";
  }
}

/**
 * Test 4: Add Sample Inquiry
 * Adds a test inquiry to verify inquiry submission works
 */
function test4_AddSampleInquiry() {
  try {
    Logger.log("🧪 Test 4: Adding Sample Inquiry...");

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName("Inquiries");

    if (!sheet) {
      Logger.log(
        "❌ Inquiries sheet not found. Run test2_CreateRequiredSheets first!"
      );
      return "Test Failed!";
    }

    // Add sample inquiry
    sheet.appendRow([
      new Date(),
      "Test User",
      "test@example.com",
      "9876543210",
      "This is a test inquiry to verify Apps Script is working",
      "new",
    ]);

    Logger.log("✅ Sample inquiry added successfully!");
    Logger.log("📊 Total inquiries: " + (sheet.getLastRow() - 1));
    Logger.log("💡 Check your Google Sheet Inquiries tab");

    return "Test Passed!";
  } catch (error) {
    Logger.log("❌ FAILED: " + error.toString());
    return "Test Failed!";
  }
}

/**
 * Test 5: Run All Tests
 * Runs all tests in sequence
 */
function test5_RunAllTests() {
  Logger.log("🚀 Running All Tests...\n");

  test1_VerifySheetConnection();
  Logger.log("\n---\n");

  test2_CreateRequiredSheets();
  Logger.log("\n---\n");

  test3_AddSampleHeroSlide();
  Logger.log("\n---\n");

  test4_AddSampleInquiry();
  Logger.log("\n---\n");

  Logger.log("✅ All tests completed! Check logs above for results.");
}

/**
 * 🚀 SETUP_COMPLETE_DATABASE
 * One-click setup - Creates sheets with headers AND sample data
 * Run this ONCE to setup everything automatically!
 */
function SETUP_COMPLETE_DATABASE() {
  try {
    Logger.log("🚀 Starting Complete Database Setup...\n");

    const ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log("✅ Connected to: " + ss.getName());
    Logger.log("📊 URL: " + ss.getUrl() + "\n");

    // ========================================
    // 1. Setup HeroSlides Sheet
    // ========================================
    Logger.log("📋 Setting up HeroSlides sheet...");

    let heroSheet = ss.getSheetByName("HeroSlides");
    if (heroSheet) {
      Logger.log("⚠️  HeroSlides sheet already exists. Deleting...");
      ss.deleteSheet(heroSheet);
    }

    // Create new HeroSlides sheet
    heroSheet = ss.insertSheet("HeroSlides");

    // Add headers with formatting
    const heroHeaders = [
      "id",
      "title",
      "subtitle",
      "description",
      "image",
      "ctaText",
      "ctaLink",
      "isActive",
      "order",
    ];
    heroSheet.appendRow(heroHeaders);

    // Format header row
    const heroHeaderRange = heroSheet.getRange(1, 1, 1, heroHeaders.length);
    heroHeaderRange.setBackground("#667eea");
    heroHeaderRange.setFontColor("#ffffff");
    heroHeaderRange.setFontWeight("bold");
    heroHeaderRange.setHorizontalAlignment("center");

    // Add sample hero slides data
    const heroData = [
      [
        "slide-1",
        "Transform Your Career with SoftCrayons",
        "WELCOME TO SOFTCRAYONS",
        "Master industry-relevant skills with expert-led courses in Web Development, Data Science, Digital Marketing, and more.",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
        "Explore Courses",
        "/frontend/courses",
        "TRUE",
        1,
      ],
      [
        "slide-2",
        "Learn from Industry Experts",
        "PROFESSIONAL TRAINING",
        "Get hands-on experience with real-world projects and learn from professionals with 10+ years of experience.",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
        "View Instructors",
        "/frontend/about",
        "TRUE",
        2,
      ],
      [
        "slide-3",
        "100% Job Placement Assistance",
        "CAREER SUCCESS GUARANTEED",
        "Join thousands of successful students who landed their dream jobs after completing our courses.",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
        "Get Started",
        "/frontend/contact",
        "TRUE",
        3,
      ],
    ];

    // Add all sample data
    heroData.forEach((row) => {
      heroSheet.appendRow(row);
    });

    // Auto-resize columns
    heroSheet.autoResizeColumns(1, heroHeaders.length);

    // Set column widths for better visibility
    heroSheet.setColumnWidth(1, 120); // id
    heroSheet.setColumnWidth(2, 300); // title
    heroSheet.setColumnWidth(3, 200); // subtitle
    heroSheet.setColumnWidth(4, 350); // description
    heroSheet.setColumnWidth(5, 400); // image
    heroSheet.setColumnWidth(6, 120); // ctaText
    heroSheet.setColumnWidth(7, 150); // ctaLink
    heroSheet.setColumnWidth(8, 80); // isActive
    heroSheet.setColumnWidth(9, 60); // order

    // Freeze header row
    heroSheet.setFrozenRows(1);

    Logger.log(
      "✅ HeroSlides sheet created with " + heroData.length + " sample slides"
    );
    Logger.log("   Columns: " + heroHeaders.join(", "));
    Logger.log("   Total rows: " + heroSheet.getLastRow() + "\n");

    // ========================================
    // 2. Setup Inquiries Sheet
    // ========================================
    Logger.log("📋 Setting up Inquiries sheet...");

    let inquirySheet = ss.getSheetByName("Inquiries");
    if (inquirySheet) {
      Logger.log("⚠️  Inquiries sheet already exists. Deleting...");
      ss.deleteSheet(inquirySheet);
    }

    // Create new Inquiries sheet
    inquirySheet = ss.insertSheet("Inquiries");

    // Add headers with formatting
    const inquiryHeaders = [
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Status",
    ];
    inquirySheet.appendRow(inquiryHeaders);

    // Format header row
    const inquiryHeaderRange = inquirySheet.getRange(
      1,
      1,
      1,
      inquiryHeaders.length
    );
    inquiryHeaderRange.setBackground("#4caf50");
    inquiryHeaderRange.setFontColor("#ffffff");
    inquiryHeaderRange.setFontWeight("bold");
    inquiryHeaderRange.setHorizontalAlignment("center");

    // Add sample inquiries data
    const inquiryData = [
      [
        new Date("2025-01-15 10:30:00"),
        "Rahul Kumar",
        "rahul.kumar@example.com",
        "9876543210",
        "I want to know more about Web Development courses. Do you provide job assistance?",
        "new",
      ],
      [
        new Date("2025-01-15 14:45:00"),
        "Priya Sharma",
        "priya.sharma@example.com",
        "9876543211",
        "Interested in Data Science course. What is the duration and fees?",
        "contacted",
      ],
      [
        new Date("2025-01-16 09:15:00"),
        "Amit Verma",
        "amit.verma@example.com",
        "9876543212",
        "Can I get a demo class for Digital Marketing course?",
        "new",
      ],
      [
        new Date("2025-01-16 16:20:00"),
        "Sneha Patel",
        "sneha.patel@example.com",
        "9876543213",
        "Looking for weekend batch for Python course. Is it available?",
        "enrolled",
      ],
      [
        new Date("2025-01-17 11:00:00"),
        "Vikram Singh",
        "vikram.singh@example.com",
        "9876543214",
        "Need information about placement records and success rate.",
        "new",
      ],
    ];

    // Add all sample data
    inquiryData.forEach((row) => {
      inquirySheet.appendRow(row);
    });

    // Set column widths
    inquirySheet.setColumnWidth(1, 180); // Timestamp
    inquirySheet.setColumnWidth(2, 150); // Name
    inquirySheet.setColumnWidth(3, 220); // Email
    inquirySheet.setColumnWidth(4, 120); // Phone
    inquirySheet.setColumnWidth(5, 450); // Message
    inquirySheet.setColumnWidth(6, 100); // Status

    // Freeze header row
    inquirySheet.setFrozenRows(1);

    // Add data validation for Status column
    const statusRange = inquirySheet.getRange(2, 6, 1000, 1); // Status column
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["new", "contacted", "enrolled", "closed"], true)
      .setAllowInvalid(false)
      .build();
    statusRange.setDataValidation(statusRule);

    Logger.log(
      "✅ Inquiries sheet created with " +
        inquiryData.length +
        " sample inquiries"
    );
    Logger.log("   Columns: " + inquiryHeaders.join(", "));
    Logger.log("   Total rows: " + inquirySheet.getLastRow() + "\n");

    // ========================================
    // Summary
    // ========================================
    Logger.log("🎉 ========================================");
    Logger.log("🎉 DATABASE SETUP COMPLETE!");
    Logger.log("🎉 ========================================\n");
    Logger.log("📊 Summary:");
    Logger.log("   ✅ HeroSlides: " + heroData.length + " sample slides");
    Logger.log("   ✅ Inquiries: " + inquiryData.length + " sample inquiries");
    Logger.log("\n📋 Sheets Created:");
    Logger.log(
      "   1. HeroSlides (id, title, subtitle, description, image, ctaText, ctaLink, isActive, order)"
    );
    Logger.log(
      "   2. Inquiries (Timestamp, Name, Email, Phone, Message, Status)"
    );
    Logger.log("\n💡 Next Steps:");
    Logger.log("   1. Check your Google Sheet - data should be visible");
    Logger.log("   2. Deploy this script as Web App");
    Logger.log("   3. Copy Web App URL to .env.local");
    Logger.log("   4. Test on your website!");
    Logger.log("\n🔗 Sheet URL: " + ss.getUrl());

    return "Setup Complete!";
  } catch (error) {
    Logger.log("❌ ERROR: " + error.toString());
    Logger.log("💡 Make sure SHEET_ID is correct on line 23");
    return "Setup Failed!";
  }
}
