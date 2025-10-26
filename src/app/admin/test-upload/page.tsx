"use client";

import React from "react";
import { Container, Typography, Paper, Box, Alert, Stack } from "@mui/material";
import ImageUpload from "@/components/ImageUpload";

export default function TestUploadPage() {
  const [uploadedUrl, setUploadedUrl] = React.useState("");

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          🧪 Image Upload Test Page
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Test your Cloudinary setup:</strong>
          <br />
          Upload an image to verify everything is working correctly.
          <br />
          Check browser console (F12) and terminal for detailed logs.
        </Alert>

        <Paper sx={{ p: 4 }}>
          <Stack spacing={3}>
            <ImageUpload
              label="Test Image Upload"
              folder="test"
              onUploadComplete={(url) => {
                console.log("✅ Upload complete callback:", url);
                setUploadedUrl(url);
              }}
            />

            {uploadedUrl && (
              <Alert severity="success">
                <strong>Upload Successful!</strong>
                <br />
                URL: <code>{uploadedUrl}</code>
              </Alert>
            )}
          </Stack>
        </Paper>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <strong>Cloudinary Configuration:</strong>
          <br />
          Cloud Name:{" "}
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "❌ Not set"}
          <br />
          API Key: {process.env.CLOUDINARY_API_KEY ? "✅ Set" : "❌ Not set"}
          <br />
          API Secret:{" "}
          {process.env.CLOUDINARY_API_SECRET ? "✅ Set" : "❌ Not set"}
        </Alert>
      </Box>
    </Container>
  );
}
