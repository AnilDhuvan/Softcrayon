/**
 * Cloudinary Image Helper
 * Automatically converts local image paths to Cloudinary URLs
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Convert local image path to Cloudinary URL
 * @param localPath - Local image path (e.g., "/images/hero/hero1.jpg")
 * @param options - Transformation options
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(
  localPath: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "jpg" | "png";
  }
): string {
  // If already a Cloudinary URL, return as is
  if (localPath.includes("cloudinary.com")) {
    return localPath;
  }

  // If no cloud name configured, return original path
  if (!CLOUDINARY_CLOUD_NAME) {
    return localPath;
  }

  // Remove leading slash and /images/ prefix
  const imagePath = localPath.replace(/^\/?(images\/)?/, "");

  // Build transformation string
  const transformations: string[] = [];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  if (options?.format) transformations.push(`f_${options.format}`);

  // Default optimizations
  if (transformations.length === 0) {
    transformations.push("f_auto", "q_auto");
  }

  const transformString = transformations.join(",");

  return `${CLOUDINARY_BASE_URL}/${transformString}/softcrayons/${imagePath}`;
}

/**
 * Optimized image for hero sections
 */
export function getHeroImage(imagePath: string): string {
  return getCloudinaryUrl(imagePath, {
    width: 1200,
    quality: "auto",
    format: "auto",
    crop: "fill",
  });
}

/**
 * Optimized image for course cards
 */
export function getCourseImage(imagePath: string): string {
  return getCloudinaryUrl(imagePath, {
    width: 400,
    height: 300,
    quality: "auto",
    format: "auto",
    crop: "fill",
  });
}

/**
 * Optimized thumbnail image
 */
export function getThumbnailImage(imagePath: string): string {
  return getCloudinaryUrl(imagePath, {
    width: 150,
    height: 150,
    quality: "auto",
    format: "auto",
    crop: "thumb",
  });
}

/**
 * Responsive image srcset for different screen sizes
 */
export function getResponsiveImageSrcSet(imagePath: string): string {
  const sizes = [320, 640, 768, 1024, 1280, 1920];

  return sizes
    .map((size) => {
      const url = getCloudinaryUrl(imagePath, {
        width: size,
        quality: "auto",
        format: "auto",
      });
      return `${url} ${size}w`;
    })
    .join(", ");
}

/**
 * Extract public_id from Cloudinary URL
 * @param imageUrl - Full Cloudinary URL
 * @returns public_id or null
 */
export function extractPublicId(imageUrl: string): string | null {
  if (!imageUrl || !imageUrl.includes("cloudinary.com")) {
    return null;
  }

  try {
    // URL format: https://res.cloudinary.com/CLOUD_NAME/image/upload/VERSION/PUBLIC_ID.ext
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex === -1 || uploadIndex + 2 >= urlParts.length) {
      return null;
    }

    // Get everything after upload/vXXXXXX/ or upload/
    const pathParts = urlParts.slice(uploadIndex + 2);
    const publicIdWithExt = pathParts.join("/");

    // Remove file extension
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting publicId:", error);
    return null;
  }
}
