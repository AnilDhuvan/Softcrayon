"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/frontend" },
  { label: "About Us", href: "/frontend/about" },
  { label: "Courses", href: "/frontend/courses" },
  { label: "Contact", href: "/frontend/contact" },
  { label: "Blog", href: "/frontend/blog" },
];

const courses = [
  { label: "Web Development", href: "/frontend/courses" },
  { label: "Data Science", href: "/frontend/courses" },
  { label: "Digital Marketing", href: "/frontend/courses" },
  { label: "UI/UX Design", href: "/frontend/courses" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a2e",
        color: "grey.100",
        pt: 8,
        pb: 3,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          sx={{ mb: 6 }}
        >
          {/* About Section */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 180,
                    height: 50,
                  }}
                >
                  <Image
                    src="/images/logo/softCrayons-logo-png.png"
                    alt="SoftCrayons Logo"
                    fill
                    style={{ objectFit: "contain", objectPosition: "left" }}
                  />
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "grey.400", lineHeight: 1.8 }}
              >
                Empowering students with quality education and industry-relevant
                skills. Your success is our mission.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 44,
                      height: 44,
                      background: "rgba(255,255,255,0.05)",
                      color: "grey.300",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 20px rgba(102,126,234,0.3)",
                      },
                    }}
                  >
                    <social.icon size={20} />
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {quickLinks.map((link) => (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    href={link.href}
                    underline="none"
                    sx={{
                      color: "grey.400",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#667eea",
                        transform: "translateX(5px)",
                        display: "inline-block",
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Popular Courses */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                Popular Courses
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {courses.map((course) => (
                  <MuiLink
                    key={course.label}
                    component={Link}
                    href={course.href}
                    underline="none"
                    sx={{
                      color: "grey.400",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#667eea",
                        transform: "translateX(5px)",
                        display: "inline-block",
                      },
                    }}
                  >
                    {course.label}
                  </MuiLink>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Contact Info */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      background: "rgba(102,126,234,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} color="#667eea" />
                  </Box>
                  <Typography variant="body1" sx={{ color: "grey.400" }}>
                    123 Education Street, Tech City, IN 110001
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      background: "rgba(102,126,234,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} color="#667eea" />
                  </Box>
                  <Typography variant="body1" sx={{ color: "grey.400" }}>
                    +91 98765 43210
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      background: "rgba(102,126,234,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} color="#667eea" />
                  </Box>
                  <Typography variant="body1" sx={{ color: "grey.400" }}>
                    info@softcrayons.com
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />

        {/* Copyright */}
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "grey.500", fontSize: "0.95rem" }}
        >
          © {new Date().getFullYear()} SoftCrayons Coaching Institute. All
          rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
