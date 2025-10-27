"use client";

import React, { useEffect, useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Rating,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { coursesData } from "@/assets/data/courses";
import { testimonialsData } from "@/assets/data/testimonials";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAppStore } from "@/context/store";
import { generateId } from "@/utils/helpers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  fetchHeroSlides,
  submitInquiry,
  type HeroSlide,
} from "@/utils/appsScript";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  message: yup.string().required("Message is required"),
});

const stats = [
  { icon: GraduationCap, label: "Expert Instructors", value: "50+" },
  { icon: Users, label: "Students Enrolled", value: "10,000+" },
  { icon: Award, label: "Courses Available", value: "100+" },
  { icon: BookOpen, label: "Success Rate", value: "95%" },
];

const features = [
  "Industry-expert instructors",
  "Hands-on project-based learning",
  "Lifetime access to course materials",
  "Job placement assistance",
  "Flexible learning schedules",
  "Certificate of completion",
];

export default function HomePage() {
  const { addInquiry } = useAppStore();
  const [googleSlides, setGoogleSlides] = useState<HeroSlide[]>([]);
  const [isLoadingSlides, setIsLoadingSlides] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch hero slides from Google Sheets ONLY (no fallback to local data)
  useEffect(() => {
    async function loadSlides() {
      try {
        setIsLoadingSlides(true);
        console.log("🔄 Fetching hero slides from Google Sheets...");

        const slides = await fetchHeroSlides();

        if (slides && slides.length > 0) {
          setGoogleSlides(slides);
          console.log(`✅ Loaded ${slides.length} slides from Google Sheets`);
        } else {
          setGoogleSlides([]);
          console.warn("⚠️ No slides found in Google Sheets");
        }
      } catch (error) {
        console.error("❌ Error loading slides from Google Sheets:", error);
        setGoogleSlides([]);
      } finally {
        setIsLoadingSlides(false);
      }
    }

    loadSlides();
  }, []);

  const onSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      console.log("📝 Submitting inquiry:", data);

      // Try to submit to Google Sheets first
      const result = await submitInquiry(data);

      console.log("📊 Google Sheets result:", result);

      if (result.success) {
        toast.success("Thank you for your inquiry! We will contact you soon.");
        reset();
      } else {
        console.warn("⚠️ Google Sheets failed, using fallback");
        // Fallback to Zustand store
        const inquiry = {
          id: generateId(),
          ...data,
          date: new Date().toISOString(),
          status: "new" as const,
        };
        addInquiry(inquiry);
        toast.success("Thank you for your inquiry! We will contact you soon.");
        reset();
      }
    } catch (err) {
      console.error("❌ Error submitting inquiry:", err);
      // Fallback to Zustand store on error
      const inquiry = {
        id: generateId(),
        ...data,
        date: new Date().toISOString(),
        status: "new" as const,
      };
      addInquiry(inquiry);
      toast.success("Thank you for your inquiry! We will contact you soon.");
      reset();
    }
  };

  const featuredCourses = coursesData
    .filter((course) => course.featured)
    .slice(0, 3);

  // Use ONLY Google Sheets data (no local fallback)
  const activeSlides = googleSlides
    .filter((slide) => slide.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <PublicLayout>
      {/* Hero Slider Section */}
      <Box sx={{ position: "relative", overflow: "hidden", mt: -2 }}>
        {isLoadingSlides ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "550px",
              background: "white",
            }}
          >
            <CircularProgress size={60} sx={{ color: "#667eea" }} />
          </Box>
        ) : activeSlides.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "550px",
              background: "white",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No active slides available
            </Typography>
          </Box>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          >
            {activeSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Box
                  sx={{
                    background: "white",
                    color: "black",
                    py: { xs: 6, sm: 8, md: 10 },
                    position: "relative",
                    overflow: "hidden",
                    minHeight: { xs: "auto", md: "550px" },
                  }}
                >
                  <Container maxWidth="lg">
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={{ xs: 3, md: 4 }}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box sx={{ flex: 1, zIndex: 1, width: "100%" }}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Typography
                            variant="overline"
                            sx={{
                              color: "#1976d2",
                              fontWeight: 700,
                              fontSize: { xs: "0.75rem", sm: "0.9rem" },
                              letterSpacing: 2,
                              mb: { xs: 1, sm: 1.5 },
                              display: "block",
                            }}
                          >
                            {slide.subtitle}
                          </Typography>
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2.75rem",
                              },
                              fontWeight: 800,
                              mb: { xs: 1.5, sm: 2 },
                              color: "black",
                              lineHeight: 1.2,
                            }}
                          >
                            {slide.title}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: { xs: "0.875rem", sm: "1.1rem" },
                              mb: { xs: 2, sm: 3 },
                              color: "text.secondary",
                              lineHeight: 1.6,
                            }}
                          >
                            {slide.description}
                          </Typography>
                          <Button
                            variant="contained"
                            size="large"
                            sx={{
                              background:
                                "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                              color: "white",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                                transform: "translateY(-2px)",
                              },
                              px: { xs: 3, sm: 4 },
                              py: { xs: 1.25, sm: 1.5 },
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                              fontWeight: 600,
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
                            }}
                            endIcon={<ArrowRight />}
                            href={slide.ctaLink}
                          >
                            {slide.ctaText}
                          </Button>
                        </motion.div>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          backgroundColor: "transparent",
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Box
                            component="img"
                            src={slide.image}
                            alt={slide.title}
                            sx={{
                              width: "100%",
                              maxWidth: { xs: 400, sm: 500, md: 600 },
                              height: "auto",
                              boxShadow: "none",
                              mx: "auto",
                              display: "block",
                              backgroundColor: "transparent",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </motion.div>
                      </Box>
                    </Stack>
                  </Container>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>

      {/* Stats Section */}
      <Container
        maxWidth="lg"
        sx={{ mt: -4, mb: 6, position: "relative", zIndex: 10 }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ flex: "1 1 250px" }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  background: "white",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "primary.light",
                    color: "white",
                    mb: 2,
                  }}
                >
                  <stat.icon size={32} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                About Us
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
                Why Choose SoftCrayons?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 700, mx: "auto" }}
              >
                We are committed to providing world-class education that
                empowers students to achieve their career goals. With
                industry-expert instructors and comprehensive courses,
                we&apos;ve helped thousands of students transform their careers.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              alignItems="flex-start"
            >
              <Box sx={{ flex: 1 }}>
                <Stack spacing={2}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <CheckCircle2 size={24} color="#1976d2" />
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image="/images/about/about.jpg"
                    alt="About SoftCrayons"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x300?text=About+Us";
                    }}
                  />
                </Card>
              </Box>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Courses Section */}
      <Box id="courses" sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Popular Courses
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
                Explore Our Featured Courses
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose from our most popular courses designed by industry
                experts
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              sx={{ flexWrap: "wrap", justifyContent: "center" }}
            >
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ flex: "1 1 300px", maxWidth: 380 }}
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
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x200?text=" +
                          course.title;
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: "primary.light",
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          mb: 1,
                        }}
                      >
                        {course.category}
                      </Typography>
                      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {course.description.substring(0, 100)}...
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          ⏱️ {course.duration}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          ₹{course.price.toLocaleString()}
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        href={`/frontend/courses`}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              ))}
            </Stack>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                href="/frontend/courses"
                endIcon={<ArrowRight />}
              >
                View All Courses
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#667eea",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: 2,
                }}
              >
                TESTIMONIALS
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 2,
                  mb: 3,
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                }}
              >
                What Our Students Say
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.15rem" }}
              >
                Real stories from students who transformed their careers
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              sx={{ flexWrap: "wrap", justifyContent: "center" }}
            >
              {testimonialsData.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ flex: "1 1 300px", maxWidth: 380 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 50px rgba(102,126,234,0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <Box
                          sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "1.75rem",
                            mr: 2.5,
                            boxShadow: "0 8px 20px rgba(102,126,234,0.3)",
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, fontSize: "1.15rem" }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#667eea", fontWeight: 500 }}
                          >
                            {testimonial.course}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        sx={{
                          mb: 2,
                          "& .MuiRating-iconFilled": {
                            color: "#fbbf24",
                          },
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          fontSize: "1.05rem",
                        }}
                      >
                        &ldquo;{testimonial.message}&rdquo;
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Contact/Inquiry Section */}
      <Box id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#667eea",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: 2,
                }}
              >
                GET IN TOUCH
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 2,
                  mb: 3,
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                }}
              >
                Ready to Start Learning?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.15rem" }}
              >
                Fill out the form below and our team will contact you shortly
              </Typography>
            </Box>

            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: "1.05rem",
                        },
                      }}
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      fullWidth
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: "1.05rem",
                        },
                      }}
                    />
                    <TextField
                      label="Phone Number"
                      fullWidth
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: "1.05rem",
                        },
                      }}
                    />
                    <TextField
                      label="Message"
                      multiline
                      rows={5}
                      fullWidth
                      {...register("message")}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          fontSize: "1.05rem",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        textTransform: "none",
                        boxShadow: "0 8px 20px rgba(102,126,234,0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                          boxShadow: "0 12px 28px rgba(102,126,234,0.4)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Submit Inquiry
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </PublicLayout>
  );
}
