"use client";

import React from "react";
import PublicLayout from "@/components/PublicLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAppStore } from "@/context/store";
import { generateId } from "@/utils/helpers";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  message: yup.string().required("Message is required"),
});

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "123 Education Street, Tech City, IN 110001",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@softcrayons.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  const { addInquiry } = useAppStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const inquiry = {
      id: generateId(),
      ...data,
      date: new Date().toISOString(),
      status: "new" as const,
    };

    addInquiry(inquiry);
    toast.success("Thank you for contacting us! We will get back to you soon.");
    reset();
  };

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
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95 }}>
              Get in touch with us for any inquiries or support
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {/* Contact Form */}
          <Box sx={{ flex: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Send us a Message
              </Typography>

              <Card>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                      <TextField
                        label="Full Name"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                      <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                      <TextField
                        label="Phone Number"
                        fullWidth
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        placeholder="10-digit number"
                      />
                      <TextField
                        label="Message"
                        multiline
                        rows={6}
                        fullWidth
                        {...register("message")}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Submit Inquiry
                      </Button>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Box>

          {/* Contact Information */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Contact Information
              </Typography>

              <Stack spacing={3}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "primary.light",
                              color: "white",
                            }}
                          >
                            <info.icon size={24} />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {info.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {info.content}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>

              {/* Map placeholder */}
              <Box sx={{ mt: 4 }}>
                <Card>
                  <Box
                    sx={{
                      height: 250,
                      bgcolor: "grey.200",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      <MapPin size={48} style={{ opacity: 0.3 }} />
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Visit us at our campus to experience our state-of-the-art
                      facilities
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </PublicLayout>
  );
}
