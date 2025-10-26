"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Stack,
  IconButton,
} from "@mui/material";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  onUploadComplete,
  currentImage,
  folder = "hero",
  label = "Upload Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || "");
  const [error, setError] = useState<string>("");
  const [oldImageUrl, setOldImageUrl] = useState<string>(currentImage || "");

  // Update preview when currentImage changes
  React.useEffect(() => {
    setPreview(currentImage || "");
    setOldImageUrl(currentImage || "");
  }, [currentImage]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Delete old image from Cloudinary if exists
      if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
        console.log("🗑️ Deleting old image:", oldImageUrl);
        try {
          const deleteResponse = await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: oldImageUrl }),
          });

          const deleteData = await deleteResponse.json();
          if (deleteData.success) {
            console.log("✅ Old image deleted successfully");
          } else {
            console.warn("⚠️ Could not delete old image:", deleteData.error);
          }
        } catch (deleteErr) {
          console.warn("⚠️ Error deleting old image:", deleteErr);
          // Don't fail upload if delete fails
        }
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary via API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      console.log("🔄 Starting upload for:", file.name, "Size:", file.size);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("📡 Response status:", response.status);

      const data = await response.json();
      console.log("📦 Response data:", data);

      if (data.success) {
        console.log("✅ Upload successful:", data.url);
        setOldImageUrl(data.url); // Update old image URL for next upload
        onUploadComplete(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        console.error("❌ Upload failed:", data.error);
        setError(data.error || "Upload failed");
        setPreview(""); // Clear preview on error
        toast.error(`Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("💥 Upload exception:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      setPreview(""); // Clear preview on error
      toast.error(`Upload error: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onUploadComplete("");
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
        {label}
      </Typography>

      {preview ? (
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              width: "100%",
              maxWidth: 400,
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
              border: "2px solid",
              borderColor: "divider",
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "error.main", color: "white" },
            }}
          >
            <X size={18} />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="outlined"
          component="label"
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
          sx={{
            width: "100%",
            maxWidth: 400,
            height: 200,
            borderStyle: "dashed",
            borderWidth: 2,
            "&:hover": {
              borderStyle: "dashed",
              borderWidth: 2,
            },
          }}
        >
          <Stack alignItems="center" spacing={1}>
            {!uploading && <ImageIcon size={40} />}
            <Typography variant="body2">
              {uploading ? "Uploading..." : "Click to select image"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Max size: 5MB (JPG, PNG, WebP)
            </Typography>
          </Stack>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </Button>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {uploading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Uploading to Cloudinary... Please wait
        </Alert>
      )}
    </Box>
  );
}
