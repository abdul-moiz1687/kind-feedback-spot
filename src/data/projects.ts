// Projects — sourced exactly from the supplied project notes.
// To add a screenshot: put the image in src/assets/projects/ , import it here,
// and set `image` on the project. The card swaps the designed cover for it.

export type Project = {
  title: string;
  subtitle: string;
  type: "Frontend" | "Full-Stack" | "Backend";
  description: string;
  tech: string[];
  url: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "SHOP.CO",
    subtitle: "E-commerce Store",
    type: "Full-Stack",
    description:
      "A full-stack clothing store featuring product browsing, user authentication, cart management, and order creation, with REST APIs for product and order management.",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    url: "https://shop-co-ecommerce-nyrk.vercel.app/",
  },
  {
    title: "Applio",
    subtitle: "Appliance Lifecycle Manager",
    type: "Backend",
    description:
      "A backend-focused application for managing home appliances, warranty details, and maintenance history. Includes REST APIs for appliance and service-record CRUD operations, input validation, and JWT-protected routes.",
    tech: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT"],
    url: "https://applio-lifecycle.vercel.app/",
  },
  {
    title: "TimeNest",
    subtitle: "Premium Wall Clock Store",
    type: "Full-Stack",
    description:
      "A premium wall-clock ecommerce project built with React and Vite, focused on modern design, responsive layouts, and a seamless shopping experience. Backend integration is planned using an existing Node.js, Express.js, and MongoDB API.",
    tech: ["React", "Vite"],
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
];
