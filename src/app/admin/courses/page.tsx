"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/utils/theme";
import { Toaster } from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAppStore } from "@/context/store";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Course } from "@/types";
import { generateId } from "@/utils/helpers";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive(),
  duration: yup.string().required("Duration is required"),
  category: yup.string().required("Category is required"),
  image: yup
    .string()
    .url("Must be valid URL")
    .required("Image URL is required"),
});

export default function CoursesManagementPage() {
  const { courses, addCourse, updateCourse, deleteCourse } = useAppStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      reset(course);
    } else {
      setEditingCourse(null);
      reset({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCourse(null);
    reset({});
  };

  const onSubmit = (data: Partial<Course>) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, data);
      toast.success("Course updated successfully!");
    } else {
      const newCourse: Course = {
        id: generateId(),
        title: data.title || "",
        description: data.description || "",
        price: data.price || 0,
        duration: data.duration || "",
        category: data.category || "",
        image: data.image || "",
        featured: false,
      };
      addCourse(newCourse);
      toast.success("Course added successfully!");
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCourse(id);
      toast.success("Course deleted successfully!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <AdminLayout>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Manage Courses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add, edit, or remove courses
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => handleOpenDialog()}
            >
              Add Course
            </Button>
          </Stack>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Title</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Category</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Duration</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} hover>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>
                        <Chip label={course.category} size="small" />
                      </TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell align="right">
                        ₹{course.price.toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(course)}
                        >
                          <Pencil size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(course.id, course.title)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle>
                {editingCourse ? "Edit Course" : "Add New Course"}
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                  <TextField
                    label="Course Title"
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
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
                  <TextField
                    label="Category"
                    fullWidth
                    {...register("category")}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    {...register("price")}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    label="Duration"
                    fullWidth
                    {...register("duration")}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                    placeholder="e.g., 6 months"
                  />
                  <TextField
                    label="Image URL"
                    fullWidth
                    {...register("image")}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button type="submit" variant="contained">
                  {editingCourse ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </AdminLayout>
    </ThemeProvider>
  );
}
