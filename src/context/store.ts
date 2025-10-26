import { create } from "zustand";
import { Course, Inquiry, Student, HeroSlide } from "@/types";
import { coursesData } from "@/assets/data/courses";
import { inquiriesData } from "@/assets/data/inquiries";
import { studentsData } from "@/assets/data/students";
import { heroSlidesData } from "@/assets/data/heroSlides";

interface AppState {
  // Courses
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Hero Slides
  heroSlides: HeroSlide[];
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;

  // Inquiries
  inquiries: Inquiry[];
  addInquiry: (inquiry: Inquiry) => void;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  deleteInquiry: (id: string) => void;

  // Students
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Courses
  courses: coursesData,
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),
  updateCourse: (id, updatedCourse) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updatedCourse } : course
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),

  // Hero Slides
  heroSlides: heroSlidesData,
  addHeroSlide: (slide) =>
    set((state) => ({
      heroSlides: [...state.heroSlides, slide],
    })),
  updateHeroSlide: (id, updatedSlide) =>
    set((state) => ({
      heroSlides: state.heroSlides.map((slide) =>
        slide.id === id ? { ...slide, ...updatedSlide } : slide
      ),
    })),
  deleteHeroSlide: (id) =>
    set((state) => ({
      heroSlides: state.heroSlides.filter((slide) => slide.id !== id),
    })),

  // Inquiries
  inquiries: inquiriesData,
  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [...state.inquiries, inquiry],
    })),
  updateInquiryStatus: (id, status) =>
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status } : inquiry
      ),
    })),
  deleteInquiry: (id) =>
    set((state) => ({
      inquiries: state.inquiries.filter((inquiry) => inquiry.id !== id),
    })),

  // Students
  students: studentsData,
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),
  updateStudent: (id, updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updatedStudent } : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),
}));
