// ====================================
// Google Apps Script Helper
// ====================================

// 🔗 Your Apps Script Web App URL (after deployment)
// Example: https://script.google.com/macros/s/AKfycbx.../exec
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

// 🔐 Your secret token (same as in Apps Script)
const SECRET_TOKEN = process.env.NEXT_PUBLIC_APPS_SCRIPT_TOKEN || "";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  order: number;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp?: string;
  status?: string;
}

/**
 * Fetch hero slides from Google Sheets via Apps Script
 */
export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    if (!APPS_SCRIPT_URL || !SECRET_TOKEN) {
      console.warn("Apps Script URL or Token not configured");
      return [];
    }

    const url = `${APPS_SCRIPT_URL}?type=heroSlides&token=${encodeURIComponent(
      SECRET_TOKEN
    )}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      console.log(`✅ Fetched ${result.count} hero slides from Google Sheets`);
      return result.data;
    } else {
      console.error("❌ Failed to fetch slides:", result.error);
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching hero slides:", error);
    return [];
  }
}

/**
 * Submit inquiry to Google Sheets via Apps Script
 */
export async function submitInquiry(
  inquiry: Inquiry
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!APPS_SCRIPT_URL || !SECRET_TOKEN) {
      console.error("❌ Apps Script URL or Token not configured");
      return { success: false, error: "Apps Script not configured" };
    }

    console.log("🚀 Sending to Apps Script:", APPS_SCRIPT_URL);
    console.log("📦 Payload:", { ...inquiry, token: "***" });

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        type: "inquiry",
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
      }),
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Response data:", result);

    if (result.success) {
      console.log("✅ Inquiry submitted successfully");
      return { success: true, message: result.message };
    } else {
      console.error("❌ Failed to submit inquiry:", result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("❌ Error submitting inquiry:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add hero slide to Google Sheets via Apps Script
 */
export async function addHeroSlide(
  slide: HeroSlide
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!APPS_SCRIPT_URL || !SECRET_TOKEN) {
      return { success: false, error: "Apps Script not configured" };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        type: "heroSlide",
        ...slide,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error adding hero slide:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update hero slide in Google Sheets via Apps Script
 */
export async function updateHeroSlide(
  slide: HeroSlide
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!APPS_SCRIPT_URL || !SECRET_TOKEN) {
      return { success: false, error: "Apps Script not configured" };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        type: "updateSlide",
        ...slide,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error updating hero slide:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete hero slide from Google Sheets via Apps Script
 */
export async function deleteHeroSlide(
  slideId: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!APPS_SCRIPT_URL || !SECRET_TOKEN) {
      return { success: false, error: "Apps Script not configured" };
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: SECRET_TOKEN,
        type: "deleteSlide",
        id: slideId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error deleting hero slide:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
