// Portfolio project content. Screenshots are imported locally in Projects.tsx
// so they remain available on Vercel and other self-hosted deployments.

export type Project = {
  title: string;
  subtitle: string;
  type: "Frontend" | "Full-Stack" | "Backend";
  description: string;
  tech: string[];
  url?: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "FIREBITE",
    subtitle: "Full-Stack Restaurant Ordering Platform",
    type: "Full-Stack",
    description:
      "A restaurant ordering platform with menu browsing, cart management, delivery and pickup checkout, order tracking, WhatsApp ordering, and an admin dashboard. Gemini AI powers menu recommendations, while Upstash Redis rate-limits API requests.",
    tech: ["Next.js", "React", "Tailwind CSS", "Firebase Firestore", "Firebase Admin", "Upstash Redis", "Gemini API", "Vercel"],
    url: "https://firebite-restaurant-ordering.vercel.app/",
  },
  {
    title: "SHOP.CO",
    subtitle: "Full-Stack E-Commerce Platform",
    type: "Full-Stack",
    description:
      "A full-stack shopping experience with customer authentication, product browsing and filtering, cart management, checkout, order placement, and order tracking, plus a separate admin dashboard for users, products, and order updates.",
    tech: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "REST API"],
    url: "https://shop-co-ecommerce-nyrk.vercel.app/",
  },
  {
    title: "APPLIO",
    subtitle: "Digital Appliance Passport & Lifecycle Management Platform",
    type: "Full-Stack",
    description:
      "A full-stack appliance lifecycle platform for managing appliance records, warranties, service histories, and maintenance costs. It includes JWT authentication, QR-powered public digital passports, image uploads, and an admin dashboard for users, appliances, and service records.",
    tech: ["React.js", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Multer", "GSAP"],
    url: "https://applio-lifecycle.vercel.app/",
  },
  {
    title: "TimeNest",
    subtitle: "Full-Stack E-Commerce Website",
    type: "Full-Stack",
    description:
      "A full-stack wall-clock store with product browsing, search and filters, cart, checkout, authentication, Cash on Delivery, order management, and product reviews. Its REST API uses MongoDB, with Cloudinary for product image uploads.",
    tech: ["React 19", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Three.js"],
    url: "https://timenest-wall-clock-store.vercel.app/",
  },
  {
    title: "MaintainIQ",
    subtitle: "QR-Powered Asset Maintenance & Issue Tracking",
    type: "Frontend",
    description:
      "Gives every physical asset a scannable QR identity. Anyone can report a fault in seconds, owners triage and resolve it, and every fix becomes a permanent service history.",
    tech: ["React 19", "TanStack Start", "TypeScript", "Tailwind CSS v4", "Firebase Auth", "Firebase Realtime DB", "QR codes", "shadcn/ui"],
    url: "https://maintain-iq-rho.vercel.app/",
  },
  {
    title: "VOIDØ",
    subtitle: "Luxury Streetwear E-Commerce Platform",
    type: "Frontend",
    description:
      "A luxury streetwear e-commerce platform with Firebase authentication, a real-time product catalog, an admin control panel, and a conversion-focused editorial UI.",
    tech: ["Firebase Auth", "Realtime catalog", "Admin panel"],
    url: "https://elevated-streetwear.netlify.app/",
  },
  {
    title: "ShopFlow",
    subtitle: "Real-Time E-Commerce Dashboard",
    type: "Frontend",
    description:
      "Users sign up or log in with email or Google, then browse and add products that update instantly via Realtime Database listeners. Auth-protected routes and gated actions keep product management secure.",
    tech: ["React", "Vite", "Firebase v9", "Realtime Database"],
    url: "https://shops-flow.netlify.app/",
  },
  {
    title: "Campus Connect",
    subtitle: "Student Social Network",
    type: "Frontend",
    description:
      "Login, feed, text and photo/video posts, likes, comments, friend requests and notifications — fully powered by localStorage with same-tab realtime sync, no backend required.",
    tech: ["React", "TypeScript", "localStorage"],
    url: "https://real-social-network-app.netlify.app/",
  },
  {
    title: "ElectroShop",
    subtitle: "E-Commerce Web Application",
    type: "Frontend",
    description:
      "A responsive e-commerce frontend with an intuitive product catalog, seamless shopping cart management, and a clean UI for a fast electronics shopping experience.",
    tech: ["React", "Vite"],
    url: "https://electro-shop-store.vercel.app/",
  },
  {
    title: "React Portfolio App",
    subtitle: "Personal Portfolio",
    type: "Frontend",
    description:
      "A fully responsive personal portfolio built with React, featuring a clean UI, interactive components, and smooth navigation to showcase front-end projects and skills.",
    tech: ["React"],
    url: "https://moiz-dev-portfolio.vercel.app/",
  },
  {
    title: "DevPulse",
    subtitle: "Post Management REST API",
    type: "Backend",
    description:
      "A REST API for developer journal posts, with complete CRUD operations, input validation, and centralized error handling.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST API", "Postman"],
    repo: "https://github.com/abdul-moiz1687/devpulse-post-management-api",
  },
  {
    title: "Express Auth API",
    subtitle: "Login & Signup APIs",
    type: "Backend",
    description:
      "Registration and login APIs with duplicate-email validation, bcrypt password hashing, and JWT authentication for a protected route. User records are stored in a JSON file.",
    tech: ["Node.js", "Express.js", "bcrypt", "JWT", "EJS", "JSON File System"],
    repo: "https://github.com/abdul-moiz1687/express-auth-api",
  },
];
