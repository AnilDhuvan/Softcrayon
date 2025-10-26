"use client";

import React, { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Stack,
  Chip,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { coursesData } from "@/assets/data/courses";
import { Search, Clock, IndianRupee } from "lucide-react";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(coursesData.map((c) => c.category))),
  ];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Explore Our Courses
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95 }}>
              Choose from our wide range of industry-relevant courses
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Search and Filter */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={3}>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Categories */}
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? "primary" : "default"}
                  variant={
                    selectedCategory === category ? "filled" : "outlined"
                  }
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        {/* Results count */}
        <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
          Showing {filteredCourses.length} course
          {filteredCourses.length !== 1 ? "s" : ""}
        </Typography>
      </Container>

      {/* Courses Grid */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{ flexWrap: "wrap", justifyContent: "flex-start" }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              style={{ flex: "1 1 300px", maxWidth: 360 }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/400x200?text=${course.title}`;
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={course.category}
                    size="small"
                    sx={{
                      bgcolor: "primary.light",
                      color: "white",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>

                  {/* Course details */}
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Clock size={16} color="#666" />
                      <Typography variant="body2" color="text.secondary">
                        Duration: {course.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IndianRupee size={16} color="#1976d2" />
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        ₹{course.price.toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Syllabus preview */}
                  {course.syllabus && course.syllabus.length > 0 && (
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 600, display: "block", mb: 0.5 }}
                      >
                        What you&apos;ll learn:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {course.syllabus.slice(0, 3).map((item, idx) => (
                          <li key={idx}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    href="/frontend/contact"
                  >
                    Enroll Now
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Stack>

        {filteredCourses.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No courses found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </PublicLayout>
  );
}
