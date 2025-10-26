"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAppStore } from "@/context/store";
import { HeroSlide } from "@/types";
import { generateId } from "@/utils/helpers";
import ImageUpload from "@/components/ImageUpload";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image URL is required"),
  buttonText: yup.string().required("Button text is required"),
  buttonLink: yup.string().required("Button link is required"),
  order: yup.number().required("Order is required").min(1),
  isActive: yup.boolean().required(),
});

export default function HeroSlidesPage() {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide } =
    useAppStore();
  const [open, setOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      order: 1,
      isActive: true,
    },
  });

  const handleOpen = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setValue("title", slide.title);
      setValue("subtitle", slide.subtitle);
      setValue("description", slide.description);
      setValue("image", slide.image);
      setValue("buttonText", slide.buttonText);
      setValue("buttonLink", slide.buttonLink);
      setValue("order", slide.order);
      setValue("isActive", slide.isActive);
    } else {
      setEditingSlide(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSlide(null);
    reset();
  };

  const onSubmit = (data: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    order: number;
    isActive: boolean;
  }) => {
    if (editingSlide) {
      updateHeroSlide(editingSlide.id, data);
      toast.success("Hero slide updated successfully!");
    } else {
      const newSlide: HeroSlide = {
        id: generateId(),
        ...data,
      };
      addHeroSlide(newSlide);
      toast.success("Hero slide added successfully!");
    }
    handleClose();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this hero slide?")) {
      const slide = heroSlides.find((s) => s.id === id);

      // Delete image from Cloudinary if exists
      if (slide?.image && slide.image.includes("cloudinary.com")) {
        console.log("🗑️ Deleting image from Cloudinary:", slide.image);
        try {
          const response = await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: slide.image }),
          });

          const data = await response.json();
          if (data.success) {
            console.log("✅ Image deleted from Cloudinary");
          } else {
            console.warn("⚠️ Could not delete image:", data.error);
          }
        } catch (err) {
          console.warn("⚠️ Error deleting image:", err);
          // Don't fail slide deletion if image delete fails
        }
      }

      deleteHeroSlide(id);
      toast.success("Hero slide deleted successfully!");
    }
  };

  const sortedSlides = [...heroSlides].sort((a, b) => a.order - b.order);

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Hero Slides Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={() => handleOpen()}
          >
            Add Hero Slide
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                <TableCell>Button Text</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSlides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    <Chip label={slide.order} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {slide.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{slide.subtitle}</TableCell>
                  <TableCell>{slide.buttonText}</TableCell>
                  <TableCell>
                    <Chip
                      label={slide.isActive ? "Active" : "Inactive"}
                      color={slide.isActive ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(slide)}
                    >
                      <Pencil size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(slide.id)}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
              {editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  label="Title"
                  fullWidth
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
                <TextField
                  label="Subtitle"
                  fullWidth
                  {...register("subtitle")}
                  error={!!errors.subtitle}
                  helperText={errors.subtitle?.message}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />

                {/* Image Upload Component */}
                <ImageUpload
                  label="Hero Image"
                  folder="hero"
                  currentImage={editingSlide?.image}
                  onUploadComplete={(url) => setValue("image", url)}
                />

                <TextField
                  label="Image URL (Auto-filled after upload)"
                  fullWidth
                  {...register("image")}
                  error={!!errors.image}
                  helperText={
                    errors.image?.message ||
                    "Upload an image above or paste URL here"
                  }
                  placeholder="e.g., https://res.cloudinary.com/..."
                  disabled
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "rgba(0, 0, 0, 0.6)",
                    },
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Button Text"
                    fullWidth
                    {...register("buttonText")}
                    error={!!errors.buttonText}
                    helperText={errors.buttonText?.message}
                  />
                  <TextField
                    label="Button Link"
                    fullWidth
                    {...register("buttonLink")}
                    error={!!errors.buttonLink}
                    helperText={errors.buttonLink?.message}
                    placeholder="e.g., #courses or /frontend/about"
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label="Order"
                    type="number"
                    {...register("order")}
                    error={!!errors.order}
                    helperText={errors.order?.message}
                    sx={{ width: 200 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch defaultChecked {...register("isActive")} />
                    }
                    label="Active"
                  />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingSlide ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
}
