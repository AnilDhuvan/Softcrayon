import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    console.log("🗑️ Delete image API called");

    // Check Cloudinary config
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("❌ Cloudinary not configured");
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { publicId, imageUrl } = body;

    if (!publicId && !imageUrl) {
      console.error("❌ No publicId or imageUrl provided");
      return NextResponse.json(
        { error: "publicId or imageUrl is required" },
        { status: 400 }
      );
    }

    // Extract publicId from URL if only URL is provided
    let extractedPublicId = publicId;
    if (!extractedPublicId && imageUrl) {
      // URL format: https://res.cloudinary.com/CLOUD_NAME/image/upload/VERSION/PUBLIC_ID.ext
      const urlParts = imageUrl.split("/");
      const uploadIndex = urlParts.indexOf("upload");
      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        // Get everything after upload/vXXXXXX/
        const pathParts = urlParts.slice(uploadIndex + 2);
        // Remove file extension
        const publicIdWithExt = pathParts.join("/");
        extractedPublicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
      }
    }

    if (!extractedPublicId) {
      console.error("❌ Could not extract publicId from URL");
      return NextResponse.json(
        { error: "Could not extract publicId from URL" },
        { status: 400 }
      );
    }

    console.log("🔍 Deleting image with publicId:", extractedPublicId);

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(extractedPublicId);

    console.log("📊 Delete result:", result);

    if (result.result === "ok" || result.result === "not found") {
      return NextResponse.json({
        success: true,
        message: "Image deleted successfully",
        result: result.result,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to delete image", result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("💥 Delete error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
