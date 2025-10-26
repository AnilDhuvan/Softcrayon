const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Cloudinary Configuration
cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret",
});

// Function to upload a single image
async function uploadImage(filePath, folder) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `softcrayons/${folder}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    console.log(`✅ Uploaded: ${filePath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

// Function to recursively find all images in a directory
function findImages(dir, imageList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImages(filePath, imageList);
    } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
      imageList.push(filePath);
    }
  });

  return imageList;
}

// Main upload function
async function uploadAllImages() {
  console.log("🚀 Starting image upload to Cloudinary...\n");

  const imagesDir = path.join(__dirname, "../src/assets/images");

  if (!fs.existsSync(imagesDir)) {
    console.log("❌ Images directory not found:", imagesDir);
    return;
  }

  const images = findImages(imagesDir);
  console.log(`📸 Found ${images.length} images to upload\n`);

  const uploadedUrls = {};
  let successCount = 0;
  let failCount = 0;

  for (const imagePath of images) {
    // Get relative path and folder structure
    const relativePath = path.relative(imagesDir, imagePath);
    const folderName = path.dirname(relativePath).replace(/\\/g, "/");

    const url = await uploadImage(imagePath, folderName || "misc");

    if (url) {
      uploadedUrls[relativePath.replace(/\\/g, "/")] = url;
      successCount++;
    } else {
      failCount++;
    }
  }

  // Save uploaded URLs mapping to a JSON file
  const outputFile = path.join(__dirname, "cloudinary-urls.json");
  fs.writeFileSync(outputFile, JSON.stringify(uploadedUrls, null, 2));

  console.log("\n📊 Upload Summary:");
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`\n💾 URLs saved to: ${outputFile}`);
  console.log("\n✨ Done!");
}

// Run the upload
uploadAllImages().catch(console.error);
