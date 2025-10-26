"use client";

import React from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/utils/theme";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/context/store";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const { courses, inquiries, students } = useAppStore();

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      label: "Total Inquiries",
      value: inquiries.length,
      icon: MessageSquare,
      color: "#dc004e",
      bgColor: "#fce4ec",
    },
    {
      label: "Total Students",
      value: students.length,
      icon: Users,
      color: "#388e3c",
      bgColor: "#e8f5e9",
    },
    {
      label: "Active Students",
      value: students.filter((s) => s.status === "active").length,
      icon: TrendingUp,
      color: "#f57c00",
      bgColor: "#fff3e0",
    },
  ];

  // Bar Chart Data - Students by Course
  const courseEnrollments = courses.map((course) => ({
    course: course.title.substring(0, 20),
    students: students.filter((s) => s.course === course.title).length,
  }));

  const barChartOptions = {
    chart: {
      type: "bar" as const,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: courseEnrollments.map((c) => c.course),
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    colors: ["#1976d2"],
    title: {
      text: "Student Enrollment by Course",
      align: "left" as const,
    },
  };

  const barChartSeries = [
    {
      name: "Students",
      data: courseEnrollments.map((c) => c.students),
    },
  ];

  // Pie Chart Data - Inquiry Status
  const inquiryStatusCounts = {
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    enrolled: inquiries.filter((i) => i.status === "enrolled").length,
    closed: inquiries.filter((i) => i.status === "closed").length,
  };

  const pieChartOptions = {
    chart: {
      type: "pie" as const,
    },
    labels: ["New", "Contacted", "Enrolled", "Closed"],
    colors: ["#1976d2", "#f57c00", "#388e3c", "#dc004e"],
    legend: {
      position: "bottom" as const,
    },
    title: {
      text: "Inquiry Status Distribution",
      align: "left" as const,
    },
  };

  const pieChartSeries = [
    inquiryStatusCounts.new,
    inquiryStatusCounts.contacted,
    inquiryStatusCounts.enrolled,
    inquiryStatusCounts.closed,
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextTopLoader color="#1976d2" height={3} showSpinner={false} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <AdminLayout>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back! Here&apos;s what&apos;s happening with your institute.
          </Typography>

          {/* Stats Cards */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ mb: 4, flexWrap: "wrap" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ flex: "1 1 200px" }}
              >
                <Card>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: stat.bgColor,
                        }}
                      >
                        <stat.icon size={24} color={stat.color} />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>

          {/* Charts */}
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ flex: 2 }}
            >
              <Card>
                <CardContent>
                  <Chart
                    options={barChartOptions}
                    series={barChartSeries}
                    type="bar"
                    height={350}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ flex: 1 }}
            >
              <Card>
                <CardContent>
                  <Chart
                    options={pieChartOptions}
                    series={pieChartSeries}
                    type="pie"
                    height={350}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Stack>
        </Container>
      </AdminLayout>
    </ThemeProvider>
  );
}
