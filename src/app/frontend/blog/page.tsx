"use client";

import React from "react";
import PublicLayout from "@/components/PublicLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { blogsData } from "@/assets/data/blogs";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/utils/helpers";

export default function BlogPage() {
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
              Our Blog
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95 }}>
              Insights, tips, and trends in technology and education
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Blog Posts */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4}>
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardActionArea>
                  <Stack direction={{ xs: "column", md: "row" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", md: 300 },
                        height: { xs: 200, md: "auto" },
                      }}
                      image={blog.image}
                      alt={blog.title}
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/300x200?text=${blog.category}`;
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Chip
                        label={blog.category}
                        size="small"
                        sx={{
                          bgcolor: "primary.light",
                          color: "white",
                          mb: 2,
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {blog.excerpt}
                      </Typography>

                      <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <User size={16} />
                          <Typography variant="caption" color="text.secondary">
                            {blog.author}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Calendar size={16} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(blog.date)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Stack>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </Stack>

        {blogsData.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No blog posts available at the moment
            </Typography>
          </Box>
        )}
      </Container>
    </PublicLayout>
  );
}
