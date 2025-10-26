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
    console.log("📥 Upload API called");

    // Check Cloudinary config
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error("❌ Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
      return NextResponse.json(
        { error: "Cloudinary not configured: Missing cloud name" },
        { status: 500 }
      );
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      console.error("❌ Missing CLOUDINARY_API_KEY");
      return NextResponse.json(
        { error: "Cloudinary not configured: Missing API key" },
        { status: 500 }
      );
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error("❌ Missing CLOUDINARY_API_SECRET");
      return NextResponse.json(
        { error: "Cloudinary not configured: Missing API secret" },
        { status: 500 }
      );
    }

    console.log("✅ Cloudinary config found:", {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY?.substring(0, 5) + "...",
    });

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "hero";

    if (!file) {
      console.error("❌ No file in request");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("📁 File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
      folder: folder,
    });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("🔄 File converted to buffer, size:", buffer.length);

    // Upload to Cloudinary
    console.log("☁️ Starting Cloudinary upload...");
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `softcrayons/${folder}`,
            resource_type: "auto",
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary error:", error);
              reject(error);
            } else if (result) {
              console.log("✅ Cloudinary upload success:", result.secure_url);
              resolve(result);
            } else {
              console.error("❌ No result from Cloudinary");
              reject(new Error("Upload failed"));
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("💥 Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
