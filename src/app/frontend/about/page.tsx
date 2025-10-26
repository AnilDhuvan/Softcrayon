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
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { teamMembersData } from "@/assets/data/teamMembers";
import { Target, Eye, Users2 } from "lucide-react";

export default function AboutPage() {
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
              About SoftCrayons
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.95 }}>
              Empowering Students, Transforming Careers
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "primary.light",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    <Target size={32} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem" }}
                >
                  At SoftCrayons, our mission is to provide world-class
                  education that bridges the gap between academic learning and
                  industry requirements. We are committed to equipping students
                  with practical skills, hands-on experience, and the confidence
                  needed to excel in their chosen careers. Through innovative
                  teaching methods and expert guidance, we strive to make
                  quality education accessible to everyone.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "secondary.main",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    <Eye size={32} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem" }}
                >
                  We envision becoming India&apos;s leading coaching institute,
                  recognized for producing industry-ready professionals who
                  drive innovation and growth in the tech sector. We aim to
                  create a learning ecosystem where students not only acquire
                  technical skills but also develop critical thinking,
                  problem-solving abilities, and leadership qualities that will
                  serve them throughout their careers.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Stack>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
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
                <Users2 size={32} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Meet Our Team
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 700, mx: "auto" }}
              >
                Our team of experienced educators and industry professionals is
                dedicated to your success
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              sx={{ flexWrap: "wrap", justifyContent: "center" }}
            >
              {teamMembersData.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ flex: "1 1 280px", maxWidth: 340 }}
                >
                  <Card sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="280"
                      image={member.image}
                      alt={member.name}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&size=280&background=1976d2&color=fff`;
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.main", fontWeight: 500, mb: 2 }}
                      >
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: 700, mb: 6 }}
          >
            Why Choose Us?
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {[
              {
                title: "Industry Experts",
                description:
                  "Learn from professionals with years of real-world experience",
              },
              {
                title: "Practical Learning",
                description: "Hands-on projects and real-world case studies",
              },
              {
                title: "Job Assistance",
                description: "95% placement rate with top companies",
              },
              {
                title: "Flexible Schedules",
                description: "Weekday and weekend batches available",
              },
              {
                title: "Lifetime Access",
                description: "Access course materials anytime, anywhere",
              },
              {
                title: "Certifications",
                description: "Industry-recognized certificates upon completion",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ flex: "1 1 300px", maxWidth: 360 }}
              >
                <Card sx={{ height: "100%", textAlign: "center" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      </Container>
    </PublicLayout>
  );
}
