export interface Category {
  id: string;
  title: string;
  description: string;
  folder: string;
  count: number;
  images: string[];
}

export const portfolioData: Category[] = [
  {
    id: "horizontal-posters",
    title: "Horizontal Posters",
    description: "Campaigns and promotional compositions.",
    folder: "/images/horizontal posters/",
    count: 3,
    images: ["glee 1.webp", "glee 2.webp", "glee 3.webp"],
  },
  {
    id: "logo",
    title: "Logo",
    description: "Brand marks and identity exploration.",
    folder: "/images/logo/",
    count: 1,
    images: ["logo you.webp"],
  },
  {
    id: "thumbnail",
    title: "Thumbnail",
    description: "Digital thumbnails and content visuals.",
    folder: "/images/thumbnail/",
    count: 4,
    images: ["glow thumb.webp", "gost.webp", "hafiz.webp", "tjumb.webp"],
  },
  {
    id: "ui",
    title: "UI",
    description: "Web and interface design explorations.",
    folder: "/images/ui/",
    count: 3,
    images: [
      "login 440 to 723.webp",
      "main frame landing page design - Copy.webp",
      "REGITER PAGE.webp",
    ],
  },
  {
    id: "vertical-posters",
    title: "Vertical Posters",
    description: "Social campaigns, advertisements and promotional artwork.",
    folder: "/images/vertical posters/",
    count: 11,
    images: [
      "Artboard 1.webp",
      "BARYANI 4.webp",
      "BARYANI 5.webp",
      "chiken baryani 2.webp",
      "chiken brayani-Recovered.webp",
      "lenskart_.webp",
      "Levis post.webp",
      "Nike post.webp",
      "RAFIQ.webp",
      "ramzan kareem fre dm.webp",
      "RAMZAN KAREEN FREEE 2.webp",
    ],
  },
];

export const testimonials = [
  {
    name: "Ahmed R.",
    role: "Brand Manager",
    quote:
      "Ali's work brings clarity and character to every project. The designs truly stand out.",
  },
  {
    name: "Sarah K.",
    role: "Creative Director",
    quote:
      "Professional, creative, and detail-oriented. Ali delivered exactly what we envisioned.",
  },
  {
    name: "M. Hussain",
    role: "Marketing Lead",
    quote:
      "The visual identity Ali created helped us elevate our brand presence significantly.",
  },
];