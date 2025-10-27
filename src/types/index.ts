// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
  featured?: boolean;
  syllabus?: string[];
}

// Hero Slide Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText?: string; // Legacy field - kept for backward compatibility
  buttonLink?: string; // Legacy field - kept for backward compatibility
  ctaText: string; // New field - from Google Sheets
  ctaLink: string; // New field - from Google Sheets
  order: number;
  isActive: boolean;
}

// Inquiry Types
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status?: "new" | "contacted" | "enrolled" | "closed";
}

// Student Types
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrollmentDate: string;
  status: "active" | "completed" | "inactive";
  progress?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  message: string;
  image?: string;
  date: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalInquiries: number;
  totalCourses: number;
  totalStudents: number;
  activeStudents: number;
}
