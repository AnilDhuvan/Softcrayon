import { HeroSlide } from "@/types";

export const heroSlidesData: HeroSlide[] = [
  {
    id: "1",
    title: "Transform Your Career with SoftCrayons",
    subtitle: "Best Coaching Institute",
    description:
      "Master industry-relevant skills with expert-led courses in Web Development, Data Science, Digital Marketing, and more.",
    image: "/images/hero/hero1.jpg",
    buttonText: "Explore Courses",
    buttonLink: "#courses",
    ctaText: "Explore Courses",
    ctaLink: "#courses",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    title: "Learn from Industry Experts",
    subtitle: "Professional Training",
    description:
      "Get hands-on experience with real-world projects and learn from professionals with 10+ years of experience.",
    image: "/images/hero/hero2.jpg",
    buttonText: "View Instructors",
    buttonLink: "/frontend/about",
    ctaText: "View Instructors",
    ctaLink: "/frontend/about",
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    title: "100% Job Placement Assistance",
    subtitle: "Career Success Guaranteed",
    description:
      "Join thousands of successful students who landed their dream jobs after completing our courses.",
    image: "/images/hero/hero3.jpg",
    buttonText: "Get Started",
    buttonLink: "#contact",
    ctaText: "Get Started",
    ctaLink: "#contact",
    order: 3,
    isActive: true,
  },
];
